# Markdown Editor Demo

This is a Markdown editor simple app! You will be able to create, delete and edit Markdown files, which will be stored on a database.

## Before we begin

Some aditional software must be installed in order to run this service:
- podman / docker
- node
- java 8 (or later)

## Running our services

### MongoDB

In order to instanciate the Database, you will need to run the following commands:
``` bash
    podman pull mongo
    podman run --name markdown-db -p 27017:27017 mongo
```

### Backend API

For the API to run, you need to use maven to compile the application, then it's as easy as running your .jar:

``` bash
    cd md-backend
    mvn clean install
    java -jar java -jar target/md-backend-0.0.1-SNAPSHOT.jar
```

### Front End

Finally, the steps to run the front are:

``` bash
    cd markdown-editor
    npm install
    yarn start
```