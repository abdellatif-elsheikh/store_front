CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE GENDER_TYPE AS ENUM ('male', 'female');
CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender GENDER_TYPE NOT NULL,
  PRIMARY KEY(id)
);