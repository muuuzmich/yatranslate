chrome.contextMenus.create({
	title: 'Перевести выбранный текст',
	id: 'menu1',
	contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (tab){
		var text = info.selectionText;
		chrome.tabs.sendMessage(tab.id, {text: text});
	}
});