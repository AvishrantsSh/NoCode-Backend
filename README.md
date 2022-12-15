# Encore - A JSON Schema based API Builder

A prototype implmenetation of JSON schema based No-Code REST API builder.

![image](https://img.shields.io/github/license/AvishrantsSh/NoCode-Backend.svg?style=for-the-badge)

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- (Optional) Install MongoDB Community Edition ([Instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server
- Create a `.env` file in the root directory and add the following environment variables:

  ```{.sourceCode .bash}
  PORT=3000
  MONGO_URI=<--Mongo URL-->
  JWT_SECRET=<--Your Secret-->
  ```

# Code Overview

## Dependencies

- [ajv](https://github.com/ajv-validator/ajv) - For JSON Schema Validation
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - For API Documentation

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `controllers/` - This folder contains the controllers for our API. Controllers are further referenced in the routes.
- `middlewares/` - This folder contains custom middlewares for authentication and field validations.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `routes/` - This folder contains the route definitions for our API.

## Authentication

Requests are authenticated using the `Authorization` header. We define two express middlewares in `middlewares/` that can be used to authenticate the requests. The `passport_middleware` middleware configures the `express-jwt` middleware using our application's secret and returns a 401 status code if the request cannot be authenticated. This method of authentication is useful for frontend integrations. The `api_middleware` middleware utilizes `access key`, unique to a project, to authorize requests.

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
