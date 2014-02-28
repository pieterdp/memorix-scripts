/* Varia */

/* Meta function */
function start_varia () {
	/* Set auteur right */
	var copyrightID = document.getElementById ('auteursrechten');
	if (!copyrightID.value) {
		copyrightID.value = 'Nee';
		change_class (copyrightID);
	}
	/* Set tonen_westvlaanderen right */
	var tonen_wvl_ID = document.getElementById ('tonen_west_vlaanderen');
	if (!tonen_wvl_ID.value) {
		tonen_wvl_ID.value = 'Ja';
		change_class (tonen_wvl_ID);
	}
	return true;
}

/* Function to set class="changed" when an element is changed */
function change_class (node) {
	var class_v = node.getAttribute ('class');
	if (class_v) {
		class_v = class_v + "changed";
	} else {
		class_v = "changed";
	}
	node.setAttribute ('class', class_v);
	return true;
}