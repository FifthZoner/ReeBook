# ReeBook API Call Reference

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

### Book calls:

TBA

### Test calls:

#### GET /api
Returns a json to show that api connection works.