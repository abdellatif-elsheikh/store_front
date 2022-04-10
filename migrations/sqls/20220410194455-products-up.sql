CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  price NUMERIC(7,2) NOT NULL,
  category VARCHAR(70)
);