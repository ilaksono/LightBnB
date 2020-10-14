$(() => {

  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function addListing(listing) {
    $propertyListings.append(listing);
  }
  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, isReservation = false) {
    clearListings();
    for (const propertyId in properties) {
      const property = properties[propertyId];
      // console.log(propertyId);
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);

      $('section > article > button').click(function (event) {
        console.log('btn got clicked', event.target.id);
      });
    }
  }

  // const getResForm = (property) => {
  //   console.log('hi');
  //   $.get(`/api/reservation/${property.id}`)
  //   .then(res => {
  //     console.log(res, 'btn got clicked');
  //     view_manager.show('reservations');
  //   });
  // };



  // function postReservation(id) {
  //   $.ajax({method: 'GET', url:`/api/reservation/${id}`, data:''})
  // } 

  window.propertyListings.addProperties = addProperties;

});