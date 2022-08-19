CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  role VARCHAR(256),
  email VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(256) NOT NULL
);

CREATE TABLE room(
  room_id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  clients_id INTEGER[],
  title VARCHAR(64),
  FOREIGN KEY (owner_id) REFERENCES client(id)
);

CREATE TABLE tgroup(
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES client(id),
  title VARCHAR(64)
);

CREATE TABLE tgroup_clients_id (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES client(id),
    tgroup_id INTEGER NOT NULL REFERENCES tgroup(id),
    UNIQUE (client_id, tgroup_id)
);


