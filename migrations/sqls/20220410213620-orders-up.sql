CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE STATUS_TYPE AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4(),
    status STATUS_TYPE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id uuid NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);