var popup = {
	show: function(name, param = 0) {
		var formEl = $('#form'),
			formSubmit = formEl.find('.button-submit'),
			popupContainer = $('.popup-fixed');
		if (name == 'remove') {
			formSubmit.attr('onclick', 'card.remove(' + param + ')');
		} else if (name == 'add') {
			formSubmit.attr('onclick', 'card.add()');
		}
		$('.window').addClass('window-black');
		popupContainer.fadeIn();
		$('.window-black').mouseup(function(e) {
			var popupContainer = $('.popup-fixed');
			if (!popupContainer.is(e.target) && popupContainer.has(e.target).length === 0) {
				popup.hide();
			}
		});
	},
	hide: function() {
		$('.window').removeClass('window-black');
		$('.popup-fixed').fadeOut();
	}
}

var card = {
	remove: function(cardId) {
		cardId.remove();
		popup.hide('remove');
	},
	add: function() {
		var cardsContainer = $('#cardsContainer'),
			newCard = '<div class="col col-12 col-sm-6 col-md-4" id="cardProd7">'+
								'<div class="card">'+
									'<div class="card__top">'+
										'<div class="card__remove" onclick="popup.show(\'remove\',\'cardProd7\')"><i class="fas fa-times"></i></div>'+
										'<div class="card__flex flex-box">'+
											'<div class="flex-box__item">'+
												'<div class="card__logo" style="background-color: rgba(158, 196, 195, 1);">'+
												'</div>'+
											'</div>'+
											'<div class="flex-box__item">'+
												'<div class="card__name">'+
													'Product New'+
												'</div>'+
												'<div class="card__brand">'+
													'Company 0'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="card__middle">'+
										'<div class="card__image" style="background-color: rgba(158, 196, 195, 1);"></div>'+
									'</div>'+
									'<div class="card__bottom">'+
										'<div class="card__desc">'+
											'<p>'+
												'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'+
											'</p>'+
										'</div>'+
										'<div class="card__buttons">'+
											'<div class="button button-white">ACTION 1</div>'+
											'<div class="button button-white">ACTION 2</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';
		cardsContainer.prepend(newCard);
		popup.hide();
	
	}
}
