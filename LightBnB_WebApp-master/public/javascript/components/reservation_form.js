$(() => {

  const $reservationForm = $(`
  <form id="reservation" class="reservation-form">
  <p>Start Date</p>
  <div class="login-form__field-wrapper">
    <input type="date" name="start-date" placeholder="2021/01/01">
  </div>

  <div class="login-form__field-wrapper">
      <input type="date" name="end_date" placeholder="2021/01/02">
    </div>

  <div class="login-form__field-wrapper">
      <button>Make Reservation</button>
      <a id="reservation__cancel" href="#">Cancel</a>
  </div>
</form>
  `)
  window.$reservationForm = $reservationForm;

  // $reservationForm.on('submit', function (event) {
  //   event.preventDefault();

  //   const data = $(this).serialize();
  //   $.ajax({
  //     method: 'POST',
  //     url: `/api/reservations/${data}`,
  //     data
  //   }).then(json => {
  //     views_manager.show('listings');
  //   })
  // })

  $('body').on('click', '#sign-up-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
});