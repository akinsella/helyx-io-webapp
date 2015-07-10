
--
-- Table structure for table accessTokens
--

DROP TABLE IF EXISTS helyx.access_tokens;

CREATE TABLE helyx.access_tokens (
  id SERIAL,
  token varchar(255) DEFAULT NULL,
  user_id varchar(255) DEFAULT NULL,
  client_id varchar(255) DEFAULT NULL,
  scope varchar(255) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


--
-- Table structure for table clients
--

DROP TABLE IF EXISTS helyx.clients;

CREATE TABLE helyx.clients (
  id SERIAL,
  name varchar(255) DEFAULT NULL,
  client_id varchar(255) DEFAULT NULL,
  client_secret varchar(255) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


--
-- Table structure for table pem_clients
--

DROP TABLE IF EXISTS helyx.pem_clients;

CREATE TABLE helyx.pem_clients (
  id SERIAL,
  user_id integer DEFAULT NULL,
  private_key varchar(2048) DEFAULT NULL,
  public_key varchar(2048) DEFAULT NULL,
  certificate varchar(2048) DEFAULT NULL,
  fingerprint varchar(128) DEFAULT NULL,
  key_password varchar(128) DEFAULT NULL,
  cert_password varchar(128) DEFAULT NULL,
  days integer DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

--
-- Table structure for table users
--

DROP TABLE IF EXISTS helyx.users;
CREATE TABLE helyx.users (
  id SERIAL,
  firstname varchar(255) DEFAULT NULL,
  lastname varchar(255) DEFAULT NULL,
  gender varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  google_id varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  role varchar(255) DEFAULT NULL,
  avatar_url varchar(255) DEFAULT NULL,
  token varchar(128) DEFAULT NULL,
  reset_token varchar(128) DEFAULT NULL,
  reset_demand_expiration_date timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (email)
);

DROP TABLE IF EXISTS helyx.sessions;
CREATE TABLE helyx.sessions (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE helyx.sessions ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
