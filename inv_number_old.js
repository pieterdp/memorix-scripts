/* Inv Number js file */

/*
Function to add (pseudo) fields 'dubbel_van' en 'oud_inv_nummer'
that are then collapsed in the Note Field
*/
// document.getElementById ('opslaan').addEventListener ()

/* Meta function */
function start_inv () {
	
//	document.getElementById ('opslaan').addEventListener ('click', translate_fields, false);
		/* Add the two new fields */
	add_new_fields ();
	/* Add this function to a new button, so it stores all information */
	if (!document.getElementById ('validate_nr')) {
		var tr = document.getElementById ('oud_inventarisnummer').parentNode.parentNode.nextSibling;
		var new_button = document.createElement ('input');
		new_button.setAttribute ('type', 'button');
		new_button.setAttribute ('id', 'validate_nr');
		new_button.setAttribute ('value', 'Nummers valideren');
		new_button.addEventListener ('click', translate_fields, false);
		tr.parentNode.insertBefore (new_button, tr);
	}
	/* Add some magic to <id="inventarisnummer"> so it detects when something has changed */
	var inv_number_value = document.getElementById ('inventarisnummer').value;
	document.getElementById ('inventarisnummer').addEventListener ('change', function () {
		inv_number_changed (inv_number_value);		
	}, false);
	return true;
}

/* Function to wrap the fields into the note field */
function translate_fields () {
	/* Get the value of the new fields */
	var inv_number_old = document.getElementById ('oud_inventarisnummer').value;
	var double_of = document.getElementById ('dubbel_van').value;
	/* Now get the value of the "Notities"-field
		and use some RegExp to check whether it has already
		something like "Oud inventarisnummer: foo" or "Dubbel van foo".
		If so, replace the foo with new_foo. Else, add our new field
		values before all other content in the field*/
	var new_notes_value = "";
	/* Let's start with the old inventory number */
	if (inv_number_old !== "") {
		var notes = document.getElementById ('notities').value;
		if (notes !== "") {
			var matches = notes.match (/[Oo]ud inventarisnummer\:*\s+.+(\n|$)/gim);
			if (matches) {
				/* Only 1 match */
				var match = matches[0].split (/nummer\:*\s+/i);
				/* Always the second match */
				var numbers = match[1];
				/* Now split on ", ". Loop throught the array & compare the strings. If one of them matches, do nothing.
				If no string matches, add to the array */
				var found = false;
				var numbers = numbers.split (/,\s*/);
				for (i = 0; i < numbers.length; i++) {
					numbers[i] = numbers[i].trim();
					if (numbers[i] === inv_number_old) {
						found = true;
					}
				}
				if (found === false) {
					numbers.push (inv_number_old);
				}
				/* Join the array with comma's */
				if (numbers.length !== 1) {
					numbers = numbers.join (', ');
				} else {
					numbers = numbers[0];
				}
				/* Now replace the old inventaris stuff */
				new_notes_value = notes.replace (/[Oo]ud inventarisnummer\:*\s+.+(\n|$)/gim, 'Oud inventarisnummer: ' + numbers + "$1");
			} else {
				/* No matches, but notes has a value */
				new_notes_value = 'Oud inventarisnummer: ' + inv_number_old + "\n" + notes;
			}
		} else {
			new_notes_value = 'Oud inventarisnummer: ' + inv_number_old;
		}
		document.getElementById ('notities').value = new_notes_value;
		//alert (document.getElementById ('notities').value);
	}
	if (double_of !== "") {
		var notes = document.getElementById ('notities').value;
		if (notes !== "") {
			var matches = notes.match (/[D]ubbel van\:*\s+.+(\n|$)/gim);
			if (matches) {
				/* Only 1 match */
				var match = matches[0].split (/van\:*\s+/i);
				/* Always the second match */
				var numbers = match[1];
				/* Now split on ", ". Loop throught the array & compare the strings. If one of them matches, do nothing.
				If no string matches, add to the array */
				var found = false;
				var numbers = numbers.split (/,\s*/);
				for (i = 0; i < numbers.length; i++) {
					if (numbers[i] === double_of) {
						found = true;
					}
				}
				if (found === false) {
					numbers.push (double_of);
				}
				/* Join the array with comma's */
				if (numbers.length !== 1) {
					numbers = numbers.join (', ');
				} else {
					numbers = numbers[0];
				}
				/* Now replace the old inventaris stuff */
				new_notes_value = notes.replace (/[D]ubbel van\:*\s+.+(\n|$)/gim, 'Dubbel van: ' + numbers + "$1");
			} else {
				/* No matches, but notes has a value */
				new_notes_value = 'Dubbel van: ' + double_of + "\n" + notes;
			}
		} else {
			new_notes_value = 'Dubbel van: ' + double_of;
		}
		document.getElementById ('notities').value = new_notes_value;
		/* Remove the "webdisplay"-flag */
		var webdisplayId = document.getElementById ('webdisplay');
		webdisplayId.removeAttribute ('checked');
	}
	
	return true;
}

/* Function to auto-fill in the new fields when the value of inventarisnummer changed */
function inv_number_changed (old_value) {
	var new_value = document.getElementById ('inventarisnummer').value;
	if (new_value !== old_value) {
		/* Update field oud_inventarisnummer */
		document.getElementById ('oud_inventarisnummer').value = old_value;
	}
	return true;
}

/* Function to create a new field
@param Type - type of input field
@param array of arrays Attrs - attributes - must contain id (_id), value (_value) and name (_name)
@param array of arrays Labels - label - must contain at least "for" (as _for) and label_text (as _label)
*/
function create_field (Type, Attrs, Labels) {
	/* Create the containing <tr> & <th> */
	var new_field = document.createElement ('tr');
	new_field.setAttribute ('class', '  ');
	/* Label */
	var th = document.createElement ('th');
	var label = document.createElement ('label');
	label.setAttribute ('class', 'optional');
	label.setAttribute ('for', Labels._for);
	label.innerHTML = Labels._label;
	/* Input */
	var td = document.createElement ('td');
	td.setAttribute ('class', 'value lastrecordcopyable');
	td.setAttribute ('colspan', 4);
	var input = document.createElement ('input');
	input.setAttribute ('id', Attrs._id);
	input.setAttribute ('type', Type);
	input.setAttribute ('autocomplete', 'on');
	input.setAttribute ('visibility', 1);
	input.setAttribute ('value', Attrs._value);
	input.setAttribute ('name', Attrs._name);
	td.appendChild (input);
	th.appendChild (label);
	new_field.appendChild (th);
	new_field.appendChild (td);
	return new_field;
}

/* Function to create the new fields (oud_inventarisnummer & dubbel_van)
*/
function add_new_fields () {
	var inv_number_tr = document.getElementById ('uitgever').parentNode.parentNode;
	if (!document.getElementById ('dubbel_van')) {
		var double_of_number_attrs = [];
		double_of_number_attrs._id = 'dubbel_van';
		double_of_number_attrs._value = '';
		double_of_number_attrs._name = 'dubbel_van';
		var double_of_number_label = [];
		double_of_number_label._for = 'dubbel_van';
		double_of_number_label._label = 'Dubbel van'
		var double_of_number = create_field ('text', double_of_number_attrs, double_of_number_label);
		double_of_number.addEventListener ('change', function () {
			node = document.getElementById ('dubbel_van');
			change_class (node);
		}, false);
		inv_number_tr.parentNode.insertBefore (double_of_number, inv_number_tr);
	}
	if (!document.getElementById ('oud_inventarisnummer')) {
		var old_inv_number_attrs = [];
		old_inv_number_attrs._id = 'oud_inventarisnummer';
		old_inv_number_attrs._value = '';
		old_inv_number_attrs._name = 'oud_inventarisnummer';
		var old_inv_number_label = [];
		old_inv_number_label._for = 'oud_inventarisnummer';
		old_inv_number_label._label = 'Oud inventarisnummer'
		var old_inv_number = create_field ('text', old_inv_number_attrs, old_inv_number_label);
		old_inv_number.addEventListener ('change', function () {
			node = document.getElementById ('oud_inventarisnummer');
			change_class (node);
		}, false);
		inv_number_tr.parentNode.insertBefore (old_inv_number, inv_number_tr);
	}
	/* The new fields are inserted after input id="inventarisnummer" -> in the next row */
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