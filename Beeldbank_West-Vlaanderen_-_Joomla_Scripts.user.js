// ==UserScript==
// @name        Beeldbank West-Vlaanderen - Joomla Scripts
// @namespace   bbwest
// @description Set of userscripts developed to ease working with the Joomla background of the Beeldbank West-Vlaanderen
// @include     http://www.beeldbankwest-vlaanderen.be/administrator/*
// @version     1
// @grant		GM_xmlhttpRequest
// ==/UserScript==

/* Loading */
window.addEventListener ("load", gm_start, false);
//gm_start ();

/* Form elements */
var felements = new Array (
	["gm_form_bewaarplaats", "text", "Bewaarplaats"],
	["gm_form_afbeelding", "text", "Afbeelding"],
	["gm_form_naam", "text", "Naam"],
	["gm_form_contact", "text", "Contact-ID"]
);

function gm_start () {
	var text_editor = document.getElementById ("text");
	if (text_editor == null || text_editor.tagName != "TEXTAREA") {
		/* Script should only run when a edit-form is open */
		return false;
	}
	/* Add menu-options */
	var edit_bar = document.getElementById ("editor-xtd-buttons");
	/* Functions to do stuff. All functions should call add_button () to add them to the menu bar */
	gm_add_partner (edit_bar, text_editor);
	return true;
}

/*
 * Function to add a button to the menu bar
 * @param DOMElement edit_bar
 * @param string js_el javascript function to be called when button is clicked
 * @param string link_name name of the link
 * @return true/false
 */
function add_button (edit_bar, js_el, link_name) {
	var button = document.createElement ("div");
	button.setAttribute ("class", "button2-left");
	button.setAttribute ("id", "gm_button_" + js_el);
	button.appendChild (document.createTextNode ('[' + link_name + ']'));
	edit_bar.appendChild (button);
	return true;
}

/*
 * Meta-function to add a partner
 * @param DOMEl text_editor
 * @param DOMEl edit_bar
 * @return true/false
 */
function gm_add_partner (edit_bar, text_editor) {
	var func_string = "add_partner";
	var name = "partner";
	add_button (edit_bar, func_string, name);
	var button = document.getElementById ("gm_button_" + func_string);
	button.addEventListener ('click', add_partner, false);
	return true;
}

/*
 * Function to add a partner
 * When called, opens a pop-up with a form
 * User fills in this form and the function
 * translates it to the correct HTML for the
 * partner-page.
 */
function add_partner () {
	/* Elements in the form */
	var form_loc = document.getElementById ("editor-xtd-buttons").parentNode.parentNode.parentNode;
	/* Remove other children */
	if (document.getElementById ("gm_form_tr") != null) {
		var form = document.getElementById ("gm_form_td");
		form.parentNode.removeChild (form);
		var tr = document.getElementById ("gm_form_tr");
	} else {
		var tr = document.createElement ("TR");
		tr.setAttribute ("id", "gm_form_tr");
	}
	var form = document.createElement ("TD");
	form.setAttribute ("id", "gm_form_td");
	/* Create Form */
	var div = create_form_elements (felements);
	form.appendChild (div);
	tr.appendChild (form);
	form_loc.appendChild (tr);
	return true;
}

/*
 * Function to create a form-element
 * @input array (i => array (el_id, type, label))
 * @return div-node with child nodes
 */
function create_form_elements (input) {
	var div = document.createElement ("DIV");
	for (i = 0; i < input.length; i++) {
		var label = document.createElement ("LABEL");
		label.setAttribute ("for", input[i][0]);
		label.appendChild (document.createTextNode (input[i][2] + ": "));
		var hinput = document.createElement ("INPUT");
		hinput.setAttribute ("type", input[i][1]);
		hinput.setAttribute ("id", input[i][0]);
		hinput.setAttribute ("size", "64");
		div.appendChild (label);
		div.appendChild (hinput);
		div.appendChild (document.createElement ("BR"));
	}
	var button = document.createElement ("BUTTON");
	button.setAttribute ("type", "button");
	button.setAttribute ("id", "gm_form_submit");
	button.appendChild (document.createTextNode ("Toevoegen"));
	button.addEventListener ("click", store_data, false);
	div.appendChild (button);
	return div;
}

/*
 * Function to capture the input, remove the form
 * and write the data to the edit-field in the required
 * form.
 */
function store_data () {
	/*	When the submit is clicked, we set session to session + 1, so we can guess
		when to add a <tr> (after 5 elements). This is not fool-proof. */
	if (document.getElementById ("gm_partner_session") != null) {
		var session = parseInt (document.getElementById ("gm_partner_session").getAttribute ("value")) + 1;
	} else {
		var gsess = document.createElement ("INPUT");
		gsess.setAttribute ("type", "hidden");
		gsess.setAttribute ("id", "gm_partner_session");
		document.getElementsByName ("adminForm").item(0).appendChild (gsess);
		var session = 0;
	}
	document.getElementById ("gm_partner_session").setAttribute ("value", session);
	/* Fetch data */
	var data = Array (); /* data[0] = array (id, value) */
	for (var i = 0; i < felements.length; i++) {
		data[felements[i][0]] = Array (felements[i][0], document.getElementById (felements[i][0]).value);
		document.getElementById (felements[i][0]).value = null;
	}
	/* Locate the edit-form */
	var text_editor = document.getElementById ("text");
	var in_text = text_editor.value; /* Store the value somewhere safe */
	if (session % 5 == 0 && session != 0) {
		/* Add a <tr>-block, only 5 items per row allowed */
		in_text = in_text + '\n</tr>\n<tr>';
	}
	in_text = in_text + '\n' + write_data (data);
	text_editor.value = in_text;
	/* Remove our subedit-form */
	var gm_edit_form = document.getElementById ("gm_form_tr");
	//gm_edit_form.parentNode.removeChild (gm_edit_form);
	return true;
}

function write_data (data) {
	/*<td style="padding: 5px 5px 5px 5px">
	<a href="alle-films-en-fotos/weergave/search/layout/result/sjabloon/index/trefwoord/strings_bewaarplaats/Gemeentebestuur Beernem">
	<img src="images/Afbeeldingen_partners/gemeentebestuur-beernem.jpg" border="0" alt="Sprekend beeld partner Gemeentebestuur Beernem." width="160px" />
	<br />Gemeentebestuur Beernem</a><br/>
	<span style="font-size: 0.8em">(<a href="index.php?option=com_contact&view=contact&id=3" id="contact">contact</a>)</span>
	</td>*/
	return '<td style="padding: 5px 5px 5px 5px"><a href="alle-films-en-fotos/weergave/search/layout/result/sjabloon/index/trefwoord/strings_bewaarplaats/' + data["gm_form_bewaarplaats"][1] + '"><img src="images/Afbeeldingen_partners/' + data["gm_form_afbeelding"][1] + '" border="0" alt="Sprekend beeld partner ' + data["gm_form_naam"][1] + '." height="120px" /><br />' + data["gm_form_naam"][1] + '</a><br/><span style="font-size: 0.8em">(<a href="index.php?option=com_contact&view=contact&id=' + data["gm_form_contact"][1] + '" id="contact">contact</a>)</span></td>';
}