# TaskManager API

This is an Express application, it provides a REST-ful interface to the Tasks data, stored in MongoDB.

## Installation

This should be installed using lerna from the repository root

## Setup

Create a .env file, if running using the MongoDB launched using Docker then add the below

```
MONGO_URL=mongodb://127.0.0.1:27017
MONGO_USER=root
MONGO_PASSWORD=rootpassword
PORT=8000
```

Otherwise add equivalent entries pointing at the MongoDB being used

## Running

This should be run using lerna from the repository root.

### Challenge thoughts and notes

I used the documentation sites for multiple different packages to complete this task including

- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [Mocha](https://mochajs.org/)

Plus additional resources when encountering issues I did not know how to fix from memory

Additional functionality that could have been added

- Authentication/authorization
- Logging to an external provider
- In-memory DB for running unit tests
