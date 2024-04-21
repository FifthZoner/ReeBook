# ReeBook API Call Reference

Books are split into book info and book instance.

Also dear frontend devs beware: passwordHash was changed to password in login and register!

### Authorization calls:

#### POST /api/login

- password: \<user password\>
- email: \<user email>

## ↓

- session cookie
- response

#### PUT /api/register

- password: \<user password\>
- email: \<user email>
- nickname: \<user nickname>

## ↓

- session cookie
- response

#### GET /api/logout

## ↓

- ends session
- response

### Book info calls:

#### PUT /api/bookInfo/addBare

User access level: at least 1 (book handler)

- name: \<book name\>
- author: \<book author>

## ↓

- response
- a book with minimal info is added

#### PUT /api/bookInfo/addFull

User access level: at least 1 (book handler)

- name: \<book name\>
- author: \<book author>
- isbn: \<book isbn or any other code>
- imageLink: \<book imageLink for the tile/details>
- description: \<book long description>
- releaseDate: \<book release date>
- releasePlace: \<book release place>
- distributor: \<book distributor name>

## ↓

- response
- a book with full info is added

#### GET /api/bookInfo/getBasics

## ↓

- response or list of books with basic information: name, author, imageLink, isbn, _id

#### POST /api/bookInfo/getDetailed

- _id - \<book _id from getBasics\>

## ↓

- response or all detailed informations: name, author,  isbn, imageLink, description, release date, release place, distributor

Things like amount of free books will be added later but should be kept in mind

### Test calls:

#### GET /api

## ↓

- json or something to show that api works