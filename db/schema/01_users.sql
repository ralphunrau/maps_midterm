DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL, /* Storing as plain text password as this is proof of concept, user login security may be implimented at a later dat NCM*/
  profile_url VARCHAR(255) NOT NULL,
  user_active  BOOLEAN NOT NULL DEFAULT TRUE
);
