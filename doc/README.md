# REST API
## User API
### User sign-up
- description: create a new user
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) username of user
      - password: (string) password of user
- response: 200
    - content-type: `application/json`
    - body: (str) response on whether user was created.
``` 
curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:9080/api/signup/
``` 

### User sign-in
- description: sign in a user into the application
- request: `POST /api/signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) username of user
      - password: (string) password of user
- response: 200
    - content-type: `application/json`
    - body: (str) response on whether user sign-in was successful.
``` 
curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:9080/api/signin/
``` 

### User sign-out
- description: sign out a user into the application
- request: `POST /api/signout/`
    - content-type: `application/json`
    - body: object
      - username: (string) username of user
      - password: (string) password of user
- response: 200
    - content-type: `application/json`
    - body: (str) response on whether user sign-out was successful.
``` 
curl -b cookie.txt -c cookie.txt localhost:9080/api/signout/
``` 

### Get User data
- description: get user data from database
- request: `GET /api/userData`   
- response: 200
    - content-type: `application/json`
    - body: object
      - email: (string) email of the user
      - username: (string) username of user
      - password: (string) password of user

``` 
curl -H "Content-Type: application/json" -X GET -d '{"email":"bobjones@gmail.com","username":"bobjones"}' -c cookie.txt localhost:9080/api/userData/
``` 

## Stream API
### Get user stream info
- description: get stream info of user
- request: `GET /api/streams/:username`   
- response: 200
    - content-type: `application/json`
    - body: object
      - streamUser: username of the user
      - streamKey: id of the user used as a stream key
 
``` 
curl -b cookie.txt http://localhost:9080/api/streams/bobjones
``` 

### Get user stream info
- description: get all running streams
- request: `GET /api/streams`   
- response: 200
    - content-type: `application/json`
    - body: object
      - streamUser: username of the user
      - streamKey: id of the user used as a stream key
      - viewers: number of viewers of the stream
 
``` 
curl -b cookie.txt http://localhost:9080/api/streams
``` 