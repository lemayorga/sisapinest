<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,nestjs,postgres,docker,prisma,ts" />
  </a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


Project made with [Nest](https://github.com/nestjs/nest) framework TypeScript and use
   
This project is a starter kit which implement the following :
  
- [JWT](https://jwt.io/)
- [Prisma](https://www.prisma.io/)
- [Postgresql](https://www.postgresql.org/)

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Initialization & Installation

1. Clone project
2. Run command
```bash
$ npm install
```
3. Clone the .env.template file and rename it to .env 
4. Change environment variables
5. Raise the database
6. Execute project

```bash
$ npm run start
```

7. Execute SEED
```
http://localhost:3000/api/seed
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


# test coverage
$ npm run test:cov
```

## Execute Migrations

```bash
$ npx prisma generate  #Firts step in developer
$ npx prisma migrate dev --name "{name_new_migration}"
```

<!-- https://github.com/notiz-dev/nestjs-prisma-starter -->