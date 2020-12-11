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

/* ALTER USER 'docker'@'localhost' IDENTIFIED WITH mysql_native_password BY 'docker' */
