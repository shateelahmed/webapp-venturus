CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  email varchar(255),
  password varchar(255)
);

INSERT INTO users (name, email) VALUES ('shateel', 'shateel@mail.com');

CREATE TABLE murmurs (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  description varchar(255)
);

CREATE TABLE followers (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  follower_id int NOT NULL
);

CREATE TABLE likes (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  murmur_id int NOT NULL
);

-- CREATE TABLE test (
--   id int NOT NULL AUTO_INCREMENT primary key,
--   name varchar(30),
--   description varchar(255)
-- );

-- INSERT INTO test (id, name, description) VALUES (1, 'test1', 'This is test data 1');
-- INSERT INTO test (id, name, description) VALUES (2, 'test2', 'This is test data 2');
-- INSERT INTO test (id, name, description) VALUES (3, 'test3', 'This is test data 3');
-- INSERT INTO test (id, name, description) VALUES (4, 'test4', 'This is test data 4');
-- INSERT INTO test (id, name, description) VALUES (5, 'test5', 'This is test data 5');
-- INSERT INTO test (id, name, description) VALUES (6, 'test6', 'This is test data 6');
-- INSERT INTO test (id, name, description) VALUES (7, 'test7', 'This is test data 7');
-- INSERT INTO test (id, name, description) VALUES (8, 'test8', 'This is test data 8');
-- INSERT INTO test (id, name, description) VALUES (9, 'test9', 'This is test data 9');
-- INSERT INTO test (id, name, description) VALUES (10, 'test10', 'This is test data 10');

-- INSERT INTO murmurs (user_id, description) VALUES ((SELECT id FROM users WHERE name = 'shateel' LIMIT 1), 'Murmur 1');
-- INSERT INTO murmurs (user_id, description) VALUES ((SELECT id FROM users WHERE name = 'shateel' LIMIT 1), 'Murmur 2');
-- INSERT INTO murmurs (user_id, description) VALUES ((SELECT id FROM users WHERE name = 'shateel' LIMIT 1), 'Murmur 3');

/* ALTER USER 'docker'@'localhost' IDENTIFIED WITH mysql_native_password BY 'docker' */
