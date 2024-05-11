# ReeBook API Call Reference

Books are split into book info and book instance.

Also, dear frontend devs beware: passwordHash was changed to password in login and register!

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

#### GET /api/checkSession

## ↓

- 200 if valid
- 401 if invalid

### Book info calls:

#### PUT /api/bookInfo/addBare

User access level: 1 (only admins can use this option, as it allows for incomplete books)

- name: \<book name\>
- author: \<book author\>

## ↓

- response
- a book with minimal info is added

#### PUT /api/bookInfo/addFull

Any user can add a book, tag0 will have the most weight in the algorithm.

- name: \<book name\>
- author: \<book author>
- isbn: \<book isbn or any other code>
- imageLink: \<book imageLink for the tile/details>
- description: \<book long description>
- releaseDate: \<book release date>
- releasePlace: \<book release place>
- distributor: \<book distributor name>
- tag0: \<book tag 0>
- tag1: \<book tag 1>
- tag2: \<book tag 2>

## ↓

- response
- a book with full info is added

#### GET /api/bookInfo/getBasics

## ↓

- error response or list of books with basic information: name, author, image link, isbn, _id, tags

#### POST /api/bookInfo/getDetailed

- _id - \<book _id from getBasics\>

## ↓

- response or all of the information about a book.

Things like amount of free books will be added later but should be kept in mind

#### PATCH /api/bookInfo/edit

Only a user with access level 1 or owner of such book can edit the info.

- name: \<book name\>
- author: \<book author>
- isbn: \<book isbn or any other code>
- imageLink: \<book imageLink for the tile/details>
- description: \<book long description>
- releaseDate: \<book release date>
- releasePlace: \<book release place>
- distributor: \<book distributor name>
- tag0: \<book tag 0>
- tag1: \<book tag 1>
- tag2: \<book tag 2>

## ↓

- response
- the book info is edited if call is correct

#### DELETE /api/bookInfo/delete

User must be an admin and there must be no instances of that book.

- bookID: \<ID of the book info\>

## ↓

- response and book info is deleted or not

### Book instance calls:

#### GET /api/bookInstance/getAll

- must have a session

## ↓

- response with amount of books, amount of instances, amount lent in total and list of unique books with their basic info


#### PUT /api/bookInstance/add

- bookID: \<ID of the book info\>

## ↓

- response and book instance is added for the user or not if id/session is invalid

#### DELETE /api/bookInstance/delete

- instanceID: \<ID of the book instance\>

## ↓

- response and book instance is deleted or not if id/session is invalid/someone else has it

### Book request calls:

#### PUT /api/bookRequest/add

- String instanceID: \<ID of the book info\>
- Number days: \<amount of days to lend a book for\>

## ↓

- response and book request is added or not if there were issues

#### POST /api/bookRequest/accept

- String requestID: \<id of the request\>
- must be the owner of requested book

## ↓

- response and book request accepted

#### POST /api/bookRequest/decline

- String requestID: \<id of the request\>
- must be the owner of requested book

## ↓

- response and book request dropped

#### POST /api/bookRequest/confirmReceived

- String requestID: \<id of the request\>
- must be the creator of request, to be used when requester gets the book

## ↓

- response and book request proceeds

#### POST /api/bookRequest/confirmGiven

- String requestID: \<id of the request\>
- must be the owner of the book, confirming that you gave the book to the other person

## ↓

- response and book request ends, instance changes owner

### Test calls:

#### GET /api

## ↓

- json or something to show that api works