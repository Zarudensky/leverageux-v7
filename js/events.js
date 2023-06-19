$(document).ready(function(){
  $('#btn_ep').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'header', 
      'event': 'autoEvent',
    });
  });
  $('#calendar_fr_1').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'footer - Roman Leshchyk',
      'event': 'autoEvent',
    });
  });
  $('#calendar_fr_2').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'footer - Anton Korolyk',
      'event': 'autoEvent',
    });
  });
  $('#btn_mn').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'main page',   'event': 'autoEvent',
    });
  });
  $('#link_calend_broker').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'BrokerEngine',
      'event': 'autoEvent',
    });
  });
  $('#link_calend_insight').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'InsightRX',
      'event': 'autoEvent',
    });
  });
  $('#link_calend_breeze').click(function() {
    dataLayer.push({
      'eventCategory': 'calendar',
      'eventAction': 'click',
      'eventLabel': 'RankBreeze',
      'event': 'autoEvent',
    });
  });
  // $('#clutch').click(function() {
  //   console.log('test');
  //   dataLayer.push({
  //     'eventCategory': 'opinions',
  //     'eventAction': 'click',
  //     'eventLabel': 'clutch.io', 
  //     'event': 'autoEvent',
  //   });
  // });
  $('#view_link_broker').click(function() {
    dataLayer.push({
      'eventCategory': 'portfolio',
      'eventAction': 'click',
      'eventLabel': 'BrokerEngine',
      'event': 'autoEvent',
    });
  });
  $('#view_link_insight').click(function() {
    dataLayer.push({
      'eventCategory': 'portfolio',
      'eventAction': 'click',
      'eventLabel': 'InsightRX',
      'event': 'autoEvent',
    });
  });
  $('#view_link_breeze').click(function() {
    dataLayer.push({
      'eventCategory': 'portfolio',
      'eventAction': 'click',
      'eventLabel': 'RankBreeze',
      'event': 'autoEvent',
    });
  });
  $('#buy_btn_concept').click(function() {
    if ($('.plans').hasClass('desktop__price')) {
			var devicePlan = 'Desktop Concept';
		}
		if ($('.plans').hasClass('mobile__price')) {
			var devicePlan = 'Mobile Concept';
		}
    dataLayer.push({
      'eventCategory': 'buy now',
      'eventAction': 'click',
      'eventLabel': devicePlan,
      'event': 'autoEvent',
    });    
  });
  $('#buy_btn_mvp').click(function() {
    if ($('.plans').hasClass('desktop__price')) {
			var devicePlan = 'Desktop MVP';
		}
		if ($('.plans').hasClass('mobile__price')) {
			var devicePlan = 'Mobile MVP';
		}
    dataLayer.push({
      'eventCategory': 'buy now',
      'eventAction': 'click',
      'eventLabel': devicePlan,
      'event': 'autoEvent',
    });
  });
  $('#buy_btn_business').click(function() {
    if ($('.plans').hasClass('desktop__price')) {
			var devicePlan = 'Desktop Business';
		}
		if ($('.plans').hasClass('mobile__price')) {
			var devicePlan = 'Mobile Business';
		}
    dataLayer.push({
      'eventCategory': 'buy now',
      'eventAction': 'click',
      'eventLabel': devicePlan,
      'event': 'autoEvent',
    });
  });
  $('.scrollup').click(function() {
    dataLayer.push({
      'eventCategory': 'button',
      'eventAction': 'click', 
      'eventLabel': 'go to top', 
      'event': 'autoEvent',
    });    
  });
});
    


