// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "popper"
import "bootstrap"

document.addEventListener('turbo:load', () => {
var stripePublishableKey = document.getElementById('stripe-key').getAttribute('data-stripe-key');
  var stripe = Stripe(stripePublishableKey);
var elements = stripe.elements();

var card = elements.create('card');
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      var hiddenInput = document.getElementById('payment_token');
      hiddenInput.value = result.token.id;
      form.submit();
    }
  });
});
});