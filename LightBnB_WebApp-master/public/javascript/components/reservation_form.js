$(() => {
  const $reservationForm = $(`
  <form id="reservation" class="reservation-form">
  <p>Property Id</p>
  <div class="login-form__field-wrapper">
    <span id='prop_id'></span>
  </div>
  <p>Start Date</p>
  <div class="login-form__field-wrapper">
    <input type="date" name="start_date">
  </div>

  <div class="login-form__field-wrapper">
      <input type="date" name="end_date">
    </div>

  <div class="login-form__field-wrapper">
      <button type='submit'>Make Reservation</button>
      <a id="reservation__cancel" href="#">Cancel</a>
  </div>
</form>
  `);
  window.$reservationForm = $reservationForm;

  $reservationForm.on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize() + '&property_id=' + $('#prop_id').text();
    console.log(window.location.search);
    console.log(data, typeof data);
    $.ajax({
      method: 'POST',
      url: `/api/reservations`,
      data
    })
    .then(json => {
      views_manager.show('listings');
    })
  });

  $('body').on('click', '#reservation__cancel', function () {
    views_manager.show('listings');
    return false;
  });
});