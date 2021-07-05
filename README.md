<h1 align="center">Tickitz</h1>
<p align="center">
  <a href="https://tickitz-apps.netlify.app" target="_blank"><img src="https://i.ibb.co/tzSzq4x/Tickitz-2.png" alt="Tickitz-2" border="0" /></a>
</p>

### 🧐 Description

Tickitz is a web application built using Reactjs on the frontend side, and Nodejs and Expressjs on the backend side. This website is used to order movie tickets online, so that it is easy to use by mobile and desktop users.

### 💻 Features

- JWT authentication

- Multilevel authorization

- Nodemailer for email verification

- Upload image using multer

- Redis server

- CRUD for all tables required in the application


### ⛏️ Modules

1. [Expressjs]
2. [MySql2]
3. [Dotenv]
4. [CORS]
5. [BodyParser]
6. [bcrypt]
7. [jsonwebtoken] atau JWT
8. [lodash] contoh klik [disini]
9. [redis]
10. [multer]
11. [nodemailer]

### ⛏️ Dev Modules

1. [Nodemon]
2. [ESLint]

---
[expressjs]: https://www.npmjs.com/package/express
[mysql2]: https://www.npmjs.com/package/mysql2
[dotenv]: https://www.npmjs.com/package/dotenv
[cors]: https://www.npmjs.com/package/cors
[bodyparser]: https://www.npmjs.com/package/body-parser
[nodemon]: https://www.npmjs.com/package/nodemon
[eslint]: https://eslint.org/docs/user-guide/getting-started
[bcrypt]: https://www.npmjs.com/package/bcrypt
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[lodash]: https://www.npmjs.com/package/lodash
[disini]: https://lodash.com/docs/4.17.15
[redis]: https://www.npmjs.com/package/redis
[multer]: https://www.npmjs.com/package/multer
[nodemailer]: https://www.npmjs.com/package/nodemailer

## Installation

1. Clone the repository

```
git clone https://github.com/nevalenaginda/Backend-Tickitz-WebKu.git
cd Backend-Tickitz-WebKu
```

2. Install package

```
npm install
```

3. Create a new database with a name `tickitz_webku` and import `tickitz_webku.sql` from this repository

4. Create .env file

```
PORT   = 
JWTCode = 
DBHOST = 
DBUSER = 
DBPASS = 
DB     = 
EMAIL = 
URL_IMAGE =   (Ex http://localhost:5000/img)
URL_FRONTEND = 
URL_BACKEND = (Ex http://localhost:5000/v1)
PASSWORD = 
```

5. Run application

```
npm run dev
```

Or

```
npm start
```

### 💭 API Documentation 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/13256965/TzXukecS)


### ✍️ Link:
- :white_check_mark: [Frontend](https://github.com/nevalenaginda/Frontend-Tickitz-WebKu)
- :rocket: [Deploy](https://tickitz-apps.netlify.app)
