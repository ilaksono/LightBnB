INSERT INTO users(id, name, email, password) 
VALUES(1, 'Name1', 'test@test.ca','$2a$10$FB'),
(2, 'Name2', 'test2@test.ca','BOAVhpuLvpOREQVmvmezD4ED'),
(3, 'Name3', 'test3@test.ca','.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(id, owner_id, title, descript, thumbnail_url, cover_url, cost_night, parking, num_bathrooms, num_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1, 'title1', 'description', 'djaslaksjd', 'akjsdh',' 200','2', '2', '3', 'Canada', 'Main St.', 'Toronto', 'ON', 'M5S3I0', TRUE),
(2, 2, 'title2', 'description', 'djaslaksjd', 'akjsdh',' 200','2', '2', '3', 'Canada', 'Main St.', 'Toronto', 'ON', 'M5S3L0', FALSE),
(3, 3, 'title3', 'description', 'qwije', 'lkasj',' 100','2', '1', '7', 'Canada', 'Some St.', 'Richmond', 'BC', 'S5S3L2', FALSE);


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (id,guest_id,property_id,reservation_id,rating,msg)
VALUES (1, 1, 1, 10, 5, 'message'),
(2, 2, 2, 12, 5, 'message'),
(3, 3, 3, 13, 5, 'message');