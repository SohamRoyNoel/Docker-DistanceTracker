# Distance Tracker 
- Well this is a continuation of [this](https://github.com/SohamRoyNoel/DistanceTracker) project. 
- This is completely dockerized.

## Structure:
- DB(mongo) is hosted on docker. Redirect to server folder for more info
- Server and client will be started using ```npm run dev```
- Instruction is included inside each folder.
- Postman collection can be imported for service testing.

- Distance calculation formula is taken from : 
[Formula Source](https://www.movable-type.co.uk/scripts/latlong.html)

# Use Docker
## Server Images
- Create docker build: ```docker build -t server .```
- run docker-compose: ```docker-compose up -d```
- enter inside the docker: 
    check id | docker ps
    -------- | ---------
    enter the container | docker exec -it fabef52fc3d1 bash
    Import data | node seeder -i
- remove an image: ```docker rm server_services_1```
## Client Images
- build client image: ```docker build -t client .```
- run react app on docker: ```docker run -p 3000:3000 client```