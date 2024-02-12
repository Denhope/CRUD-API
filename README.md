# CRUD API

## Purpose

The purpose of this project is to implement a simple CRUD (Create, Read, Update, Delete) API using an in-memory database.

## Description

Your task is to implement a simple CRUD API using an in-memory database.

## Technical Requirements

The task can be implemented in JavaScript or TypeScript.
Only the following tools and libraries are allowed:

- nodemon
- dotenv
- cross-env
- typescript
- ts-node
- ts-node-dev
- eslint and its plugins
- webpack-cli
- webpack and its plugins
- prettier
- uuid
- @types/\*
- libraries used for testing

Use version 20 LTS of Node.js.
Prefer asynchronous API whenever possible.

## Implementation Details

### Endpoints

Implemented endpoint `api/users`:

- `GET api/users` is used to get all people. The server should respond with status code 200 and records of all users.
- `GET api/users/{userId}` is used to get a specific user record by ID. The server should respond with status code 200 and record id === userId if it exists. The server should respond with status code 400 and an appropriate message if userId is incorrect (not uuid). The server should respond with status code 404 and an appropriate message if the entry id === userId does not exist.
- `POST api/users` is used to create a new user record and store it in the database. The server should respond with status code 201 and the newly created entry. The server must respond with status code 400 and an appropriate message if the request body does not contain required fields.
- `PUT api/users/{userId}` is used to update an existing user. The server should respond with status code 200 and an updated entry. The server should respond with status code 400 and an appropriate message if userId is incorrect (not uuid). The server should respond with status code 404 and an appropriate message if the entry id === userId does not exist.
- `DELETE api/users/{userId}` is used to remove an existing user from the database. The server should respond with status code 204 if the entry is found and deleted. The server should respond with status code 400 and an appropriate message if userId is incorrect (not uuid). The server should respond with status code 404 and an appropriate message if the entry id === userId does not exist.

### Users

Users are saved as objects having the following properties:

- `id`: unique identifier (string, uuid), generated on the server side
- `username`: username string (required)
- `age`: user age number (required)
- `hobbies`: user's hobby (array or string, empty array, required)

### Error Handling

Requests to non-existent endpoints (for example, some-non/existing/resource) should be processed (the server should respond with status code 404 and an appropriate human-readable message).
Server-side errors that occur during request processing must be handled correctly (the server must respond with status code 500 and an appropriate human-readable message).

### Application Launch Modes

The application is launched in development mode using `nodemon` or `ts-node-dev` (there is npm script `start:dev`).
The application runs in production mode (there is npm script `start:prod` that starts the build process and then runs the associated file).

### Clustering

For an application to scale out horizontally, there should be npm script `start:multi` that runs multiple instances of your application using Node.js's `cluster` API, equal to the number of available concurrencies - 1 on the host machine, each listening on port `PORT+n`. A load balancer should distribute requests between them (using the Round-robin algorithm).

### Testing

At least 3 scenarios should be implemented:

1. Get all records on `GET api/users` request (expect empty array).
2. A new object is created upon `POST api/users` request (a response containing the newly created record is expected).
3. Using a query, `GET api/users/{userId}` we try to get a created record using it id (a created record is expected).
4. We try to update the created record with a request `PUT api/users/{userId}` (a response is expected containing an updated object with the same id).
5. Upon `DELETE api/users/{userId}` request, we delete the created object id (waiting for confirmation of successful deletion).
6. With the request `GET api/users/{userId}` we are trying to get a remote object id (the expected response is that there is no such object).

### Environment Variables

The value port on which the application is running must be stored in .env file.

## Running the Application

To run the application, follow these steps:

1. Install the required dependencies by running `npm install`.
2. Create a `.env` file in the root directory of the project and set the `PORT` variable to the desired port number.
3. Run the application in development mode with `npm run start:dev`.
4. Run the application in production mode with `npm run start:prod`.
5. Run multiple instances of the application with clustering using `npm run start:multi`.

## Testing the Application

To test the application, run the test script with `npm test`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, concise messages.
4. Push your changes to your forked repository.
5. Open a pull request, detailing the changes you have made and why they should be merged.

## License

This project is licensed under the [MIT License](LICENSE).
