# User Authentication

Simple user authentication application built with angular 9, spring boot (java 8) and mysql.\
MySQL db instance is being hosted on heroku to make it easier to run the project.\
Used OAuth2 for token management and in memory token store.\
 

## Installation

Running the project:\
Make sure to have JDK 1.8 and node.js installed.\
Also, make sure to have maven CLI working. You can check [this guide](https://www.baeldung.com/install-maven-on-windows-linux-mac) for a quick setup.\
On project root directory, run:
```
$ mvn clean install
```
This will both build the backend and frontend.

### Running the api
On the api root directory (user-authentication-api folder), run the command
```
$ mvn spring-boot:run
```
This will start the embedded tomcat on port 8080

### Running the client
On user-authentication-web/src/main/web folder, run the command
```
$ ng serve
```
This will start the client at port 4200

And that's it! Now you can check the application running locally at http://localhost:4200

#### Further improvements
Dockerizing the solution would make it easier to run, but, for OS restrictions (using windows 10 home currently) and the time at hand, it will be on my backlog.\
Using swagger to document the api would be an improvement, too.
