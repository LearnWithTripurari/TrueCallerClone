## TrueCallerClone REST_API

TechStack & Tools - Node.js, Express.js, Mysql, Postman, MySQLWorkBench

---
#### 1. Register the User

POST - http://localhost:3000/api/user/register

BODY - `{
"name" : "Jhon",
"email": "jhon@gmail.com",
"password": "123456",
"phoneNumbers": ["891211111", "8301111111"]
}`

---

#### 2. Mark Number As Spam

POST - http://localhost:3000/api/user/:userId/markNumberAsSpam

BODY - {`
"phoneNumber" : "8953111111"
}`

----

#### 3. Search

GET - http://localhost:3000/api/user/search/byName?name=Jhon

GET - http://localhost:3000/api/user/search/byPhoneNumber?phoneNumber=8051211161

GET - http://localhost:3000/api/user/search/:userId


