$(document).ready(function(){
	// packs mobile menu 
	$('.pm__concept').click(function() {
		$('.concept, .pm__concept, .btn__buy_concept').addClass('active');
		$('.mvp, .pm__mvp, .btn__buy_mvp').removeClass('active');
		$('.business, .pm__business, .btn__buy_business').removeClass('active');
		$('.detailing').addClass('dt__concept');
		$('.detailing').removeClass('dt__mvp');
		$('.detailing').removeClass('dt__business');
	});
	$('.pm__mvp').click(function() {
		$('.concept, .pm__concept, .btn__buy_concept').removeClass('active');
		$('.mvp, .pm__mvp, .btn__buy_mvp').addClass('active');
		$('.business, .pm__business, .btn__buy_business').removeClass('active');
		$('.detailing').removeClass('dt__concept');
		$('.detailing').addClass('dt__mvp');
		$('.detailing').removeClass('dt__business');
	});
	$('.pm__business').click(function() {
		$('.concept, .pm__concept, .btn__buy_concept').removeClass('active');
		$('.mvp, .pm__mvp, .btn__buy_mvp').removeClass('active');
		$('.business, .pm__business, .btn__buy_business').addClass('active');
		$('.detailing').removeClass('dt__concept');
		$('.detailing').removeClass('dt__mvp');
		$('.detailing').addClass('dt__business');
	});

	// radio btn click 
	$('.label1').click(function() {
		$('.section__packs').addClass('desktop__price');
		$('.section__packs').removeClass('mobile__price');
	});
	$('.label2').click(function() {
		$('.section__packs').addClass('mobile__price');
		$('.section__packs').removeClass('desktop__price');
	});

	// modal form buy
	var modalBuy = $('#buyModal');
	var btnBuy = $('.btn__buy');
	var formBuyTitle = $('#formBuyTitle');
	var inputPlan = $('#plan');
	$(modalBuy).hide();
	$(btnBuy).click(function() {
	  	$(modalBuy).show();
	});
	$('.close, .modal__back').click(function() {
	  	$(modalBuy).hide();
	  	$('#nameBuy').val("");
	  	$('#emailBuy').val("");
			$('#descrBuy').val("");
			$('.form__block').removeClass('disable');
			$('.send__message').removeClass('active');
			$('.notsend__message').removeClass('active');
	});

	$('.btn__buy_concept').click(function() {
		if ($('.packs').hasClass('desktop__price')) {
			var formPlan = 'Desktop Concept';
		}
		if ($('.packs').hasClass('mobile__price')) {
			var formPlan = 'Mobile Concept';
		}
		$(formBuyTitle).text(formPlan);
	  	$(inputPlan).val(formPlan);
	});
	$('.btn__buy_mvp').click(function() {
		if ($('.packs').hasClass('desktop__price')) {
			var formPlan = 'Desktop MVP';
		}
		if ($('.packs').hasClass('mobile__price')) {
			var formPlan = 'Mobile MVP';
		}
		$(formBuyTitle).text(formPlan);
	  	$(inputPlan).val(formPlan);
	});
	$('.btn__buy_business').click(function() {
		if ($('.packs').hasClass('desktop__price')) {
			var formPlan = 'Desktop Business';
		}
		if ($('.packs').hasClass('mobile__price')) {
			var formPlan = 'Mobile Business';
		}
		$(formBuyTitle).text(formPlan);
	  	$(inputPlan).val(formPlan);
	});

	// send form design and validation
	function validationPlan() {
		let valid = true;
		$('.validation__plan-form').each(function() {
		  if(!$(this).val().length >= 1){
				$(this).addClass('invalid');
				validTextPlan();
				valid = false;
				var eventLabelPlan = $('#plan').val();
				var errorInputPlan = $(this).attr('name');
				var eventActionPlan = 'validation error - ' + errorInputPlan;
				dataLayer.push({
					'eventCategory': 'buy now',
					'eventAction': eventActionPlan,
					'eventLabel': eventLabelPlan, 
					'event': 'autoEvent',
				});
			}
		});
		if( !validEmailPlan($('.validation__plan-email').val())) {
			$('.validation__plan-email').addClass('invalid');
			$('.validation__text-plan').addClass('active');
			valid = false;
		}
		return valid;
	}
	function validEmailPlan(email) {
	  var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regexEmail.test(email);
	}
	function validTextPlan() {
		$('.validation__plan-form').each(function() {
		  if(!$(this).val().length >= 1){
				$('.validation__text-plan').addClass('active');
		  } else {
				$('.validation__text-plan').removeClass('active');
			}
		});
	}
	$('.validation__plan-form').focus(function() {
		$(this).removeClass('invalid');
	});
	$('.validation__plan-form').focusout(function(){
		if(!$(this).val().length >= 1){
			$(this).addClass('invalid');
		}
	});
	$('.validation__textarea').keyup(function() {
		validTextPlan();
	});
	$('#formBtnBuy').click(function() {
		if (validationPlan()) {
	        sendFormPlan()
	    }
	});
	function sendFormPlan() {
		var plan = $('#plan').val();
		var firstname = $('#nameBuy').val();
		var email = $('#emailBuy').val();
		var descr = $('#descrBuy').val();

		var leadStatus = 'Interest';
		var contactType = 'Prospect';
		var source = 'Website';
		var leadGeneration = 'Inbound';
		
		var xhr = new XMLHttpRequest();
    	var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6484354/4d3b0fbb-9e23-4a61-abab-95e1acb128e7'
    	// Example request JSON:
	    var data = {
	      "fields": [
	      	{
	          "name": "design_pack",
	          "value": plan
	        },
	        {
	          "name": "firstname",
	          "value": firstname
	        },
	        {
	          "name": "email",
	          "value": email
	        },
	        {
	          "name": "description",
	          "value": descr
	        },
	        {
	          "name": "hs_lead_status",
	          "value": leadStatus
	        },
	        {
	          "name": "contact_type",
	          "value": contactType
	        },
	        {
	          "name": "source",
	          "value": source
	        },
	        {
	          "name": "lead_generation",
	          "value": leadGeneration
	        }
	      ]
	    }
	    var final_data = JSON.stringify(data)
	    xhr.open('POST', url);
	    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.onreadystatechange = function() {
				if ($('.packs').hasClass('desktop__price')) {
					var devicePlanBuy = 'Desktop Business';
				}
				if ($('.packs').hasClass('mobile__price')) {
					var devicePlanBuy = 'Mobile Business';
				}
				if(xhr.readyState == 4 && xhr.status == 200) { 
					$('.form__block').addClass('disable');
					$('.send__message').addClass('active');
					dataLayer.push({
						'eventCategory': 'buy now',
						'eventAction': 'sent',
						'eventLabel': devicePlanBuy,
						'event': 'autoEvent',
					});
				} else if (xhr.readyState == 4 && xhr.status == 400){
					$('.form__block').addClass('disable');
					$('.notsend__message').addClass('active');
					console.log(xhr.responseText);
					var error = JSON.parse(xhr.responseText);
					var errorText = error.errors[0].errorType;
					var eventActionText = 'error - ' + errorText;
					dataLayer.push({
						'eventCategory': 'buy now',
						'eventAction': eventActionText,
						'eventLabel': devicePlanBuy, 
						'event': 'autoEvent',
					});
				} else if (xhr.readyState == 4 && xhr.status == 403){ 
					$('.form__block').addClass('disable');
					$('.notsend__message').addClass('active');
					console.log(xhr.responseText);
					var error = JSON.parse(xhr.responseText);
					var errorText = error.errors[0].errorType;
					var eventActionText = 'error - ' + errorText;
					dataLayer.push({
						'eventCategory': 'buy now',
						'eventAction': eventActionText,
						'eventLabel': devicePlanBuy, 
						'event': 'autoEvent',
					});      
				} else if (xhr.readyState == 4 && xhr.status == 404){ 
					$('.form__block').addClass('disable');
					$('.notsend__message').addClass('active');
					console.log(xhr.responseText);
					var error = JSON.parse(xhr.responseText);
					var errorText = error.errors[0].errorType;
					var eventActionText = 'error - ' + errorText;
					dataLayer.push({
						'eventCategory': 'buy now',
						'eventAction': eventActionText,
						'eventLabel': devicePlanBuy, 
						'event': 'autoEvent',
					});
				}
				}
	    // Sends the request	    
	    xhr.send(final_data)
	}
});