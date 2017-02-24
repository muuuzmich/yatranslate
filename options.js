// Saves options to chrome.storage

$('.item').click(function() {
	var lang = $(this).data('language')
	$('.dropdown-text').data('language', lang)
	$('.dropdown-text').html($(this).html())
})

$('.dropdown-toggle').click(function() {
	$(this).toggleClass('active')
})

var languages = {
	ru : "Русский",
	en : "English",
	de : "Deutch",
	uk : "Українська"
}

$(document).mousedown(function (e)
{
	var container = $(".dropdown-toggle");

	if (!container.is(e.target) // if the target of the click isn't the container...
		&& container.has(e.target).length === 0) // ... nor a descendant of the container
	{
		container.removeClass('active');
	}
});

function save_options() {
	var language = $('.dropdown-text').data('language');
	chrome.storage.sync.set({
		lang: language
	}, function() {
		var status = document.getElementById('status');
		$(status).css({
			'visibility' : 'visible',
			'opacity' : '1'
		});
		setTimeout(function() {
			$(status).css({
				'opacity' : '0'
			});
			setTimeout(function(){$(status).css('visibility','hidden')}, 300);
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		lang: 'ru'
	}, function(items) {
		var current = items.lang
		$('.dropdown-text').data('language', current)
		$('.dropdown-text').html(languages[current])
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options)