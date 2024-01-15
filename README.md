## TrueCallerClone REST_API

TechStack & Tools - Node.js, Express.js, Mysql, Postman, MySQLWorkBench

---
#### 1. Register the User

POST - http://localhost:3000/api/user/register

BODY - `{
"name" : "Chitra",
"email": "chitra@gmail.com",
"password": "123456",
"phoneNumbers": ["8953224560", "8317020580"]
}`

---

#### 2. Mark Number As Spam

POST - http://localhost:3000/api/user/:userId/markNumberAsSpam

BODY - {`
"phoneNumber" : "8953224562"
}`

----

#### 3. Search

GET - http://localhost:3000/api/user/search/byName?name=Jhon

GET - http://localhost:3000/api/user/search/byPhoneNumber?phoneNumber=8050284560

GET - http://localhost:3000/api/user/search/:userId


