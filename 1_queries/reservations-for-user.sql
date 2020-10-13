SELECT properties.id, title, cost_per_night, start_date, AVG(rating) FROM reservations 
JOIN users ON (guest_id = users.id)
JOIN property_reviews ON (reservation_id = reservations.id)
JOIN properties ON (properties.id = reservations.property_id)
WHERE users.id = 1 
AND end_date < now()::date 
GROUP BY properties.id, title, cost_per_night, start_date
ORDER BY start_date;