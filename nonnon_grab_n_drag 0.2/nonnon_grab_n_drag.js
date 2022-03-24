// Nonnon WebExtensions
// copyright (c) nonnon all rights reserved
// License : GPL http://www.gnu.org/copyleft/gpl.html




var n_grab_n_drag_debug = false;
var n_grab_n_drag_onoff = false;
var n_grab_n_drag_prv_x = 0;
var n_grab_n_drag_prv_y = 0;




if ( n_grab_n_drag_debug )
{
console.log( "Nonnon Grab N Drag" );
}




function n_grab_n_drag_on_middleclick_down( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Clicked" + " : " + e.button );
}

	if ( e.button == 1 )
	{
		n_grab_n_drag_onoff = true;
		n_grab_n_drag_prv_x = e.pageX;
		n_grab_n_drag_prv_y = e.pageY;

		document.body.style.cursor = "move";
	}

}

window.addEventListener( "mousedown", n_grab_n_drag_on_middleclick_down );


function n_grab_n_drag_on_middleclick_up( e ) {

if ( n_grab_n_drag_debug )
{
console.log( "Released" + " : " + e.button );
}

	if ( e.button == 1 )
	{
		n_grab_n_drag_onoff = false;

		document.body.style.cursor = "default";
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

		window.scrollBy( 0, n_grab_n_drag_delta_y );


		n_grab_n_drag_prv_x = e.pageX;
		n_grab_n_drag_prv_y = e.pageY;
	}

}

window.addEventListener( "mousemove", n_grab_n_drag_on_mousemove );

