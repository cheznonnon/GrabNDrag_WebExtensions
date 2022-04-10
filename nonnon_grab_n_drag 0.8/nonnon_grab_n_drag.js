// Nonnon WebExtensions
// copyright (c) nonnon all rights reserved
// License : GPL http://www.gnu.org/copyleft/gpl.html




var n_grab_n_drag_debug             = false;
var n_grab_n_drag_onoff             = false;
var n_grab_n_drag_prv_x             = 0;
var n_grab_n_drag_prv_y             = 0;
var n_grab_n_drag_delta_x           = 0;
var n_grab_n_drag_delta_y           = 0;
var n_grab_n_drag_suppress          = false;
var n_grab_n_drag_cursor_is_changed = false;
//var n_grab_n_drag_backup;




if ( n_grab_n_drag_debug )
{
console.log( "Nonnon Grab N Drag" );
}




function n_grab_n_drag_cursor_set( onoff ) {

//console.log( "" + onoff );


	// [x] : document.html is not available

	if ( onoff )
	{
		document.body.style.cursor = "move";
	} else {
		document.body.style.cursor = "default";
	}


	// [x] : this misbehaves in JavaScript-heavy dynamic sits
/*
	let all = document.getElementsByTagName( "*" );

	if ( onoff )
	{
		n_grab_n_drag_backup = new Array( all.length );
	}

	let i = 0;
	while( 1 )
	{

		if ( onoff )
		{
			n_grab_n_drag_backup[ i ] = all[ i ].style.cursor;
			all[ i ].style.cursor = "move";
		} else {
			all[ i ].style.cursor = n_grab_n_drag_backup[ i ];
		}

		i++;
		if ( i >= all.length ) { break; }
	}
*/
}


function n_grab_n_drag_is_scrollable( n_element ) {

	// [!] : already used
	if ( n_element.scrollTop != 0 ) { return true; }

	// [!] : try to move

	var n_before = n_element.scrollTop;

	n_element.scrollTop = 1;

	var n_after  = n_element.scrollTop;

	// [!] : reset
	n_element.scrollTop = 0;


	return ( n_before != n_after );
}


// [!] : disable auto-scroll of Firefox
//
//	currently, reason is unknown

document.body.onmousedown = (e) => {

	if ( e.button === 1 )
	{
		e.preventDefault();

		return false;
	}

}


// [!] : you can drag from anchors
//
//	[x] : middle click to open a new tab is suppressed too
//	[!] : this is called after n_grab_n_drag_on_click_up()

window.addEventListener( "auxclick", (e) => {

if ( n_grab_n_drag_debug )
{
console.log( "auxclick" );
}

	if ( e.button === 1 )
	{
//console.log( "auxclick : " + n_grab_n_drag_onoff );

		if ( n_grab_n_drag_suppress )
		{
			n_grab_n_drag_onoff = false;

			e.preventDefault();

			return false;
		}

	}

});


function n_grab_n_drag_on_click_down( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Clicked" + " : " + e.button );
}

	if ( e.button === 1 )
	{

		n_grab_n_drag_cursor_is_changed = false;

		n_grab_n_drag_onoff = true;
		n_grab_n_drag_prv_x = e.pageX;
		n_grab_n_drag_prv_y = e.pageY;

		const n_cursor = window.getComputedStyle( e.target )[ "cursor" ];
		if ( n_cursor != "pointer" )
		{

			n_grab_n_drag_cursor_is_changed = true;

			n_grab_n_drag_cursor_set( true );

//console.log( "Link" + " : " + e.target );
			// [!] : security : programmers cannot make navigation

		}

	}

}

window.addEventListener( "mousedown", n_grab_n_drag_on_click_down );


function n_grab_n_drag_on_click_up( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Released" + " : " + e.button );
}

	if ( n_grab_n_drag_onoff )
	{

		n_grab_n_drag_onoff = false;

		if ( n_grab_n_drag_cursor_is_changed )
		{

			n_grab_n_drag_cursor_is_changed = false;

			n_grab_n_drag_cursor_set( false );

		}

//console.log( "Released : Delta" + " : " + n_grab_n_drag_delta_x + " : " + n_grab_n_drag_delta_y );

		if ( ( n_grab_n_drag_delta_x == 0 )&&( n_grab_n_drag_delta_y == 0 ) )
		{
//console.log( "not moved" );
			n_grab_n_drag_suppress = false;
		} else {
			n_grab_n_drag_suppress = true;
		}

		n_grab_n_drag_delta_x = 0;
		n_grab_n_drag_delta_y = 0;
	}

}

window.addEventListener( "mouseup", n_grab_n_drag_on_click_up );


function n_grab_n_drag_on_mousemove( e ) {

	if ( n_grab_n_drag_onoff )
	{
//console.log( "Position" + " : " + e.pageX + " : " + e.pageY );


		if ( n_grab_n_drag_cursor_is_changed == false )
		{
			n_grab_n_drag_cursor_is_changed = true;

			n_grab_n_drag_cursor_set( true );
		}


		n_grab_n_drag_delta_x = n_grab_n_drag_prv_x - e.pageX;
		n_grab_n_drag_delta_y = n_grab_n_drag_prv_y - e.pageY;

if ( n_grab_n_drag_debug )
{
console.log( "Delta" + " : " + n_grab_n_drag_delta_x + " : " + n_grab_n_drag_delta_y );
}

		var n_target = document.elementFromPoint( e.clientX, e.clientY );
//console.log( "" + n_target );

		if ( n_target == null )
		{

			window.scrollBy( 0, n_grab_n_drag_delta_y );

		} else {

			while( 1 )
			{

				if ( n_grab_n_drag_is_scrollable( n_target ) )
				{
if ( n_grab_n_drag_debug ) { console.log( "Found" + n_target ); }

					// [!] : when stopped, then send to a parent object

					var n_before = n_target.scrollTop;

					n_target.scrollBy( 0, n_grab_n_drag_delta_y );

					var n_after  = n_target.scrollTop;

					if ( n_before != n_after ) { break; }
				}

				if ( n_target.parentElement == null ) { break; }

				n_target = n_target.parentElement;

			}

		}


		n_grab_n_drag_prv_x = e.pageX;
		n_grab_n_drag_prv_y = e.pageY;
	}

}

window.addEventListener( "mousemove", n_grab_n_drag_on_mousemove );

