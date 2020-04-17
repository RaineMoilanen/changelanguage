/**
 * Just very simple set of functions to change the texts to chosen language inside the page, 
 * requires jquery
 * Call ChnLanguage with page and language, then gets texts from json file as defined and changes 
 * the values on page
 **/


function ReplaceTexts(my_json) {
	try {
		
		$(document).ready(function() {
			for (var key in my_json) {
				if (my_json.hasOwnProperty(key)) {
					if (document.getElementById(key) != null) {
						if (key.includes("_src")) {
							if (document.getElementById(key).hasAttribute("src")) {
								document.getElementById(key).setAttribute("src", my_json[key]);
							}
						}
						else {
							document.getElementById(key).innerHTML = my_json[key];
						}
					}
					else {
						console.log("Element by this key is null: "+key);
					}
				}    	
			}
		});
		return true;
	}
	catch (err) {
		alert("Couldn't change the texts: "+err);
		return false;
	}
}

function ChangeLanguage(page, language, placeholderstoo=false) {

	var languagefile; 
	var my_url="assets/";
	var my_json;
	my_url += page+language+".json";
	
	$.getJSON( my_url, function(json) {
	    my_json = json;
	}).done( function(json) {
	    // Success
	    my_json = json;
	    if (!ReplaceTexts(my_json)) {
	    	return false;
	    }
	    if (placeholderstoo) {
	    	if (!ReplacePlaceholders(language)) {
	    		return false;
	    	}
	    }
	}).fail( function() {
	    // Error
	    alert('Failed to load translations! Käännösten lataaminen ei onnistunut! не вдалося завантажити переклади!');
	    return false;
	}).always( function() {
	  // Complete
	});
	
	return true;

}

function ChnLanguage(language, mypage, setsession=false, setsessionurl="src/set_session.php") {
		if (language!=currentlanguage && language!=null && mypage!=null) {
			if (ChangeLanguage(mypage, language)) {
				currentlanguage=language;
				mylanguage=language;
				if (setsession) {
					$.post(setsessionurl, {
						language: language 
					});
				}
			}
		}
	//}
}

function ReplacePlaceholders(language, url="assets/placeholders") {
try {
	var my_url2=url;
	var my_json2;
	my_url2 += language+".json";
	$.getJSON( my_url2, function(json2) {
	    // Success
	    my_json2 = json2;
	}).done( function(json2) {
	    // Success
	    my_json2 = json2;
	    $(document).ready(function() {
			for (var key2 in my_json2) {
				if (my_json2.hasOwnProperty(key2)) {
					document.getElementById(key2).placeholder = my_json2[key2];
				}    	
			}
		});
	    
	}).fail( function() {
	    // Error
	    alert('Failed to change placeholders! Tekstien vaihtaminen ei onnistunut! не вдалося завантажити переклади!');
	    return false;
	}).always( function() {
	  // Complete
	});
	
	return true;
	}
	catch (err) {
		alert("Couldn't change the placeholders: "+err);
		return false;
	}
}