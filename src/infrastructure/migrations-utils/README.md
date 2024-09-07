## how to execute command to create new migration
```bash
$ yarn run migrate:create -- migration_name
# ó
$  docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:create -- migration_name
```

## how to run all up migration
```bash
$ yarn run migrate:up
# ó
$ docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:up
```

## how to run all down migration
```bash
$ yarn run migrate:down
# ó
$ docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:down
```
## how to run an up migration
```bash
$ yarn run migrate:up:version name_version
# ó
$ docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:up:version name_version
```

## how to run a down migration
```bash
$ yarn run migrate:down:version name_version
# ó
$ docker-compose -f dev.docker-compose.yml exec backend yarn run migrate:down:version name_version eg: "1692041288559-createalexandrarole"
```