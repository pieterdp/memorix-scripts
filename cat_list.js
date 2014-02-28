/* Cat List js file */

/*
Function to add a drop-down menu with the defined top categories
*/
function create_dropdown_list_topcategory (DefaultValue) {
	/*
	List of TopCategories is fixed
	*/
	var CatList = load_xml ('topcat', "");
	var DropDownList = create_dropdown_list (CatList, 'hoofdcategorie', DefaultValue);
	DropDownList.addEventListener ("click", function () {change_subcategory_list ()}, false);
	return DropDownList;
}
/*
Function to change the list of subcategories based on user input
*/
function change_subcategory_list () {
	// Subcategories
	var TopCatList = load_xml ('topcat', "");
	var SubCatList = new Array ();
	for (var i = 0; i < TopCatList.length; i++) {
		Parent = new Array (TopCatList[i]);
		SubCatList.push (load_xml ('subcat', Parent));
	}
	// Check whether we have a DefaultValue
	var DefaultValue = "";
	if (document.getElementById ("subcategorie").value !== "") {
		DefaultValue = document.getElementById ("subcategorie").value;
	}
	// Get the value of "hoofdcategorie"
	if (typeof (document.getElementById ('hoofdcategorie').selectedIndex) != "undefined") {
		var TopCatSel = document.getElementById ('hoofdcategorie').options[document.getElementById ('hoofdcategorie').selectedIndex - 1];
		var DropDownList = create_dropdown_list (SubCatList[TopCatSel.index], 'subcategorie', DefaultValue);
		DropDownList.addEventListener ("click", function () {change_details_list ()}, false);
		var SubCatId = document.getElementById ("subcategorie");
		SubCatId.parentNode.replaceChild (DropDownList, SubCatId);
	}
	return DropDownList;
}

/*
Function to change the list of details based on user input
*/
function change_details_list () {
	// Details
	// -> need to get top & subcat

	// Check whether we have a DefaultValue
	var DefaultValue;
	if (document.getElementById ("detail").value !== "") {
		DefaultValue = document.getElementById ("detail").value;
	}
	// Get the value of "subcategorie"
	if (typeof (document.getElementById ('subcategorie').selectedIndex) != "undefined") {
		// Get the value of TopCat -> so we can find the right subcat & the right detail list (.text!)
		var TopCatSel = document.getElementById ('hoofdcategorie').options[document.getElementById ('hoofdcategorie').selectedIndex];
		var SubCatSel = document.getElementById ('subcategorie').options[document.getElementById ('subcategorie').selectedIndex];
		var Parent = new Array (TopCatSel.text, SubCatSel.text);
		var CatList = load_xml ('subcat', Parent);
		var DropDownList = create_dropdown_list (CatList, 'detail', DefaultValue);
		var DetailId = document.getElementById ("detail");
		DetailId.parentNode.replaceChild (DropDownList, DetailId);
	}
	return DropDownList
}

/*
Meta function to create a dropdown list
*/
function create_dropdown_list (List, Type, DefaultValue) {
	var DropDownList = document.createElement ('select');
	DropDownList.setAttribute ('id', Type);
	DropDownList.setAttribute ('value', '');
	DropDownList.setAttribute ('visibility', 1);
	DropDownList.setAttribute ('name', Type);
	/* Add the empty string element in position 0 */
	var DropDownElement = document.createElement ('option');
	DropDownElement.setAttribute ('value', '');
	DropDownElement.setAttribute ('id', Type.concat ('_', 'empty_string'));
	DropDownElement.innerHTML = '';
	DropDownList.appendChild (DropDownElement);
	for (var i = 0; i < List.length; i++) {
		if (List[i] === DefaultValue) {
			var DropDownElement = document.createElement ('option');
			DropDownElement.setAttribute ('value', List[i]);
			DropDownElement.setAttribute ('id', Type.concat ('_', List[i]));
			DropDownElement.setAttribute ('selected', 'selected');
			DropDownElement.innerHTML = List[i];
		} else {
			var DropDownElement = document.createElement ('option');
			DropDownElement.setAttribute ('value', List[i]);
			DropDownElement.setAttribute ('id', Type.concat ('_', List[i]));
			DropDownElement.innerHTML = List[i];
		}
		DropDownList.appendChild (DropDownElement);
	}
	return DropDownList;
}

function load_xml (Type, Parents) {
	/* Ugly solution to a problem that shouldn't exist */
	var xmlText = '<?xml version="1.0" encoding="ISO-8859-1"?><catlist><topcat><name>cartografie</name><subcat><name>plattegronden (kaarten)</name></subcat><subcat><name>plattegronden (gebouwen)</name></subcat><subcat><name>kadastrale kaarten</name></subcat><subcat><name>luchtfoto\'s en panorama\'s</name></subcat></topcat><topcat><name>topografie (kenmerk)</name><subcat><name>bouwwerken</name><detail><name>appartementen</name></detail><detail><name>balzalen</name></detail><detail><name>bejaardentehuizen en kindertehuizen</name></detail><detail><name>bibliotheken (gebouwen) en archiefgebouwen</name></detail><detail><name>bioscopen</name></detail><detail><name>boerderijen (complexen)</name></detail><detail><name>brandweerkazernes</name></detail><detail><name>brouwerijen en mouterijen</name></detail><detail><name>concertgebouwen en theaters</name></detail><detail><name>dijken</name></detail><detail><name>fabrieksgebouwen, ambachtelijke werkplaatsen en ateliers (werkruimten)</name></detail><detail><name>garages</name></detail><detail><name>gasthuizen (ziekenhuizen)</name></detail><detail><name>gerechtsgebouwen</name></detail><detail><name>gevangenissen</name></detail><detail><name>gildenhuizen</name></detail><detail><name>grensmarkeringen</name></detail><detail><name>handelsgebouwen</name></detail><detail><name>hijskranen</name></detail><detail><name>hotels (logiesvoorzieningen), restaurants, cafés</name></detail><detail><name>kantoorgebouwen</name></detail><detail><name>kastelen, paleizen</name></detail><detail><name>koetshuizen en stallen</name></detail><detail><name>kostscholen</name></detail><detail><name>magazijnen (opslagplaatsen) en pakhuizen (opslagplaatsen)</name></detail><detail><name>markten (gebouwen) en veilinggebouwen</name></detail><detail><name>molens (gebouwen)</name></detail><detail><name>musea</name></detail><detail><name>pandhuizen</name></detail><detail><name>politiebureaus </name></detail><detail><name>pompinstallaties (waterdistributie)</name></detail><detail><name>postkantoren</name></detail><detail><name>provinciehuizen en stadhuizen</name></detail><detail><name>recreatiegebouwen</name></detail><detail><name>scholen (gebouwen)</name></detail><detail><name>sportgebouwen</name></detail><detail><name>stationsgebouwen</name></detail><detail><name>straatmeubilair</name></detail><detail><name>tentoonstellingszalen en -ruimten</name></detail><detail><name>tolhuizen en douanekantoren</name></detail><detail><name>torens (bouwwerken)</name></detail><detail><name>woonhuizen</name></detail><detail><name>ziekenhuizen</name></detail><detail><name>zwembaden en badhuizen</name></detail></subcat><subcat><name>militaire gebouwen</name><detail><name>commanderijen</name></detail><detail><name>forten en verdedigingswerken</name></detail><detail><name>kazernes</name></detail><detail><name>magazijnen (opslagplaatsen)</name></detail><detail><name>militaire ziekenhuizen</name></detail><detail><name>stadspoorten</name></detail><detail><name>wallen (verdedigingswerken)</name></detail></subcat><subcat><name>religieuze gebouwen</name><detail><name>abdijen en kloosters</name></detail><detail><name>begijnhoven</name></detail><detail><name>kapellen (ruimten of constructies)</name></detail><detail><name>kerken en kathedralen</name></detail><detail><name>pastorieën</name></detail><detail><name>refugehuizen en priorijen</name></detail><detail><name>seminaries</name></detail></subcat><subcat><name>interieurs</name></subcat><subcat><name>straten, pleinen, parken (openbare ruimten), parken (tuinarchitectuur) en bruggen</name><detail><name>begraafplaatsen en kerkhoven</name></detail><detail><name>bruggen</name></detail><detail><name>dorpsgezichten, stadsgezichten (cultuurlandschappen) en stadsgezichten (beeldmateriaal)</name></detail><detail><name>straatgezichten</name></detail><detail><name>kerkhoven, gedenktekens en grafmonumenten</name></detail><detail><name>marktplaatsen</name></detail><detail><name>parken (openbare ruimten), parken (tuinarchitectuur) en tuinen</name></detail><detail><name>pleinen</name></detail><detail><name>straten</name></detail></subcat><subcat><name>wateren en onderdelen van water en havens</name><detail><name>beken</name></detail><detail><name>grachten</name></detail><detail><name>havens</name></detail><detail><name>kanalen</name></detail><detail><name>riolen</name></detail><detail><name>rivieren</name></detail><detail><name>sluizen</name></detail><detail><name>vijvers</name></detail></subcat><subcat><name>natuurlandschappen</name><detail><name>bossen</name></detail><detail><name>grotten</name></detail><detail><name>heide</name></detail><detail><name>heuvels</name></detail><detail><name>kust, stranden en duinen</name></detail><detail><name>weiden</name></detail><detail><name>zeeën</name></detail></subcat></topcat><topcat><name>sociale geschiedenis</name><subcat><name>communicatiesystemen en onderdelen van telecommunicatiesystemen</name></subcat><subcat><name>geloof </name><detail><name>bedevaarten</name></detail></subcat><subcat><name>gezondheid</name></subcat><subcat><name>handel en industrie (economisch begrip)</name><detail><name>ambachten</name></detail><detail><name>binnenvaart</name></detail><detail><name>handel</name></detail><detail><name>hotels (logiesvoorzieningen), restaurants, cafés</name></detail><detail><name>industrie (economisch begrip) en kunstnijverheid</name></detail><detail><name>brouwerijen</name></detail><detail><name>bouwtechniek en civiele techniek</name></detail><detail><name>goudleer (behang)</name></detail><detail><name>havens</name></detail><detail><name>kantklossen</name></detail><detail><name>markten (gebeurtenissen)</name></detail><detail><name>meubelmaken</name></detail><detail><name>steenbakken</name></detail><detail><name>tapijtmaken</name></detail><detail><name>textielvervaardigingsprocedés en technieken</name></detail><detail><name>landbouw en boeren (activiteit)</name></detail><detail><name>akkerbouw</name></detail><detail><name>tabak</name></detail><detail><name>veeteelt</name></detail><detail><name>vlas</name></detail><detail><name>tuinbouw</name></detail><detail><name>boomkwekerij (tuinbouw)</name></detail><detail><name>fruitkwekerijen</name></detail><detail><name>groentekwekerijen</name></detail><detail><name>siergewassenkwekerijen</name></detail><detail><name>visvangst</name></detail></subcat><subcat><name>huishoudkunde</name><detail><name>brandstof</name></detail><detail><name>voedsel</name></detail></subcat><subcat><name>kunst en cultuur</name><detail><name>beeldhouwwerken (beeldmateriaal)</name></detail><detail><name>film (uitvoerende kunsten)</name></detail><detail><name>literatuur (geschriften)</name></detail><detail><name>mode</name></detail><detail><name>muziek</name></detail><detail><name>schilderen (kunst)</name></detail><detail><name>tentoonstellingen</name></detail><detail><name>theater (vakgebied)</name></detail></subcat><subcat><name>onderwijs en wetenschappelijk onderzoeken</name><detail><name>onderwijs</name></detail><detail><name>wetenschappelijk onderzoeken</name></detail><detail><name>archeologie</name></detail><detail><name>plantkunde</name></detail></subcat><subcat><name>politiek en sociale kwesties, organisaties</name><detail><name>belastingen</name></detail><detail><name>politieke campagnes</name></detail><detail><name>protesteren </name></detail><detail><name>stakingen (gebeurtenissen)</name></detail><detail><name>verkiezingen</name></detail><detail><name>verzetsbewegingen</name></detail></subcat><subcat><name>rechten (vakgebied)</name><detail><name>Rechtbanken (gerechtelijke instanties)</name></detail><detail><name>Wetgeving</name></detail></subcat><subcat><name>reclameboodschappen, advertenties (drukwerk)</name></subcat><subcat><name>toerisme</name></subcat><subcat><name>transportmiddelen</name><detail><name>dieren</name></detail><detail><name>fietsen (transportmiddelen)</name></detail><detail><name>karren en koetsen (rijtuigen)</name></detail><detail><name>luchtvaartuigen</name></detail><detail><name>motorvoertuigen</name></detail><detail><name>onderwatervaartuigen</name></detail><detail><name>openbaar vervoer</name></detail><detail><name>militaire voertuigen</name></detail><detail><name>vaartuigen</name></detail></subcat><subcat><name>verenigingen, sporten (lichamelijke activiteiten), ontspanningsmiddelen en recreatie</name><detail><name>folklore</name></detail><detail><name>ontspanningsmiddelen, recreatie</name></detail><detail><name>sporten (lichamelijke activiteiten)</name></detail><detail><name>verenigingen</name></detail></subcat><subcat><name>wapens en munitie</name><detail><name>Granaten</name></detail><detail><name>Kanonnen</name></detail><detail><name>Landmijnen</name></detail><detail><name>Zeemijnen</name></detail><detail><name></name></detail></subcat></topcat><topcat><name>personen en dieren</name><subcat><name>arbeiders</name></subcat><subcat><name>bewoners</name></subcat><subcat><name>dieren</name></subcat><subcat><name>kinderen</name></subcat><subcat><name>koningen (personen), leden van het Koninklijk Huis</name></subcat><subcat><name>militair personeel, soldaten</name></subcat><subcat><name>openbare diensten</name></subcat><subcat><name>politici</name></subcat><subcat><name>religieuzen</name></subcat><subcat><name>sportmannen, sportvrouwen</name></subcat><subcat><name>toerisme</name></subcat><subcat><name>vluchtelingen</name></subcat><subcat><name>wetenschappers</name></subcat></topcat><topcat><name>gebeurtenissen</name><subcat><name>feesten en ceremonies</name><detail><name>carnaval</name></detail><detail><name>rites de passage</name></detail><detail><name>dopen (religieuze ceremonies)</name></detail><detail><name>herdenkingen</name></detail><detail><name>jubilea</name></detail><detail><name>kermissen</name></detail><detail><name>optochten</name></detail><detail><name>wijdingen</name></detail></subcat><subcat><name>oorlogen</name><detail><name>wereldoorlogen</name></detail></subcat><subcat><name>optochten en processies</name></subcat><subcat><name>rampen en ongelukken</name><detail><name>branden</name></detail><detail><name>ongelukken</name></detail><detail><name>overstromingen</name></detail><detail><name>stormen</name></detail></subcat></topcat><topcat><name>Plaatsen</name></topcat></catlist>';
	xmlText = xmlText.replace (/<name>([a-z])/gi, to_upper);
	var parser = new DOMParser ();
	var xmlDoc = parser.parseFromString (xmlText, "application/xml");
	return load_nodes (Type, Parents, xmlDoc);
}

/* Quick function to transfer <name>foo to <name>Foo */
function to_upper (match, p1, offset, string) {
	var uppercased = p1.toUpperCase ();
	uppercased = "<name>" + uppercased;
	return uppercased;
}

/*
Meta function to load the list of nodes of a certain type (topcat, subcat, detail)
Returns an array of the name attribute of all items for this type
Requires the name of the parent item(s) when type = sub/detail
*/
function load_nodes (Type, Parents, xmlDoc) {
	dname = "http://www.helptux.be/categories_beeldbank.xml"
/* Try to read XML data and return what we need */
	var CatList = new Array ();
	if (Type != 'topcat') {
		x = xmlDoc.getElementsByTagName ('topcat');
		for (var i = 0; i < x.length; i++) {
			if (x[i].firstChild.innerHTML === Parents[0]) {
				// This is the right topcat, now go to subcats
				var TopCat = x[i];
				if (typeof (Parents[1]) != "undefined") {
					// Detaillist
					var x = TopCat.childNodes;
					for (i = 0; i < x.length; i++) {
						//alert ("aa " + x[i].firstChild.innerHTML + "bb" + Parent[1] )
						if (x[i].firstChild.innerHTML === Parents[1]) {
							// Correct top & subcat, now get the details
							var SubCat = x[i];
							var y = SubCat.childNodes;
							for (j = 0; j < y.length; j++) {
								if (typeof (y[j].firstChild.innerHTML) != "undefined") {
									CatList.push (y[j].firstChild.innerHTML);
								}
							}
						}
					}
				} else {
					// Subcatlist
					var x  = TopCat.childNodes;
					for (i = 0; i < x.length; i++) {
						if (typeof (x[i].firstChild.innerHTML) != "undefined") {
							CatList.push (x[i].firstChild.innerHTML);
						}
					}
				}
				break
			}
		}
	} else {
		// Topcatlist
		x = xmlDoc.getElementsByTagName ('topcat');
		for (var i = 0; i < x.length; i++) {
			CatList.push (x[i].firstChild.innerHTML);
		}
	}
	return CatList;
}

/* Metafunction to be called by load etc. */
function start_catlist () {
	// Picturae built this site in such a way some elements are loaded after the DOM is complete. This fixes that.
	/* Hoofdcategorie */
	var TopCatId = document.getElementById ("hoofdcategorie");
	if (!TopCatId.value) {
		var TopCategory = create_dropdown_list_topcategory (TopCatId.value);
		TopCatId.parentNode.replaceChild (TopCategory, TopCatId);
	} else {
		TopCatId.addEventListener ('focus', function () {
			var TopCategory = create_dropdown_list_topcategory (TopCatId.value);
			TopCatId.parentNode.replaceChild (TopCategory, TopCatId);
		}, false);
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