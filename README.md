<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= devise_error_messages! %>

  <div class="field">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: true %>
  </div>

  <div class="field">
    <%= f.label :password %>
    <% if @minimum_password_length %>
      <em>(<%= @minimum_password_length %> characters minimum)</em>
    <% end %><br />
    <%= f.password_field :password, autocomplete: "off" %>
  </div>

  <div class="field">
    <%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "off" %>
  </div>

  <div class="field">
  <input type="hidden" id="payment_token" name="payment[token]" />
</div>

  <div id="card-element">
    <!-- A Stripe Element will be inserted here. -->
  </div>

  <div id="card-errors" role="alert"></div>

  <div class="actions">
    <%= f.submit "Sign up" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>

<script src="https://js.stripe.com/v3/"></script>
<script>
  var stripe = Stripe('pk_test_51Pd3v5JdM3ksUDnBJYgvHb1K01M8NgtmV4NOARowEzmGmFDjZdGyj5d7bbPNEzeGwbdvH2fJwZIxwU15gAPD2Ssy00rVbuYovS');
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
</script>
