DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_title VARCHAR(255) NOT NULL,
  map_lat numeric NOT NULL,
  map_lng numeric NOT NULL,
  map_zoom smallint NOT NULL DEFAULT 13,
  map_created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  map_active  BOOLEAN NOT NULL DEFAULT TRUE,
  map_pic_url VARCHAR(500) DEFAULT 'https://www.rei.com/dam/270_a_2014_topo_map_lg.jpg',
  map_description VARCHAR(500) NOT NULL
);
