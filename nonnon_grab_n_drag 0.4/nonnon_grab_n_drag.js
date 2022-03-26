// Nonnon WebExtensions
// copyright (c) nonnon all rights reserved
// License : GPL http://www.gnu.org/copyleft/gpl.html




var n_grab_n_drag_debug     = false;
var n_grab_n_drag_onoff     = false;
var n_grab_n_drag_prv_x     = 0;
var n_grab_n_drag_prv_y     = 0;
var n_grab_n_drag_is_anchor = false;
var n_grab_n_drag_backup;




if ( n_grab_n_drag_debug )
{
console.log( "Nonnon Grab N Drag" );
}




// [!] : I have got this from StackOverflow : logic is very difficult to me

function n_grab_n_drag_is_scrollable( el, direction ) {

	direction = ( direction === 'vertical' ) ? 'scrollTop' : 'scrollLeft';

	var result = !! el[ direction ];

	if ( !result )
	{
		el[ direction ] = 1;
		result = !! el[ direction ];
		el[ direction ] = 0;
	}


	return result;
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


// [!] : exclude anchors
//
//	this is a patch
//	not working : preventDefault(); return false; in n_grab_n_drag_on_middleclick_down()

document.body.onmouseover = (e) => {

	const cursor = window.getComputedStyle( e.target )[ "cursor" ];
//console.log( cursor );

	if ( cursor == "pointer" )
	{
		n_grab_n_drag_is_anchor = true;
	} else {
		n_grab_n_drag_is_anchor = false;
	}

}


function n_grab_n_drag_on_middleclick_down( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Clicked" + " : " + e.button );
}

	if ( n_grab_n_drag_is_anchor ) { return; }

	if ( e.button == 1 )
	{
		n_grab_n_drag_onoff = true;
		n_grab_n_drag_prv_x = e.pageX;
		n_grab_n_drag_prv_y = e.pageY;

		//document.body.style.cursor = "move";

		let all = document.getElementsByTagName( "*" );

		n_grab_n_drag_backup = new Array( all.length );

		let i = 0;
		while( 1 )
		{
			n_grab_n_drag_backup[ i ] = all[ i ].style.cursor;
			all[ i ].style.cursor = "move";

			i++;
			if ( i >= all.length ) { break; }
		}
	}

}

window.addEventListener( "mousedown", n_grab_n_drag_on_middleclick_down );


function n_grab_n_drag_on_middleclick_up( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Released" + " : " + e.button );
}

	if ( n_grab_n_drag_onoff )
	{
		n_grab_n_drag_onoff = false;

		//document.body.style.cursor = "default";

		let all = document.getElementsByTagName( "*" );

		let i = 0;
		while( 1 )
		{
			all[ i ].style.cursor = n_grab_n_drag_backup[ i ];

			i++;
			if ( i >= all.length ) { break; }
		}
	}

}

window.addEventListener( "mouseup", n_grab_n_drag_on_middleclick_up );


function n_grab_n_drag_on_mousemove( e ) {

	if ( n_grab_n_drag_onoff )
	{
//console.log( "Position" + " : " + e.pageX + " : " + e.pageY );


		var n_grab_n_drag_delta_x = n_grab_n_drag_prv_x - e.pageX;
		var n_grab_n_drag_delta_y = n_grab_n_drag_prv_y - e.pageY;

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

				if ( n_grab_n_drag_is_scrollable( n_target, "vertical" ) )
				{
if ( n_grab_n_drag_debug ) { console.log( "Found" + n_target ); }
					n_target.scrollBy( 0, n_grab_n_drag_delta_y );

					break;
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

