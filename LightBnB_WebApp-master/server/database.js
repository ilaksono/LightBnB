const db = require('./db/index');
/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return db.query(`
  SELECT * FROM users WHERE email LIKE $1;
  `, [email]).then(res => {
    return res.rows[0];
  })
    .catch(err => null);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {

  return db.query(`
  SELECT * FROM users WHERE id=$1;
  `, [id]).then(res => { res.rows[0]; })
    .catch(err => null);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {

  return db.query(`
  INSERT INTO users (name, email, password) 
  VALUES($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => null);

};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return db.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = $1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `, [guest_id, limit])
    .then(res => res.rows)
    .catch(err => null);
};
exports.getAllReservations = getAllReservations;

const makeNewReservation = function(propId, guestId, startDate, endDate) {
  return db.query(`
  INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, [startDate,endDate, propId, guestId])
  .then(res => res.rows[0])
  .catch(err => null);
}
exports.makeNewReservation = makeNewReservation;
/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {


  const queryParams = [];
  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_id
`;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `${queryParams.length > 1 ? ' AND' : 'WHERE '}  users.id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night && (options.minimum_price_per_night < options.maximum_price_per_night)) {
    queryParams.push(Number(options.minimum_price_per_night));
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `${queryParams.length > 2 ? ' AND' : 'WHERE '} cost_per_night >=$${queryParams.length - 1} AND cost_per_night <=$${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `${queryParams.length > 1 ? ' AND' : 'WHERE '} avg(property_reviews.rating) = $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString +=
    `GROUP BY properties.id
  ORDER BY cost_per_night
    LIMIT $${queryParams.length};`;

  return db.query(queryString, queryParams).then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
  Number(property.cost_per_night) * 100, property.street, property.city, property.province, property.post_code, property.country,
  property.parking_spaces, Number(property.number_of_bathrooms), Number(property.number_of_bedrooms)];
  return db.query(`
  INSERT INTO properties (owner_id, title, description, 
    thumbnail_photo_url,cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, queryParams).then(res => res.rows[0]).catch(err => null);
};
exports.addProperty = addProperty;