module.exports = function(router, database) {

  router.get('/properties', (req, res) => {
    database.getAllProperties(req.query, 20)
    .then(properties => res.send({properties}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/reservations/:id', (req, res) => {
    if(req.session.userId) return res.send({propId: req.params.id});
    else res.error("💩");
  });

  router.post('/reservations', (req, res) => {
    console.log(req.body);
    console.log(req.body.start_date, req.body.end_date, req.body.property_id);
    database.makeNewReservation(Number(req.body.property_id), Number(req.session.userId), req.body.start_date, req.body.end_date);
    res.send('successfully made reservation');
  });

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}