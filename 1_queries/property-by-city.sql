SELECT properties.id, title, cost_per_night, AVG(rating)  FROM properties
JOIN property_reviews ON (properties.id=property_id) 
WHERE city LIKE '%ancouve%'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;

SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;


SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE $1 AND cost_per_night >=$2 AND cost_per_night <=$3 GROUP BY properties.id
ORDER BY cost_per_night
LIMIT 10;
