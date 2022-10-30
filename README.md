# Favourite teacher app

This api is used to add and remove teachers from a favourite teachers list by the students. Top 5 favourite teachers can be viewed. This api is based on Rest which allows a user to login as a student or a teacher. Postman can be used to test this api. json web token is used for authentication. Mongo db atlas is used to host the database. This api shows the most favourite teacher according to others favourite list.


## Install

    npm install

## Run the app

    npm run server

## Technologies used
- Node js
- Express js
- Mongoose
- Mongo db
- Json Web Token

# REST API

The REST API to the example app is described below.

## signup

### Request

`POST /auth/signup`

    http://localhost:5000/auth/signup

    {
        "name": "kumar",
        "email": "kumar@gmail.com",
        "password": "kumar",
        "role": "teacher"
    }


### Response

    {
        "result": {
            "_id": "635d80b9f15c4139d1014d8a",
            "name": "kumar",
            "email": "kumar@gmail.com",
            "role": "teacher"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bWFyQGdtYWlsLmNvbSIsImlkIjoiNjM1ZDgwYjlmMTVjNDEzOWQxMDE0ZDhhIiwiaWF0IjoxNjY3MDg5NzY1LCJleHAiOjE2NjcwOTMzNjV9.ykreZDGw8D5ypcD7qNeihnjtxhlJYwFa_nZ8QMCrXik"
    }

## login

### Request

`POST /auth/login`

    http://localhost:5000/auth/login

    {
        "email": "kumar@gmail.com",
        "password": "kumar"
    }

### Response

    {
        "result": {
            "_id": "635d80b9f15c4139d1014d8a",
            "name": "kumar",
            "email": "kumar@gmail.com",
            "role": "teacher"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bWFyQGdtYWlsLmNvbSIsImlkIjoiNjM1ZDgwYjlmMTVjNDEzOWQxMDE0ZDhhIiwiaWF0IjoxNjY3MDg5NzY1LCJleHAiOjE2NjcwOTMzNjV9.ykreZDGw8D5ypcD7qNeihnjtxhlJYwFa_nZ8QMCrXik"
    }

## add teacher to list

### Request

`POST /fav/add`

    http://localhost:5000/fav/add

    {
        "list": ["635d88f582cb436bb6ee4936", "635d80b9f15c4139d1014d8a", "635d88f582cb436bb6ee4936"]
    }

### Response

    {
        "curModUser": {
            "_id": "635d8034f15c4139d1014d87",
            "name": "manoj",
            "email": "manoj@gmail.com",
            "role": "student",
            "__v": 0,
            "favourites": {
                "_id": "635d889482cb436bb6ee4930",
                "teacherList": [
                    "635d890e82cb436bb6ee4939",
                    "635d80b9f15c4139d1014d8a",
                    "635d88f582cb436bb6ee4936"
                ],
                "__v": 0
            }
        }
    }

## remove teacher from list

### Request

`POST /fav/remove`

    http://localhost:5000/fav/remove

    {
        "teacherId": "635d88f582cb436bb6ee4936"
    }

### Response

    {
        "curModUser": {
            "_id": "635d8034f15c4139d1014d87",
            "name": "manoj",
            "email": "manoj@gmail.com",
            "role": "student",
            "__v": 0,
            "favourites": {
                "_id": "635d889482cb436bb6ee4930",
                "teacherList": [
                    "635d890e82cb436bb6ee4939",
                    "635d80b9f15c4139d1014d8a"
                ],
                "__v": 0
            }
        }
    }


## Get all teachers name

### Request

`GET /fav/teachers`

    http://localhost:5000/fav/teachers

### Response

    {
        "users": [
            {
                "_id": "635d80b9f15c4139d1014d8a",
                "name": "kumar",
                "email": "kumar@gmail.com",
                "role": "teacher",
                "__v": 0
            },
            {
                "_id": "635d88f582cb436bb6ee4936",
                "name": "me",
                "email": "me@gmail.com",
                "role": "teacher",
                "__v": 0
            },
            {
                "_id": "635d890e82cb436bb6ee4939",
                "name": "u",
                "email": "u@gmail.com",
                "role": "teacher",
                "__v": 0
            }
        ]
    }

## Get most favourite teacher

### Request

`GET /fav/most`

    http://localhost:5000/fav/most

### Response

    {
        "favTeachers": [
            {
                "_id": {
                    "_id": "635d890e82cb436bb6ee4939",
                    "name": "u",
                    "email": "u@gmail.com",
                    "role": "teacher"
                },
                "count": 3
            },
            {
                "_id": {
                    "_id": "635d88f582cb436bb6ee4936",
                    "name": "me",
                    "email": "me@gmail.com",
                    "role": "teacher"
                },
                "count": 2
            },
            {
                "_id": {
                    "_id": "635d80b9f15c4139d1014d8a",
                    "name": "kumar",
                    "email": "kumar@gmail.com",
                    "role": "teacher"
                },
                "count": 1
            }
        ]
    }

## search a name

### Request

`GET /fav?search=k`

    http://localhost:5000/fav?search=k

### Response

    {
        "users": [
            {
                "_id": "635d80b9f15c4139d1014d8a",
                "name": "kumar",
                "email": "kumar@gmail.com",
                "role": "teacher",
                "__v": 0
            }
        ]
    }
