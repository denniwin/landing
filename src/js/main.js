
//InputMask
$('#phone').mask('+7 (999) 999-99-99');

var cleave = new Cleave('#price', {
  delimiter: ' ',
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});



//Validate Email, Number
$(document).ready(function() {
  $(".order").validate({
    rules: {
      email: {
        required: true,
        email: true,
        maxlength: 30
      },

      phone: {
        required: true,
        minlength: 18
      },

    },
    errorPlacement: function(error, element) {   },
    errorClass : 'field__control_error',
    validClass : 'field__control_valid',
    submitHandler: function(form, event) {event.preventDefault()
    }
  });

//Send form
$(".order").on("submit", function(){
  $sendValue = $(this).serialize()
	$.ajax({
		url: './conf/telegram.php',
		method: 'POST',
		dataType: 'html',
		data: $sendValue,
		success: function(data){
      if (data === 'ok') {
        alert('Благодарим за обращение. Данные успешно приняты и отправлены менеджеру.')
        $(".order").reset()
      } else alert('Произошла ошибка, проверьте корректность ввода данных.')
		}
	});
  
});

//Checkbox 
$(window).keyup(function(e){
	var target = $('.checkbox-ios input:focus');
	if (e.keyCode == 9 && $(target).length){
		$(target).parent().addClass('focused');
	}
});

$('.checkbox-ios input').focusout(function(){
	$(this).parent().removeClass('focused');
});

//Counter
$(document).ready(function() {
	$('body').on('click', '.number-minus, .number-plus', function(){
		var $row = $(this).closest('.number');
		var $input = $row.find('.number-text');
		var step = $row.data('step');
		var val = parseFloat($input.val());
		if ($(this).hasClass('number-minus')) {
			val -= step;
		} else {
			val += step;
		}
		$input.val(val);
		$input.change();
		return false;
	});
});

//Slider
$('#slick').slick({
  rows: 2,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  arrows: true,
  dots: true,

  appendDots:$(".gallery__footer"),
  responsive: [
    {
        breakpoint: 700,
        settings: {
            rows: 2,
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }
]
  });

$('.gallery__button.bath').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("slick-active");
  $(this).addClass('slick-active')
  $('#slick').slick("slickGoTo", 1);
  });

$('.gallery__button.sauna').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("slick-active");
  $(this).addClass('slick-active')
  $('#slick').slick("slickGoTo", 5);
  });

$('.gallery__button.hammams').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("slick-active");
  $(this).addClass('slick-active')
  $('#slick').slick("slickGoTo", 9);
  });

$('.gallery__button.swim').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("slick-active");
  $(this).addClass('slick-active')
  $('#slick').slick("slickGoTo", 13);
  });


// function filteredSlick (filteredClass, slickName) {
//   $(slickName).slick('unslick');
//   $(slickName).find('.slide-item').each(function(e){ 
//     if ($(this).attr('data-set') !== filteredClass) {
//       $(this).addClass('hide')
//     } 
//   }
//   )
//   $(slickName).slick({
//     rows: 2,
//     slidesToShow: 4,
//     });
// }

//Slider for input
  $(function(){
    $('.slider_under-price').slider({
      min: 0,
      max: 4000000,
      value: 0,
      step: 1000,
      slide: function(event, ui){
        $('#price').val(ui.value);
      }
    });
  });

//label for slider
  var items = ['10','20','30','40+'];
  var s = $(".slider_under-price");

  s.slider({
    min:1,
    max:items.length,
  });

  var oneBig = 100 / (items.length - 1);

$.each(items, function(key,value){
  var w = oneBig;
  if(key === 0 || key === items.length-1)
    w = oneBig/2;
  $(".legend").append(`<label class="legend__label" style='width: ${w}%'>${value}</label>`);
});

//Show select menu
    $(".select__item_base").click(function(){
      $(this).parent().toggleClass("select_open")
    })
  
    $(".select__options .select__item").click(function(){
      $selectContainer =  $(this).parent().parent().parent()
      const text = $(this).find(".select__value").text()
      $selectContainer.find("input").val(text)
      $selectContainer.find(".select__item_base .select__value").text(text)
      $(".select_open").removeClass("select_open")
    })
  
    $(document).click(function(e){
      $(".select_open").each(function(){
        if( $(this).find(e.target).length == 0){
          $(this).removeClass("select_open")
        }
      })
    })
  })

//Show-hide icon password
$('body').on('click', '.password__button', function(){
  $passwordField = $('.password__field').attr('type')
  if ($passwordField === 'password') {
    $('.password__field').attr('type', 'text')
    $('.eye-off').show(200)
    $('.eye-on').hide(200)
  } else {
    $('.password__field').attr('type', 'password')
    $('.eye-off').hide(200)
    $('.eye-on').show(200)
  }
})

//Create array for post
  $('#wishes').on('input', function(){
    $value = $(this).val().split(' ')
    if ($value.length > 1 ) {
      $(this).val('')
      tags = []
      result = ''
      $('.tags__item').each(function(key, value) {
        tags.push($(value).text())
        result = tags.join(',')
        $('#tags').val(result)
        console.log($('#tags').val())
      })
      $('.tags').append(`<div class="tags__item"><span class="tags__value">${$value[0]}</span><span class="tags__delete"><img src="./img/Icon_delete.svg" alt="Icon_delete"></span></div>`)
    }
  })

//In basket
$('.table__button').click(function(e){
  e.preventDefault()
  $('html').animate({
    scrollTop: $('.order').offset().top + 50
});
  arr = []
  $price = $(this).parent().parent().find('td:nth(2)').text()
  arr = $price.split(' х ')
  $area = (arr.reduce((total, amount) => total + amount))/1000000;
  $('#name').val($(this).parent().parent().find('td:nth(0)').text())
  $('#price').val($(this).parent().parent().find('td:nth(3)').text())
  $('#count').val($area)
})

//Delete tags
  $(document).on('click','.tags__delete', (function(){
    $(this).parent().fadeOut (200, function() {
    $(this).remove()
  })
  }))

document.querySelector('.number-text').addEventListener('change', function(){
  let value = this.value;
  if(!value) return;
  value = value.replace(/ м²/g, '');
  this.value = value + ' м²';
}, false);