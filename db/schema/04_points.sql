DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  point_lat numeric NOT NULL,
  point_lng numeric NOT NULL,
  point_title VARCHAR(255) NOT NULL,
  point_description text,
  point_url VARCHAR(500) NOT NULL,
  point_created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  point_active  BOOLEAN NOT NULL DEFAULT TRUE
);
