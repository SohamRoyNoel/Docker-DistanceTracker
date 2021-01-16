# MongoDB setup on docker

## To run a server
- Install node on server folder: ```npm install```

## To setup docker
- Prerequisite: ```Docker Desktop```
- redirect to server folder: ```cd Server```
- run ```docker-compose up -d``` to run the server on docker
- visit mongodb GUI Compass & connect to local hosted mongo server
- Create a database called ```db``` by GUI or follow the steps below to run it on CLI

Action Name             | Action
----------------------- | ---------------------------------------
Access mongodb on CLI   | docker exec -it db mongo
Check connection        | show dbs
Create a DB             | use codecloudes (If not already exists)

- Run seeder (creates 2 dummy user) ```node seeder -i```

# Run server
- cd Server
- npm run dev