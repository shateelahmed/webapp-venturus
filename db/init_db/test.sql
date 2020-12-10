CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  token varchar(500) NOT NULL,
  UNIQUE (email),
  UNIQUE (token)
);

INSERT INTO users (
  name,
  email,
  password,
  token
) VALUES (
  'shateel',
  'shateel@mail.com',
  '$2b$10$ifKF.LMZLQLP1Bhw8d7QpuuvHSPNLXL6TKT3LOH4btIbeK.RdfIHu',
  'c1b930b2dd2b2e3fb356ec41945d112591f6bb0f89becd672c4bc8ed73f3e3fbe2bec9475cca9e7e7715368c2da918f03ef57bd04f3ae2d923e16148b6f38423'
);

CREATE TABLE murmurs (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  description varchar(255),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE TABLE followers (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  follower_id int NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE TABLE likes (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NULL,
  murmur_id int NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
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
