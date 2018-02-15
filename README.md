# Application

## Version
* 0.0.1

## Tech
#### Backend
* [node.js](https://nodejs.org/) - evented I/O for the backend.
* [Express](http://expressjs.com/) - fast node.js network app framework.
* [mongoose](http://mongoosejs.com/) - elegant mongodb object modeling for node.js.
* [bluebird](http://bluebirdjs.com/docs/getting-started.html) - promises.
* [Mocha](https://mochajs.org/) - test framework.
* [eslint-airbnb](https://github.com/airbnb/javascript) - JavaScript style guide.
* [Should.js](https://shouldjs.github.io/) - assertion library.
* [Swagger](https://swagger.io/) - swagger api documentation.

* API Documentation is in /api-docs.

#### Frontend
* [ReactJS](https://reactjs.org/) - reactJs.
* [Redux](https://redux.js.org/) - predictable state container for JavaScript apps.

#### DB
* [MongoDB](https://www.mongodb.com/) - db for the app.

#### Orchestration
* [docker](https://www.docker.com/) - Docker containers.
* [docker-compose](https://docs.docker.com/compose/) - multi-container docker application. 

## Installation
1. Install docker [Ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
2. Install docker-compose [Ubuntu](https://docs.docker.com/compose/install/#install-compose)
3. Execute docker-compose build
4. Execute docker-compose up
5. Enjoy! (Server will be at localhost:3000 - Client will be at localhost:3001)

* Post-intallation steps for [Ubuntu](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
* If you based on this docker-compose, you won't need to install MongoDb.

## Pending Items (also cover frontend)
* Unit test.
* Integration test.
* User edit profile.
* Courses are mocked data. A CRUD will be nice for it (this will also needed in the Backend.
* Slides are mocked data.
