// Limit the input to 1 digit from 1-9
$('.number').keypress(function(event) {
  if ($(this).val().length >= 1) event.preventDefault();
  else if (event.keyCode < 49 || event.keyCode > 57) event.preventDefault();
});
