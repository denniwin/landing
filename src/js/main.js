//InputMask
$('#phone').mask('+7 999 999-99-99');

var cleavePrice = new Cleave('#price', {
  delimiter: ' ',
  numeral: true,
  numeralIntegerScale: 10,
  prefix: ' ₽',
  tailPrefix: true,
  numeralPositiveOnly: true,
  numeralThousandsGroupStyle: 'thousand'
});

var cleaveCount = new Cleave('#count', {
  delimiter: ' ',
  numeral: true,
  numeralIntegerScale: 8,
  prefix: ' м²',
  tailPrefix: true,
  numeralPositiveOnly: true,
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
              alert('Благодарим за обращение. Данные успешно приняты и отправлены менеджеру.')
              $('.order').find('input[type=text]').val('');
            } else alert('Произошла ошибка, проверьте корректность ввода данных.')
          }
        });
      }
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

    if (val < 0) {
      $input.val('0');
    } else {
      $input.val(val);
      $input.change();
    }
		return false;
	});
});

//Slider
$('.js-slider').slick({
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

//Slider for input
  $(function(){
    $('.slider_under-price').slider({
      animate: "slow",
      range:'min',
      min: 0,
      max: 4000000,
      value: 0,
      step: 1000,
      slide: function(event, ui){
        $('#price').val(ui.value);
      }
    });

    $('#price').on('input', function(){
      let priceInt = parseInt(cleavePrice.getRawValue());
      $(".slider_under-price").slider({'value': priceInt});
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
  if (key === 0 || key === items.length-1)
    w = oneBig/2;
  $(".legend").append(`<label class="legend__label" style='width: ${w}%'>${value}</label>`);
});

//Show select menu
    $(".select__item_base").click(function(){
      $(this).parent().toggleClass("select_open");
    })
  
    $(".select__options .select__item").click(function(){
      let $selectContainer =  $(this).parent().parent().parent();
      const text = $(this).find(".select__value").text();
      $selectContainer.find("input").val(text);
      $selectContainer.find(".select__item_base .select__value").text(text);
      $(".select_open").removeClass("select_open");
    })
  
    $(document).click(function(e){
      $(".select_open").each(function(){
        if( $(this).find(e.target).length == 0){
          $(this).removeClass("select_open");
        }
      })
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

$('.gallery__button.gallery__button_bath').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  // $(this).attr('data-filter-heading',  $(this).attr('data-filter-heading') == 'category-1' ? 'all': 'category-1');
  });

$('.gallery__button.gallery__button_sauna').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  // $(this).attr('data-filter-heading',  $(this).attr('data-filter-heading') == 'category-2' ? 'all': 'category-2');
  });

$('.gallery__button.gallery__button_hammams').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  // $(this).attr('data-filter-heading',  $(this).attr('data-filter-heading') == 'category-3' ? 'all': 'category-3');
  });

$('.gallery__button.gallery__button_swim').on('click', function(e){
  e.preventDefault()
  $(".gallery__button").removeClass("gallery__active");
  $(this).addClass('gallery__active')
  // $(this).attr('data-filter-heading',  $(this).attr('data-filter-heading') == 'category-4' ? 'all': 'category-4');
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
    $('.tags__value').each(function(key, value) {
      tags.push(`${key + 1} - ${$(value).text()}`);
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
  $(document).ready(function(){
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
  
  
    // //progress
    // const BYTES_IN_MB = 1048576;

    // const form = $('.order');
    // const fileInput = $('.attach__input');
    // const progressBar = $('.attach__content_progress');

    // fileInput.addEventListener('change', function () {
    //   const file = this.files[0]
    //   if (file.size > 5 * BYTES_IN_MB) {
    //     alert('Принимается файл до 5 МБ')
    //     this.value = null
    //   }
    // });

    // form.addEventListener('submit', function (event) {
    //   event.preventDefault()
    //   const fileToUpload = fileInput.files[0]
    //   const formSent = new FormData()
    //   const xhr = new XMLHttpRequest()
    
    //   if (fileInput.files.length > 0) {
    //     formSent.append('attach__input', fileToUpload)
    
    //     // собираем запрос и подписываемся на событие progress
    //     xhr.upload.addEventListener('progress', progressHandler, false)
    //     xhr.addEventListener('load', loadHandler, false)
    //     xhr.open('POST', 'upload_processing.php')
    //     xhr.send(formSent)
    //   } else {
    //     alert('Сначала выберите файл')
    //   }
    //   return false
    // });
    
    // function progressHandler(event) {
    //   // считаем размер загруженного и процент от полного размера
    //   const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1)
    //   const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1)
    //   const percentLoaded = Math.round((event.loaded / event.total) * 100)
    
    //   progressBar.value = percentLoaded
    //   sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`
    //   statusText.textContent = `Загружено ${percentLoaded}% | `
    // }
    
    // function loadHandler(event) {
    //   statusText.textContent = event.target.responseText
    //   progressBar.value = 0
    // }


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
  
      $.ajax({
        url: dropZone.attr('action'),
        type: dropZone.attr('method'),
        data: Data,
        contentType: false,
        processData: false,
        success: function(data) {
          alert ('Файлы были успешно загружены!');
        }
      });
    }
  })


  // $('.js-slider').slick({
  //   rows: 2,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   adaptiveHeight: true,
  //   arrows: true,
  //   dots: true,
  //   appendDots:$(".gallery__footer"),
  //   responsive: [
  //     {
  //         breakpoint: 700,
  //         settings: {
  //             rows: 2,
  //             slidesToShow: 2,
  //             slidesToScroll: 2
  //         }
  //     }
  // ]
  //   });
    
  jQuery(document).ready(function($) {
    $('.JSslider').slickFilterable({
        filterName: 'filter-heading',
        filter: function( category, slider, settings ) {
          return $(this).hasClass( category );
        },
        slick: {
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
          }
    });
  });
  
  (function( $ ) {
      $.fn.slickFilterable = function( options ) {
  
          /**
           * A plugin to create a slick we can filter.
           *
           * If you are not using Rows you can use slickFilter
           * (check documentation) otherwise we can provide a valid filter.
           *
           * options {
           *      slideSelector    string     jQuery selector to get slides. Imetiate children by default.
           *      filterName       string     We will search for data-{filterName} clickable elements.
           *      slick            object     The slick settings. Check Slick doc.
           *      beforeFilter     function   A fuction called before filter slider. Receives the trigger element
           *                                  as this and 3 params: category (string), slider and slides (jQuery objects).
           *      filter           mix        A valid parameter to jQuery filter() function. If it's a functio we will wrap
           *                                  it and it receives the trigger element as this and 3 params: category (string),
           *                                  slider (jQuery object) and a copy of settings (extended).
           * }
           */
          var settings = $.extend({
              slideSelector: '> *',
              filterName: 'filter-slick',
              slick: {},
              beforeFilter: function() {},
              filter: function( element, category, slider, settings ) { return true; },
          }, options );
  
          return this.each(function() {
              var slider = $(this),
                  slides = slider.find( settings.slideSelector ),
                  slickObj;
  
              /**
               * Create Slick
               *
               * TIP: you should you 'slidesPerRow' instead 'slidesToShow' in grid mode (with rows)
               * to avoid slick break layout when there are less slides than on "page".
               */
              slickObj = slider.slick( settings.slick );
  
              // Handle Filter Click
              $('[data-' + settings.filterName + ']').on('click', function(event) {
                  event.preventDefault();
  
                  var category = $(this).data(settings.filterName),
                      newSlides = $.extend(true, {}, slides),
                      newSlickOptions;
  
                  if ( ! category ) return;
  
                  // Before Filter Slides
                  if ( typeof settings.beforeFilter == 'function' ) {
                      settings.beforeFilter.call(this, category, slider, slides);
                  }
  
                  // Destroy and empty
                  slider.slick('unslick');
  
                  // Recreate All Slides
                  if ( category === 'all' ) {
                      slider.find( settings.slideSelector ).remove();
                      slider.append( newSlides );
                      slider.slick( settings.slick );
  
                      return;
                  }
  
                  /**
                   * Filter Slides
                   *
                   * If settings.filter is a function we pass the category, slider and a copy of settings
                   * expecting a true or false return to pass it to jQuery.filter();
                   *
                   * If not, we just pass it directly.
                   */
                  if ( typeof settings.filter !== 'function' ) {
                      newSlides = newSlides.filter( settings.filter );
                  } else {
                      newSlides = newSlides.filter( function() {
                          return settings.filter.call( this, category, slider, $.extend( true, {}, settings ) );
                      } );
                  }
  
                  slider.find( settings.slideSelector ).remove();
                  slider.append( newSlides );
                  slider.slick( settings.slick );
              });
          });
      };
  }(jQuery));
