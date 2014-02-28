/* Erfgoedatabank JS file */
// @resource !

/* Meta function */
function start_erfgoeddb () {
	/* Create a new form element */
	if (!document.getElementById ('erfgoeddb_n')) {
		var tr = document.getElementById ('kleur').parentNode.parentNode.nextSibling;
		var n_tr = document.createElement ('tr');
		n_tr.setAttribute ('class', '  ');
		var n_th = document.createElement ('th');
		var n_label = document.createElement ('label');
		n_label.setAttribute ('class', 'optional');
		n_label.setAttribute ('for', 'erfgoeddb_n');
		n_label.innerHTML = 'ErfgoedDBnummer';
		var n_td = document.createElement ('td');
		n_td.setAttribute ('class', 'value lastrecordcopyable');
		n_td.setAttribute ('colspan', 4);
		var n_input = document.createElement ('input');
		n_input.setAttribute ('id', 'erfgoeddb_n');
		n_input.setAttribute ('type', 'text');
		n_input.setAttribute ('autocomplete', 'on');
		n_input.setAttribute ('visibility', 1);
		n_input.setAttribute ('value', '');
		n_input.setAttribute ('name', 'erfgoeddb_n');
		n_td.appendChild (n_input);
		n_th.appendChild (n_label);
		n_tr.appendChild (n_th);
		n_tr.appendChild (n_td);
		tr.parentNode.insertBefore (n_tr, tr);
	}
	/* Register an onfocus event listener */
	/* Register an onchange event listener */
	var el = document.getElementById ('erfgoeddb_n');
	el.addEventListener ('click', erfgoeddb_onfocus, false);
	return true;
}

/* Onfocus function
1) Create a new window of the db
2) Fill in some variables and submit the form
*/
function erfgoeddb_onfocus () {
	/* Open window */
	var gemeente  = document.getElementById ('stad_gemeente');
	var deelgemeente = document.getElementById ('deelgemeente_0');
	erfgoeddb_new_window (gemeente, deelgemeente);
}

/* New window function
1) Add a button "this relict"
2) Send all information to the parent
*/
function erfgoeddb_new_window (gemeente, deelgemeente) {
	/* Open the search form of https://inventaris.onroerenderfgoed.be/dibe/relict/zoeken */
	var zoek_formulier = window.open ('https://inventaris.onroerenderfgoed.be/dibe/relict/zoeken', 'Zoekformulier', "height=800,width=900,scrollbars=yes");
	/*document.cookie = encodeURIComponent ("last_img") + "=" + encodeURIComponent (link.attributes.getNamedItem ("href").nodeValue);
		*/
	document.cookie = encodeURIComponent ("gemeente") + "=" + encodeURIComponent (gemeente);
	document.cookie = encodeURIComponent ("deelgemeente") + "=" + encodeURIComponent (deelgemeente);
	/*zoek_formulier.addEventListener ("load", function () {
		var gemeente_id = zoek_formulier.document.getElementById ('kzlGemeente');
		var deelgemeente_id = zoek_formulier.document.getElementById ('kzlDeelgemeente');
		var provincie_id = zoek_formulier.document.getElementById ('kzlProvincie');
		gemeente_id.innerHTML = gemeente;
		deelgemeente_id.innerHTML = deelgemeente;
		provincie_id.innerHTML = 'West-Vlaanderen';
	}, false);*/
}

/* Onchange function
1) Add all information to "Onderwerp"
*/
function erfgoeddb_add_subject () {
}