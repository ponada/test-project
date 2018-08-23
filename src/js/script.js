var popup = {
	show: function(name, param = 0) {
		var formEl = $('#form'),
			formSubmit = formEl.find('.button-submit'),
			popupContainer = $('.popup-fixed');
		if (name == 'remove') {
			formSubmit.attr('onclick', 'card.remove("' + param + '")');
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
		if ($('.window').hasClass('window-black')) {
			$('.window').removeClass('window-black');
			$('.popup-fixed').fadeOut();
		}
	}
}

var cardsObject = [
	{
		id: 'cardProd1',
		name: 'Product 1' ,
		brand: 'Company1' ,
		logo: 'rgba(105, 121, 150, 1)',
		img: 'rgba(105, 121, 150, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	},
	{
		id: 'cardProd2',
		name: 'Product 2' ,
		brand: 'Company 2' ,
		logo: 'rgba(142, 105, 150, 1)',
		img: 'rgba(147, 84, 160, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	},
	{
		id: 'cardProd3',
		name: 'Product 3' ,
		brand: 'Company 2' ,
		logo: 'rgba(120, 61, 132, 1)',
		img: 'rgba(120, 61, 132, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	},
	{
		id: 'cardProd4',
		name: 'Product 3' ,
		brand: 'Company 2' ,
		logo: 'rgba(142, 105, 150, 1)',
		img: 'rgba(102, 37, 116, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	},
	{
		id: 'cardProd5',
		name: 'Product 4' ,
		brand: 'Company 3' ,
		logo: 'rgba(216, 192, 138, 1)',
		img: 'rgba(216, 192, 138, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	},
	{
		id: 'cardProd6',
		name: 'Product 5' ,
		brand: 'Company 4' ,
		logo: 'rgba(158, 196, 195, 1)',
		img: 'rgba(158, 196, 195, 1)',
		desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
	}
];

var card = {
	remove: function(cardId = all) {
		if (cardId == 'all') {
			$('#cardsContainer').children().remove();
		} else {
			for(var field in cardsObject){
				if(cardsObject[field].id == cardId){
					cardsObject.splice(field, 1);
				}
			}
			$('#' + cardId).remove();
			popup.hide('remove');
		}
	},
	add: function(newItem) {
		var cardsContainer = $('#cardsContainer');
		if (newItem === undefined) {
			var count = cardsObject.length + 1;
			var itemObject = ({
				id: 'cardProd' + count,
				name: 'Product New ' + count,
				brand: 'Company 4' ,
				logo: 'rgba(158, 196, 195, 1)',
				img: 'rgba(158, 196, 195, 1)',
				desc: 'Lorem ipsum dolor sit amet, soluta regione urbanitas vis in, qui elit populo ut.'
			});
			var item = card.create(itemObject)
			cardsObject.unshift(itemObject);
		} else {
			var item = card.create(newItem);
		}
		cardsContainer.prepend(item);
		popup.hide();
	},
	append: function(newItem) {
		var cardsContainer = $('#cardsContainer');
		cardsContainer.append(newItem);
	},
	create: function(cardItem) {	
		var newCard = '<div class="col col-12 col-sm-6 col-md-4" id="' + cardItem.id + '">'+
								'<div class="card">'+
									'<div class="card__top">'+
										'<div class="card__remove" onclick="popup.show(\'remove\','+ 
										'\'' + cardItem.id + '\'' + 
										')"><i class="fas fa-times"></i></div>'+
										'<div class="card__flex flex-box">'+
											'<div class="flex-box__item">'+
												'<div class="card__logo" style="background-color: ' + cardItem.logo + '">'+
												'</div>'+
											'</div>'+
											'<div class="flex-box__item">'+
												'<div class="card__name">'+
													cardItem.name +
												'</div>'+
												'<div class="card__brand">'+
													cardItem.brand +
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="card__middle">'+
										'<div class="card__image" style="background-color: ' + cardItem.img + '"></div>'+
									'</div>'+
									'<div class="card__bottom">'+
										'<div class="card__desc">'+
											'<p>'+
												cardItem.desc +
											'</p>'+
										'</div>'+
										'<div class="card__buttons">'+
											'<div class="button button-white">ACTION 1</div>'+
											'<div class="button button-white">ACTION 2</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';
		return newCard;
	},
	search: function(searchVal) {
		var resultItems = filterByName(cardsObject, searchVal);
		card.remove('all');
		if (resultItems.length !== 0) {
			for(var field in resultItems){
				var newEl = card.create(resultItems[field]);
				card.append(newEl);
				field++;
			}
			$('.pagination').css('display', 'block');
		} else {
			$('.pagination').css('display', 'none');
		}
	},
	render: function () {
		for(var field in cardsObject) {
			var newEl = card.create(cardsObject[field]);
			card.append(newEl);
			field++;
		}
	}
}

function filterByName(arr, search) {
	var result = arr.filter(function(el) {
		for(var field in el){
			if(el.name.toLowerCase().indexOf(search) > -1){
				return true;
			}
		}
		return false;
	});
	return result;
};

$('input.form__search').on('keyup', function(){
    var el = $(this),
		delay = 500;
    clearTimeout(el.data('timer'));
    el.data('timer', setTimeout(function(){
        el.removeData('timer');
		if (el.val().length != 0) {
			card.search(el.val().toLowerCase());
		} else {
			card.remove('all');
			card.render();
		}
    }, delay));
});


