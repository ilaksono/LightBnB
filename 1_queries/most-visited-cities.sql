SELECT city, COUNT(*) FROM properties
JOIN reservations ON (properties.id = property_id)
GROUP BY city
ORDER BY COUNT(*) DESC 
LIMIT 10; 