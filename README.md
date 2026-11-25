# express api

A simple REST API in Node.js

API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/employees    |Get all employees           |
| GET         | api/employees/id |Get a specific employee         |
| POST        | api/employees    |Create a new employee         |
| PUT        | api/employees/id    |Update an existing employee|
| DELETE        | api/employees/id    |Delete an existing employee|
| GET         | api/users        |Get all users (add `?minId=&maxId=` query params to get users with IDs within a given range)|
| GET         | api/users/jobs   |Get all jobs presented in the database|
| GET         | api/users/username/:username |Get a user with appropriate username|
| GET         | api/users/:id    |Get a user with appropriate _id|

Every response contains the `X-Request-Arrival-Time` header with the time the request arrived to the REST service (added by the `requestTime` middleware).

## Quick Start

Clone the repo.

```bash
https://github.com/zagaris/express-api.git
cd express-api
```
Create the .env.dev file.

```bash
DB_URL = localhost/my-employees
PORT = 5000
```
Create the .env.prod file.

```bash
DB_URL = myhost.me/my-employees
PORT = 8080
```

Install the dependencies.

```bash
npm install
```
To start the express server in dev mode, run the following.

```bash
npm run dev
```

To start the express server in prod mode, run the following.

```bash
npm run prod
```

For more details check [Build a Restful CRUD API with Node.js](https://dev.to/zagaris/build-a-restful-crud-api-with-node-js-2334).


