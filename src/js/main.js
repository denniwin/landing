//Mask telephone
$('#phone').mask('+7 999 999-99-99');

//Mask price
var cleavePrice = new Cleave('#price', {
  delimiter: ' ',
  numeral: true,
  numeralIntegerScale: 10,
  prefix: ' ₽',
  tailPrefix: true,
  numeralPositiveOnly: true,
  numeralThousandsGroupStyle: 'thousand'
});

//Mask count
var cleaveCount = new Cleave('#count', {
  delimiter: ' ',
  numeral: true,
  numeralIntegerScale: 8,
  prefix: ' м²',
  tailPrefix: true,
  numeralPositiveOnly: true,
  numeralThousandsGroupStyle: 'thousand'
});

//Validate field
$(".order").validate({
  rules: {
    email: {
      required: true,
      email: true,
      maxlength: 30
    },

    phone: {
      required: true,
      minlength: 16
    },

},
errorPlacement: function(error, element) {   },
errorClass : 'field__control_error',
validClass : 'field__control_valid',
submitHandler: function(form, event) {event.preventDefault()
  let $sendValue = $('.order').serialize();
  $.ajax({
    url: './conf/telegram.php',
    method: 'POST',
    dataType: 'html',
    data: $sendValue,
    success: function(data){
      if (data === 'ok') {
        $.fancybox.open({
          src: '#hidden',
          type: 'inline'
        });
        $('.order').find('.tags').remove();
        $('.order').find('.attach__content').remove();
        $('.order').trigger('reset');
        $('.order .select .select__item_base .select__value').text('Любые');
        $('.slider_under-price').slider( "value", 0 );
      } else 
      alert('Произошла ошибка, проверьте корректность ввода данных.');
    }
  });
}
});

//Checkbox 
$(window).keyup(function(e){
	var target = $('.checkbox input:focus');
	if (e.keyCode == 9 && $(target).length){
		$(target).parent().addClass('focused');
	}
});

$('.checkbox input').focusout(function(){
	$(this).parent().removeClass('focused');
});


//
$('.table__button').on('click', function(e) {
  e.preventDefault();
  let text = $(this).text();
  $(this).toggleClass('table__button_active');
  $(this).text(text == "В корзину" ? "В корзине" : "В корзину");
});

//Counter
	$('body').on('click', '.number__minus, .number__plus', function(){
		var $row = $(this).closest('.number');
		var $input = $row.find('.number__text');
		var step = $row.data('step');
		var val = parseFloat($input.val());
		if ($(this).hasClass('number__minus')) {
			val -= step;
		} else {
			val += step;
		}

    if (val < 0) {
      cleaveCount.setRawValue('0');
    } else {
      cleaveCount.setRawValue(val);
    }
		return false;
	});

//Slider for input
$(function(){
  $('.slider_under-price').slider({
    animate: "slow",
    range:'min',
    min: 10000000,
    max: 40000000,
    value: 0,
    step: 1000,
    slide: function(event, ui){
      cleavePrice.setRawValue(ui.value);
    }
  });

  $('#price').on('input', function(){
    let priceInt = parseInt(cleavePrice.getRawValue());
    $(".slider_under-price").slider({'value': priceInt});
  }); 
});


//Show select menu
$(".select__item_base").click(function(){
  $(this).parent().toggleClass("select_open");
})

$(".select__options .select__item").click(function(){
  let $selectContainer =  $(this).parent().parent().parent();
  let textBase = $('.select__item_base').text().trim();
  let textItem = $(this).find(".select__value").text();
  $selectContainer.find("input").val(textItem);
  $selectContainer.find(".select__item_base .select__value").text(textItem);
  $(this).find(".select__value").text(textBase)
  $(".select_open").removeClass("select_open");
})
  
$(document).click(function(e){
  $(".select_open").each(function(){
    if( $(this).find(e.target).length == 0){
      $(this).removeClass("select_open");
    }
  })
})

//Show-hide icon password
$('body').on('click', '.password__button', function(){
  let $passwordField = $('.password__field').attr('type');
  if ($passwordField === 'password') {
    $('.password__field').attr('type', 'text');
    $('.eye-off').show(200);
    $('.eye-on').hide(200);
  } else {
    $('.password__field').attr('type', 'password');
    $('.eye-off').hide(200);
    $('.eye-on').show(200);
  }
})

//Filtered slide
$('.gallery__button.gallery__button_bath').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  });

$('.gallery__button.gallery__button_sauna').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  });

$('.gallery__button.gallery__button_hammams').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  });

$('.gallery__button.gallery__button_swim').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  });


//Create array for post
$('#wishes').on('input', function(){
    let $value = $(this).val().split(', ');
    if ($value.length > 1 ) {
      $(this).val('');
      $('.tags').append(`<div class="tags__item"><span class="tags__value">${$value[0]}</span><span class="tags__delete"><img src="./img/Icon_delete.svg" alt="Icon_delete"></span></div>`);
    }
  
    let tags = [];
    let result = '';
    if ($(this).val().length > 3) {
      tags.push(`${$('#wishes').val()}`)
    } 
    $('.tags__value').each(function(key, value) {
      tags.push(`${$(value).text()}`);
    })

    result = tags.join(', ');
    $('#tags').val(result);

})

//Delete tags
$(document).on('click','.tags__delete', (function(){
  $(this).parent().fadeOut (200, function() {
  $(this).remove();
})
}))

//upload
var dropZone = $('.attach__title');

$('.attach__input').focus(function() {
  $('label').addClass('focus');
})
.focusout(function() {
  $('label').removeClass('focus');
});

dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
  return false;
});

dropZone.on('dragover dragenter', function() {
  dropZone.addClass('dragover');
});

dropZone.on('dragleave', function(e) {
  let dx = e.pageX - dropZone.offset().left;
  let dy = e.pageY - dropZone.offset().top;
  if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
    dropZone.removeClass('dragover');
  }
});

dropZone.on('drop', function(e) {
  dropZone.removeClass('dragover');
  let files = e.originalEvent.dataTransfer.files;
  sendFiles(files);
});

$('.attach__input').change(function() {
  let files = this.files;
  sendFiles(files);
});

$(document).on('click','.attach__content_delete', (function(){
$(this).parent().fadeOut (200, function() {
$(this).remove();
})
}))

function sendFiles(files) {
  let maxFileSize = 5242880;
  let Data = new FormData();
  $(files).each(function(index, file) {
    if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
      Data.append('images[]', file);
      $('.attach').append(`<div class="attach__content"><div class="attach__content_delete"><img src="./img/x-close.svg" alt="x"></div><div class="attach__content_name">${file.name}</div><progress class="attach__content_progress" value="100" max="100"></progress></div>`);
    }
  });
}

