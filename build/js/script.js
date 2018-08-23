'use strict';

var popup = {
	show: function show(name, param) {
		if (name == 'remove') {
			$('#form .button-submit').attr('onclick', 'card.remove(' + param + ')');
		}
		$('.window').addClass('window-black');
		$('#' + name + 'Popup').fadeIn();
		$('.window-black').mouseup(function (e) {
			var container = $('.popup-fixed');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				popup.hide(name);
			}
		});
	},
	hide: function hide(name) {
		$('.window').removeClass('window-black');
		$('#' + name + 'Popup').fadeOut();
	}
};

var card = {
	remove: function remove(cardId) {
		cardId.remove();
		popup.hide('remove');
	}
};