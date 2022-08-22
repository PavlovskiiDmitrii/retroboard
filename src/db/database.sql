CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  role VARCHAR(256),
  email VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(256) NOT NULL
);

CREATE TABLE room(
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  title VARCHAR(64),
  FOREIGN KEY (owner_id) REFERENCES client(id)
);

CREATE TABLE room_clients_id (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES client(id),
    room_id INTEGER NOT NULL REFERENCES room(id),
    UNIQUE (client_id, room_id)
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


