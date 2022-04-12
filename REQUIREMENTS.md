# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### basic url <http://localhost/api/>

## method rules

index <get>
create<post>
getOne<get>
update<put>
delete<delete>
authenticate<post>

#### Users

use [basic url](#basic-url) followed by </users> to access the **index** and **create** routes

- Index [token required]
  if there is users
  the data will be like that

```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "0a03e980-30f1-4c1b-9921-29d40562b6be",
      "user_name": "test",
      "first_name": "test",
      "last_name": "test",
      "email": "test@gmial.com",
      "gender": "male/female"
    }
  ]
}
```

- Create N[token required]
  the same endpoint as index route put uses the post method
  data required

```json
{
  "user_name": "test",
  "first_name": "test",
  "last_name": "test",
  "email": "test@gmial.com",
  "password": "password",
  "gender": "male/female"
}
```

data

```json
{
  {
  "status": 200,
  "message": "success",
  "data": {
    "id": "c5a14372-9eb8-4611-ae24-b860a4e305eb",
    "user_name": "test",
    "first_name": "test",
    "last_name": "test",
    "email": "test@gmial.com",
    "gender": "male/female",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYzVhMTQzNzItOWViOC00NjExLWFlMjQtYjg2MGE0ZTMwNWViIiwidXNlcl9uYW1lIjoiYWhtZWQxNzEiLCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJlbHNoaWtoIiwiZW1haWwiOiJhaG1lZDFAZ21pYWwuY29tIiwiZ2VuZGVyIjoibWFsZSJ9LCJpYXQiOjE2NDk3Nzc4MTF9.0G-h1EkI8bCakpH9cyOyyAHpWEJ0UvhOmMxpgGo1EAU"
  }
}
}
```

- getOne [token required]
  end point use [basic url](#basic-url) followed by </users/yourId>
  data

```json
{
  {
  "status": 200,
  "message": "success",
  "data": {
    "id": "c5a14372-9eb8-4611-ae24-b860a4e305eb",
    "user_name": "test",
    "first_name": "test",
    "last_name": "test",
    "email": "test@gmial.com",
    "gender": "male/female",
  }
}
}
```

- update [token required]
  end point use [basic url](#basic-url) followed by </users/yourId>
  data required

```json
{
  "user_name": "test",
  "first_name": "test",
  "last_name": "test",
  "email": "test@gmial.com",
  "password": "password",
  "gender": "male/female"
}
```

data

```json
{
  {
  "status": 200,
  "message": "success",
  "data": {
    "id": "c5a14372-9eb8-4611-ae24-b860a4e305eb",
    "user_name": "test",
    "first_name": "test",
    "last_name": "test",
    "email": "test@gmial.com",
    "gender": "male/female",
  }
}
}
```

- delete [token required]
  end point use [basic url](#basic-url) followed by </users/yourId>
  data

```json
{
  "deleted": {
    "status": 200,
    "message": "User deleted successfully"
  }
}
```

- authenticate [token required]
  end point use [basic url](#basic-url) followed by </users/auth>

data required

```json
{
  "email": "value",
  "password": "value"
}
```

data

```json
{
  "status": 200,
  "message": "logged in successfully",
  "data": {
    "id": "c3f1d28d-fcbe-47cc-8401-685c2f900691",
    "user_name": "test",
    "first_name": "test",
    "last_name": "test",
    "email": "test@gmial.com",
    "gender": "male/female",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYzNmMWQyOGQtZmNiZS00N2NjLTg0MDEtNjg1YzJmOTAwNjkxIiwidXNlcl9uYW1lIjoiYWhtZWQxNzEiLCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJlbHNoaWtoIiwiZW1haWwiOiJhaG1lZDFAZ21pYWwuY29tIiwiZ2VuZGVyIjoibWFsZSJ9LCJpYXQiOjE2NDk3NzgyODB9.0d3U-3LSQV3VOLbp_WNvOsGwQVFmbTWQ6UGVnZVrvxU"
  }
}
```

#### Products

- Create [token required]
  data required
  name,
  price,
  you can put **<category>** if you want
  data

  ```json
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "619f15c7-ec37-4f33-a29b-0bdc226af7df",
      "name": "test",
      "price": "2000.00",
      "category": "test"
    },
  ]
  ```

- Index [token required]
  end point use [basic url](#basic-url) followed by </products>
  if there is a products
  data
  ```json
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "619f15c7-ec37-4f33-a29b-0bdc226af7df",
      "name": "test",
      "price": "2000.00",
      "category": "test"
    },
  ]
  ```
- getOne [token required]
  end point use [basic url](#basic-url) followed by </products/productId>
  data

  ```json
  {
    "status": 200,
    "message": "success",
    "data": {
      "id": "619f15c7-ec37-4f33-a29b-0bdc226af7df",
      "name": "nova 5t",
      "price": "2000.00",
      "category": "mobiles"
    }
  }
  ```

- update [token required]
  end point use [basic url](#basic-url) followed by </products/productId>
  data required
  name,
  price,
  you can put **<category>** if you want
  data

  ```json
    "status": 200,
    "message": "success",
    "data": [
      {
        "id": "619f15c7-ec37-4f33-a29b-0bdc226af7df",
        "name": "test",
        "price": "2000.00",
        "category": "test"
      },
    ]
  ```

- delete [token required]
  end point use [basic url](#basic-url) followed by </products/productId>
  data
  ```json
  {
    "deleted": {
      "status": 200,
      "message": "Product deleted successfully"
    }
  }
  ```

#### Orders

-index
end point use [basic url](#basic-url) followed by </orders>
data

```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "9a0a93bd-bdf2-4641-9b41-3ea7171c86f3",
      "status": "active",
      "created_at": "2022-04-12T12:45:04.778Z",
      "updated_at": "2022-04-12T12:45:04.778Z",
      "user_id": "0a03e980-30f1-4c1b-9921-29d40562b6be"
    }
  ]
}
```

- create
  end point use [basic url](#basic-url) followed by </orders>
  data required
  user_id,
  status

- getOne
  end point use [basic url](#basic-url) followed by </orders/orderId>
  data

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "id": "9a0a93bd-bdf2-4641-9b41-3ea7171c86f3",
    "status": "active",
    "created_at": "2022-04-12T12:45:04.778Z",
    "updated_at": "2022-04-12T12:45:04.778Z",
    "user_id": "0a03e980-30f1-4c1b-9921-29d40562b6be"
  }
}
```

- update
  end point use [basic url](#basic-url) followed by </orders/orderId>
  data required
  user_id,
  status

- Current Order by user (args: user id)[token required]
  end point use [basic url](#basic-url) followed by </orders/users/userId>
  data

```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "9a0a93bd-bdf2-4641-9b41-3ea7171c86f3",
      "status": "active",
      "user_id": "0a03e980-30f1-4c1b-9921-29d40562b6be",
      "user_name": "ahmed17",
      "products": {}
    }
  ]
}
```

order_products

- index
  end point use [basic url](#basic-url) followed by </order_products>
  data

```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "id": "ea1b88ca-c734-4ca5-af71-28b44697f3d0",
      "order_id": "9a0a93bd-bdf2-4641-9b41-3ea7171c86f3",
      "use_id": "0a03e980-30f1-4c1b-9921-29d40562b6be",
      "user": "ahmed17",
      "product": {
        "id": "619f15c7-ec37-4f33-a29b-0bdc226af7df",
        "name": "nova 5t",
        "price": 2000,
        "category": "mobiles",
        "quantity": 6
      }
    }
  ]
}
```

- create
  data required
  order_id,
  product_id,
  quantity

- get one
  end point use [basic url](#basic-url) followed by </order_products/order_id/products/product_id>

- update
  end point use [basic url](#basic-url) followed by </order_products/order_id>
  data required
  order_id,
  product_id,
  quantity

- delete
  end point use [basic url](#basic-url) followed by </order_products/order_id>

data

```json
{
  "status": 200,
  "message": "order product deleted successfully"
}
```

## Data Shapes

#### Product

```sql
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  price NUMERIC(7,2) NOT NULL,
  category VARCHAR(70),
  PRIMARY KEY(id)
```

#### User

```sql
  id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender GENDER_TYPE NOT NULL,
  PRIMARY KEY(id)
```

#### Orders

```sql
    id uuid DEFAULT uuid_generate_v4(),
    status STATUS_TYPE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id uuid NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

### order_products

```sql
  id uuid DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity INTEGER NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
```