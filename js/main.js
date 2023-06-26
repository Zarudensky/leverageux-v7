$(document).ready(function(){
	$(window).scroll(function(){
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var footerCalendarTop = $('#calendar_fr_1');
		if (footerCalendarTop.length) {
			footerCalendarTop.offset().top;
		}
		var footerLogo = $('.footer__logo');
		if (footerLogo.length) {
			footerLogo.offset().top + $('.footer__logo').height();
		}
		// fixed/no fixed heder
		if($('#btn_mn').length) {
			var headerBtnTop = $('#btn_mn').offset().top;
			var headerBtnHeight = $('#btn_mn').outerHeight();
			if (wt >= headerBtnTop + headerBtnHeight) {
				$('.header').addClass('scrolled');
				if (wt + wh >= footerCalendarTop) {
					$('.header').removeClass('scrolled');
				} else {
					$('.header').addClass('scrolled');
				}
			} else {
				$('.header').removeClass('scrolled');
			}
		} else { 
			if (wt >= 15.5) {
				$('.header').addClass('scrolled');
				if (wt + wh >= footerCalendarTop) {
					$('.header').removeClass('scrolled');
				} else {
					$('.header').addClass('scrolled');
				}
			} else {
				$('.header').removeClass('scrolled');
			}	
		}

		// animated heder when scrolled top
		if(!wt){
	        $('.header').addClass('animated');
		}else{
			$('.header').removeClass('animated');
	    }
		// $('.header__logo').addClass('animated');
		// $('.header__logo').removeClass('animated');

		// animated footer
	    if(wt + wh >= footerLogo){
	        $('.footer__block_logo').addClass('animated');
		}else{
			$('.footer__block_logo').removeClass('animated');
	    }
	});

	// scroll up
	$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollup').fadeIn();
		} 
		else {
		$('.scrollup').fadeOut();
		}
	});
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	// mobile menu
	$('#btn_om').click(function() {
		$('.header__block_menu').addClass('active');
		$('.menu__back').addClass('active');
		$('.btn__back').addClass('active');
		$('.header__block_menu').removeClass('closed');
	});
	$('.menu__btn_back, .header__block_menu, .menu__back').click(function() {
		if ($(window).width() < 1220) {
			$('.header__block_menu').removeClass('active');
			$('.menu__back').removeClass('active');
			$('.btn__back').removeClass('active');
			$('.header__block_menu').addClass('closed');
			setTimeout("$('.header__block_menu').removeClass('closed')", 400);
		}
	});

	// send form footer and validation
	function validation() {
    let valid = true;
    
    let nameField = $('.validation__footer-name');
    let emailField = $('.validation__footer-email');
    
    // Validate the name
    if(!$(nameField).val()) {
        $(nameField).addClass('invalid');
        $('.validation__text-name').addClass('active');
        valid = false;
    } else {
        $(nameField).removeClass('invalid');
        $('.validation__text-name').removeClass('active');
    }
    
    // Validate the email
    if(!validEmail($(emailField).val())) {
        $(emailField).addClass('invalid');
        $('.validation__text-email').addClass('active');
        valid = false;
    } else {
        $(emailField).removeClass('invalid');
        $('.validation__text-email').removeClass('active');
    }
    
    return valid;
	}
	function validEmail(email) {
		var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regexEmail.test(email);
	}
	function validText() {
		$('.validation__footer-form').each(function() {
			if(!$(this).val().length >= 1){
				$('.validation__text-footer').addClass('active');
			} else {
				$('.validation__text-footer').removeClass('active');
			}
		});
	}
	$('.validation__footer-form').focus(function() {
		$(this).removeClass('invalid');
	});
	$('.validation__textarea').keyup(function() {
		validText();
	});
	$('#formBtnFooter').click(function() {
		if (validation()) {
			sendForm()
		}
	});
	$('#nameFooter').focus(function() {
    $('.validation__text-name').removeClass('active');
    $(this).removeClass('invalid');
	});
	$('#emailFooter').focus(function() {
    $('.validation__text-email').removeClass('active');
    $(this).removeClass('invalid');
	});

	function sendForm() {
		var firstname = $('#nameFooter').val();
		var email = $('#emailFooter').val();
		var descr = $('#descrFooter').val();

		var feedbackModal = $('#feedbackModal');
		var feedbackMessageSend = $('.feedback__message-send');
		var feedbackMessageNotSend = $('.feedback__message-notsend');

		var leadStatus = 'Interest';
		var contactType = 'Prospect';
		var source = 'Website';
		var leadGeneration = 'Inbound';

		var xhr = new XMLHttpRequest();
		var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6484354/ba6957be-53f3-4cc6-877f-d0dc0d677081'
		// Example request JSON:
		var data = {
			"fields": [
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
			$('#nameFooter').val('');
			$('#emailFooter').val('');
			$('.validation__text').removeClass('active');

			if(xhr.readyState == 4 && xhr.status == 200) { 
				$(feedbackMessageNotSend).hide();
				$(feedbackMessageSend).show();
				$(feedbackModal).show();
				dataLayer.push({
					'eventCategory': 'form',
					'eventAction': 'sent',
					'eventLabel': 'footer', 
					'event': 'autoEvent',
				});				
			} else if (xhr.readyState == 4 && xhr.status == 400){
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);
				var error = JSON.parse(xhr.responseText);
				var errorText = error.errors[0].errorType;
				var eventActionText = 'error - ' + errorText;
				dataLayer.push({
					'eventCategory': 'form',
					'eventAction': eventActionText,
					'eventLabel': 'footer', 
					'event': 'autoEvent',
				});				
			} else if (xhr.readyState == 4 && xhr.status == 403){ 
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);
				var error = JSON.parse(xhr.responseText);
				var errorText = error.errors[0].errorType;
				var eventActionText = 'error - ' + errorText;
				dataLayer.push({
					'eventCategory': 'form',
					'eventAction': eventActionText,
					'eventLabel': 'footer', 
					'event': 'autoEvent',
				});
			} else if (xhr.readyState == 4 && xhr.status == 404){ 
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);
				var error = JSON.parse(xhr.responseText);
				var errorText = error.errors[0].errorType;
				var eventActionText = 'error - ' + errorText;
				dataLayer.push({
					'eventCategory': 'form',
					'eventAction': eventActionText,
					'eventLabel': 'footer', 
					'event': 'autoEvent',
				});
			}

			function hideModalAndMessages(){
				$(feedbackModal).hide();
				$(feedbackMessageNotSend).hide();
				$(feedbackMessageSend).hide();
			}
			setTimeout(hideModalAndMessages, 3000);
		} 
		// Sends the request	    
		xhr.send(final_data)	
	}

	$('.close').click(function() {
		$('#feedbackModal').hide();
		$('.feedback__message-send').hide();
		$('.feedback__message-notsend').hide();
	});
});
	
// copied to clipboard email
document.querySelector('#emailCopy').addEventListener('click', () => {
	navigator.clipboard.writeText('hello@leverageux.com')
	.then(() => {
		let message = document.getElementById('tooltipCopied');
		message.style.display = "flex";
		setTimeout(() => message.style.display = "none", 2000);
	})
	.catch(err => {
			console.log('Failed to copy email to clipboard', err);
	});
});

// scrolled to form
document.querySelectorAll('.scroll__to__form').forEach(function(button) {
	button.addEventListener('click', function() {
			const content = document.querySelector('.footer__block_contacts');
			const contentPosition = content.getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo({ top: contentPosition - 100 });
	});
});
