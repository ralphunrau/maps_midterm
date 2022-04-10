DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description text,
  point_url VARCHAR(500) NOT NULL,
  created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  active  BOOLEAN NOT NULL DEFAULT TRUE
);
