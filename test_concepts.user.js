// ==UserScript==
// @name        Memorix User Scripts (categorie)
// @namespace   memorix_pwv
// @description Set of userscripts developed to ease working with Memorix.
// @include     https://maior.memorix.nl/*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require		inv_number.js
// @grant		GM_xmlhttpRequest
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
/*
This script checks every time someone clicks whether the image that
is being edited has changed. If this happens, it forces the reloading
of the set of scripts that creates the categorie drop down menu.
*/
window.addEventListener ("load", gm_start, false);
window.addEventListener ("mousedown", function () {
//setTimeout (gm_force_reload, 300);
gm_force_reload ();
}, false);

/* Global variables */
var formulier_tab = "";
var link = "";

/*
Function that checks whether a certain value has changed. If it has, force a rerun of gm_start
*/
function gm_force_reload () {
	var cookie = document.cookie.split (';');
	var key_value = cookie[0].split ('=');
	var key = key_value[0];
	var value = decodeURIComponent (key_value[1]);
	var formulier_tab = document.getElementById ("formulier-tab");
	if (formulier_tab) {
		for (j = 0; j < formulier_tab.childNodes.length; j++) {
			if (formulier_tab.childNodes[j].nodeName === "A") {
				var new_link = formulier_tab.childNodes[j];
				break;
			}
		}
		if (value !== new_link.attributes.getNamedItem ("href").nodeValue) {
			/* Link changed */
			gm_deferred_start ();
		}
	}
	return true;
}

function gm_start () {
	/* Store the value of the A-childNode of formulier-tab into a cookie
		We use this value to find out whether the underlying form has changed
		and thus reload gm_deferred */
	formulier_tab = document.getElementById ("formulier-tab");
	if (formulier_tab) {
		for (j = 0; j < formulier_tab.childNodes.length; j++) {
			if (formulier_tab.childNodes[j].nodeName === "A") {
				link = formulier_tab.childNodes[j];
				break;
			}
		}
		document.cookie = encodeURIComponent ("last_img") + "=" + encodeURIComponent (link.attributes.getNamedItem ("href").nodeValue);
		/*start_catlist ();
		start_inv ();
		start_varia ();
		start_erfgoeddb ();*/
		start_inv ();
	}
	return true;
}

function gm_deferred_start () {
	/*formulier_tab = document.getElementById ("formulier-tab");
	if (formulier_tab) {
		for (j = 0; j < formulier_tab.childNodes.length; j++) {
			if (formulier_tab.childNodes[j].nodeName === "A") {
				link = formulier_tab.childNodes[j];
				break;
			}
		}
		document.cookie = encodeURIComponent ("last_img") + "=" + encodeURIComponent (link.attributes.getNamedItem ("href").nodeValue);
		start_catlist ();
		start_inv ();
	}*/
	gm_start ();
	return true;
}

function debug_mode (html) {
	var new_window = window.open ("", "_blank", "");
	new_window.document.write (html);
	new_window.document.close ();
	return true;
}
