## For developers
### Installation

For setting up the postgres you have installed postgres and then use run the docker compose file for postgres

```
docker-compose -f postgres-compose.yml up -d
```

All microservice basic dependencies are listed in the package.json file, hence there is no need to install any global packages. Simply run npm install.

```
npm install
```

**NOTE:** if you required additional packages, ensure you install using --save-exact so that your project is compatible when other developers contribute.

Example:

```
npm install axios --save --save-exact
```

### Start development server
```
npm start
```

### Run tests

Test cases be written and then added to the ./test/index.ts file for compilation.
You are also able to add tests to the

### Deployment

#### Prerequites
Before deploying, the following prerequisites need to met:

* [Docker](https://docs.docker.com/install/) needs to be installed on the host server.
* [bridge network](https://docs.docker.com/engine/reference/commandline/network_create/) needs to be created using docker on the host server to link microservices.
* [git](https://gist.github.com/derhuerst/1b15ff4652a867391f03) needs to be installed on the host server.
* [ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) key link to project so that git pull is possible using ssh.
* [npm token](https://docs.npmjs.com/files/npmrc) (optional) so that you can install @sosafe packages if there is such a dependency.

#### Installation
1. clone solution
    To install the solution, first clone the repo to the host server
    ```
    git clone https://github.com/democy/deck-microservice.git
    ```
    In some cases, you may need to activate your ssh-agent to link your local private key to the command in the following manner:
    ```
    eval $(ssh-agent -s) && $(ssh-add /path/to/your/.ssh/id_rsa; git pull https://github.com/democy/deck-microservice.git)
    ```

2. build docker container
    move to cloned folder.
    ```
    cd deck-api
    ```
    sudo docker build -t ms:deck-api .
    ```
3. run the container
    run the container using the `--network` flag, linking the container to the `bridge network` you created on server.
    ```
    sudo docker run --network 'mynetwork' -p <hostport>:<containerport> -d --name deck-api --restart always ms:deck-api
    ```
4. test server
    open http://localhost:port/api/v1/deck-api/ in your browser.

### Technical users

The microservice has the following standard urls:

* http://localhost:port/api/v1/deck-api/                           - Base url for testing
* http://localhost:port/api/v1/deck-api/tests                      - Test status of solution
* http://localhost:port/api/v1/deck-api/blueprint                  - APi Blueprint documentation


to get the blueprint run command npm run document:blueprint 

### Scripts

kindly create a .env file having the following variables change it according to your database access also kindly update API_KEY Accordingly
```
PG_HOST=localhost
PG_DATABASE=sosafe
PG_USER=turing-dev
PG_PASSWORD=turing-dev
PG_PORT=5432
PORT=3006
```

to get the postman collections kindly import it from the following link thanks
https://www.getpostman.com/collections/604663ccb4f2fc93025e

import it and change your port accordingly

In case of any issue kindly write me an email to : m.kashi.khan93@gmail.com Thank you
