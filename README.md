# Storefront Backend Project

## Getting Started

Follow the instructions to get the best of this project

## Required Technologies

you will need those technologies to run this project

- Postgres for the database
- Node >= 14
- bash

## starting

you will need to run one of those commands in the root directory

`yarn`
`npm i`

## 1. setup the project

### First setup postgresql

you will need to install postgresql on your local machine to create databases
you can install postgresql from here<https://www.postgresql.org/download/>

#### create databases
now that you have installed postgresql successfully you will need to create databases
first create store_front data base to be your main database 
**copy and paste that command in psql terminal**
```bash
CREATE DATABASE store_front
```
then create store_front_test database to be your test database
**copy and paste that command in psql terminal**
```bash
CREATE DATABASE store_front_test
```

#### setup environment variables
first create **.env** file in root directory to hold the required information's
in .env file create the necessary environment variables
example:

```bash
PORT=3000
HOST=localhost
# DATABASE ENV
NODE_ENV=dev
POSTGRES_PORT=5432
POSTGRES_HOST = localhost
POSTGRES_USER = postgres
POSTGRES_PASS = your postgres password
POSTGRES_DB = store_front
POSTGRES_DB_TEST = store_front_test

# Secrets
BCRYPT_PASSWORD = $fasfds!%5df4554&gfg*878sdf
SECRET_TOKEN = @545ssd!ds12^vfroandom-secret-token-43re4$454sdf54%54dfs

SALT_ROUNDS=12
```

after that you are ready to use the application

### 2. DB Creation and Migrations

you will only need to create 2 new databases in your local machine
you can name them like store_front, store_front_test
then you will need to run this command in root directory to migrate the tables
bash 
`db-migrate up`

### 3. starting with the server
run one of these this command
`yarn start`
or
`yarn dev`

### to lint the project and fix problems
run those commands
`yarn lint` to find the problems
`yarn lint --fix` to fix them if eslint can

### to format
run this command
`yarn format`

### to compile typescript
run this command
`yarn build`
or
`yarn watch`

### to start testing
run this command
`yarn test`

#### where the server run?
by default server will run on <http://localhost:3000>
but feel free to change these sittings from the env file

### where are the end points and schema?
- See [REQUIREMENTS.md](./REQUIREMENTS.md) file