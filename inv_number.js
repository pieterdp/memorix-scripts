/*
 * Script to auto-copy old inventory numbers
 */
function start_inv () {
	not_id = document.getElementById ("notities");
	not_cont = not_id.innerHTML;
	var values = parse_not (not_cont);
	store_values (values); /* Store values in the correct fields in the form */
}


/*
 * Function to parse the notition-field and
 * store the value of "oud inventarisnummer"
 * and "dubbel van" in a variable
 * @param string not_cont
 * @return object values = {ov => oud_inventarisnummer, dv => dubbel_van)
 */
function parse_not (not_cont) {
	//Oud inventarisnummer: 01300101024
	//Dubbel van: xxxxx
	var values = new Object;
	var ov_patt = /oud inventarisnummer(?: |: )[0-9a-z]+/i;
	var dv_patt = /dubbel van(?: |: )[0-9a-z]+/gi;
	if (ov_patt.test (not_cont) == true) {
		values.ov = parse_ov (not_cont);
	}
	if (dv_patt.test (not_cont) == true) {
		values.dv = parse_dv (not_cont);
	}
	return values;
}

/*
 * Function to return the oud_inventarisnummer
 * @param string not_cont
 * @return array oud_inventarisnummers
 */
function parse_ov (not_cont) {
	var ovs = Array ();
	var ov_patt = /oud inventarisnummer(?: |: )([0-9a-z]+)/gi;
	var matches = ov_patt.exec (not_cont);
	/*if (matches.length > 2) { /* Means multiple matches *//*
	}*/
	ovs = matches.slice (1);
	return ovs;
}

/*
 * Function to return the dubbel_van
 * @param string not_cont
 * @return array dubbel_vans
 */
function parse_dv (not_cont) {
	var dv_patt = /dubbel van(?: |: )([0-9a-z]+)/gi;
	var matches = Array ();
	var match;
	while ((match = dv_patt.exec (not_cont)) !== null) {
		matches.push (match[1]);
	}
	return matches;
}

/*
 * Store the values in the correct fields in the form
 * @param obj values
 * @return true/false
 */
function store_values (values) {
	/* oud_inventarisnummer */
	var ov_id = document.getElementById ('oud_inventarisnummer');
	if (ov_id.value == '') {
		ov_id.value = values.ov[0];
		ov_id.setAttribute ("class", "changed");
	} /* As this cannot be repeated, we ignore the values from notes */
	/* dubbel_van */
	var dv_id = document.getElementById ('dubbel_van');
	if (dv_id.value == '') {
		dv_id.value = values.dv[0];
		dv_id.setAttribute ("class", "changed");
	}
	/* Empty notities */
	var not_id = document.getElementById ('notities');
	var not_cont = not_id.innerHTML;
	not_cont = not_cont.replace (/dubbel van( |: )[0-9a-z]+/gi, '');
	not_cont = not_cont.replace (/oud inventarisnummer( |: )[0-9a-z]+/gi, '');
	not_id.innerHTML = not_cont;
	return true;
}