var key = "trnsl.1.1.20170113T144506Z.07f0eb996669ea28.552fbbb988d0e6fa45d2113268e111b24f4ef3b0";
// var Dkey = "dict.1.1.20170114T142701Z.ca0a7d7889a73eab.d46b14394573f61cf3a1709e22d56ca17bd7ebc0";
var lang, dlang, d_response;

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
			? args[number]
			: match
			;
		});
	};
}
$(document).ready(function() {
	// $('<div/>', {
	// 	css: {
	// 		'pointer-events': 'none',
	// 		'height': '100%',
	// 		'width': '100%',
	// 		'position': 'absolute',
	// 		'left': 0,
	// 		'top': 0,
	// 		'z-index' : 99999
	// 	},
	// 	class: "YaTranslate_overlay"
	// }).appendTo('body');

	chrome.storage.sync.get({
		lang: 'ru'
	}, function(items) {
		lang = items.lang;
	});
});

$( document ).dblclick(function( e ) {
	if (window.getSelection()) {
		if (window.getSelection().toString().length>1) {
			var text = window.getSelection().toString();
			translate(text);
		}
	}
})

// $(document).mouseup(function (e)
// {
// 	var container = $(".dictionaryPopup");

// 	if (!container.is(e.target) // if the target of the click isn't the container...
// 		&& container.has(e.target).length === 0) // ... nor a descendant of the container
// 	{
// 		container.remove();
// 	}
// });

$(window).click(function() {
	$('.dictionaryPopup').remove()
});

function translate (text) {
	chrome.storage.sync.get({
		lang: 'ru'
	}, function(items) {
		lang = items.lang;
	});
	$('.dictionaryPopup').remove()
	createPopup()
	arr = text.split(" ")
	arr = arr.filter(function(n){ return n != "" });

	stroke = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={0}&text={1}&lang={2}".format(key, text, lang)
	$.ajax({
		url: stroke,
		contentType: false,
		dataType: 'json',
	})
	.done(function(data) {
		var response = data['text'][0];
		// var d_lang = data['lang'];
		// stroke = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang={2}&text={1}&ui={3}".format(Dkey, text, d_lang,lang)
		// $.ajax({
		// 	url: stroke,
		// 	contentType: false,
		// 	dataType: 'json',
		// })
		// .done(function(data) {
		// 	var pos = data['def'][0]['pos'];
		// 	var tr = data['def'][0]['tr'][0]['text']
		// 	if(response != tr){
		// 		fillPopup(response + ", " + tr)
		// 	}
		// 	else{
		// 		fillPopup(response + ", " + tr)
		// 	}
		// })
		// .fail(function(data) {
			fillPopup(response)
		// }) 
	})
	.fail(function(data) {
		fillPopup("Error. Please try later.");
	})
	
}
function createPopup(text){
	var bodyRect = document.body.getBoundingClientRect(),
	s = window.getSelection(),
	oRange = s.getRangeAt(0),
	elemRect = oRange.getBoundingClientRect(),
	w = elemRect.width,
	h = elemRect.height,
	top,
	left = w/2

	top = elemRect.top - bodyRect.top + 10 + h
	
	if(elemRect.left > 150){
		left = elemRect.left - 150 + w/2
	}

	$('<div/>', {
		css: {
			top: top,
			left : left
		},
		class: "dictionaryPopup"
	}).appendTo('body');
}
function fillPopup(text) {
	$('.dictionaryPopup').html($('.dictionaryPopup').html() + text)
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	translate(request.text);
});