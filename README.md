## Description

Schedule App Api

## Installation
Prerequisites: Please use Node V.18 or higher

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Theh go to http://localhost:3000/api to test the API endpoints

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

This app was made with [Nest](https://github.com/nestjs/nest)
Using Prima ORM and SQLite DB as demo

This Demo includes sqlite DB with dummy data, you can [use another DB provider](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) changing the datasoruce in prisma/schema.prisma file

