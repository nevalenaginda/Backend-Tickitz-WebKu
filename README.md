# Intermediate Backend Week 6

### Informasi

File ini merupakan kelanjutan dari pembuatan REST API Tiket Film [sebelumnya]. Pada project ini selain sistem CRUD telah ditambahkan sistem authorisasi, authentifikasi, tokenisasi, dan aktivasi user. Berikut adalah module yang digunakan pada project ini:

### Modules

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

### Dev Modules

1. [Nodemon]
2. [ESLint]

---

[sebelumnya]: https://github.com/nevalenaginda/Backend-Tickitz-WebKu/tree/master
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

### Tatacara

1. Silahkan download file ini.
2. Silahkan buka file ini dalam satu folder di text editor seperti VS Code atau sejenisnya
3. Pastikan import database yang ada didalam folder `database file` sebagai database di MySql
4. Patikan isi `PORT` yang akan kamu gunakan di file `.env` sesuaikan juga dengan yang ada di `app.listen` pada file `app.js`
5. Silahkan ganti nama database, user dan password pada file `.env` sesuai dengan MySql kalian. Umumnya seperti berikut:

```
DBHOST= localhost
DBUSER= root
DBPASS=
DB    = nama_databasenya
```

Untuk pengguna OS windows biasanya bagian passowrd di xampp itu kosong

### Penggunaan

Silahkan buka terminal pada VS Code dengan menekan tombol

```
CTRL + SHIFT + `
atau
CTRL + SHIFT + C
```

Kemudian ketikan text berikut

```
"npm run start" //untuk menjalankan nodemon cek di file package.json
```

Sebelum menjalankan project ini pastikan telah mengaktifkan module Apacahe dan MySql di XAMPP

### REST API SERVER

Kita dapat menggunakan REST API yang dibuat dengan mengunjungi link berikut.

```
http://100.25.29.134:5000/v1/
```

Tersedia 7 endpoint yaitu:

1. '/user'
2. '/ticket',
3. '/transaction'
4. '/movie'
5. '/schedule'
6. '/cinema'
7. '/seat'
