## Description

Appeiron Node Challenger | Project and Task Manager

## Project setup. Using the dev.docker-compose.yml file to build and deploy the project

### Build image
```bash
$ docker-compose -f dev.docker-compose.yml build
```

### Get Up Image
```bash
$ docker-compose -f dev.docker-compose.yml up
```

### Aplly Migrations nescesary to use user admin (isaac.mendoza.ccs@gmail.com, pass: 1@Abcdefgh)
```bash
$ docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:up
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```