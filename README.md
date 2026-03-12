
# Course Management API

Course Management API built with Node.js and Express.
It allows users to manage courses with authentication and authorization.


## Features

CRUD operations for courses

Authentication using JWT

Authorization for protected routes

## Tech Stack

Node.js

Express.js

Mongodb

JWT


## API Reference

#### Get all courses

```http
  GET /api/courses
```

#### Get course

```http
  GET /api/courses/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of course to fetch |

#### Edit course

```http
  PATCH /api/courses/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of course to edit |

#### Create course

```http
  POST /api/courses
```
#### Delete course

```http
  DELETE /api/courses/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of course to delete |

#### Get users

```http
  GET /api/users
```

#### Register user

```http
  POST /api/users/register
```
#### Login user

```http
  POST /api/users/login
  ```
## Run Locally

Clone the project

```bash
  git clone https://github.com/zenah-metwally/course-management-api
```

Go to the project directory

```bash
  cd course-management-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```
