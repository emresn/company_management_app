### company_management_app
A simple company management system which keeps Customer, Product, Order and Payments data.

- **Backend :** Django
- **Frontend**: React.js

##### Modules

- :heavy_check_mark: Authentication
- :heavy_check_mark: Product
- &#9744; Home
- &#9744; Orders
- &#9744; Payments

## Backend Setup
### Database Settings
Create an .env file and add these parameters for your Postgresql DB. 
```markdown
DB_NAME="..."
DB_USER="..."
DB_PASSWORD="..."
DB_HOST="..."
DB_PORT="5432"
```
and add also
```
DEBUG=True
SECRET_KEY="your secret key"
```

### Run Api Server
1. `sudo service postgresql restart`
2. `source ../venv/bin/activate`
3. `python3 manage.py runserver`

----------
## Frontend Setup

### Install Dependencies
`yarn install`

### Run Server
`yarn start`


----------


### Django Commands
**Start Database serice**
`sudo service postgresql restart`

**Create Virtual Enviroment**
`virtualenv venv`

**activate venv**
`source ../venv/bin/activate`

**start project**
`django-admin startproject product`

**migrate tables**
`python3 manage.py migrate`

**Run Server**
`python3 manage.py runserver`

**create super user**
`python3 manage.py createsuperuser`

**create a new application**
`python3 manage.py startapp appname`

**make migrations**
`python3 manage.py makemigrations`

**run shell**
`python3 manage.py shell`

**generate dependencies**
`pip freeze > requirements.txt`

**Change Password**
`python3 manage.py changepassword <user_name>`

----------

### API Queries


### Authentication
`POST http://localhost:8000/api-token-auth/ username=username password=password`

**Response**
```json
{"token": "8a56309d20072860016f3a23"}
```
**Error: (Status: 400 Bad Request)**
```json
{
    "non_field_errors": [
        "Unable to log in with provided credentials."
    ]
}
```

**API Request with Token**
```http
GET /products/api?format=json HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Token 8a56309d20072860016f3a23
```


#### POST Requests

**New Product**
***http://localhost:8000/products/api?format=json***
```json
{
  "name": "Product-18",
  "is_active": true,
  "images": [
    {"href":"https://picsum.photos/200/300"}
    {"href":"https://picsum.photos/200/300"}
  ],
  "description": "White",
  "price": 4.25,
  "stock": 8000
}
```

**New Product Image**
***http://localhost:8000/products/api/image/?format=json***
```json
{"id":"1b1ae4be-9140-464c-ac96-9e2868a912ea","href":"https://picsum.photos/200/300"}
```

***New Order***
***http://localhost:8000/orders/api?format=json***
```json
{
  "customer": "162eeb12-eff1-4fea-bd96-a0a56c2b461e",
  "items": [
    "738b4f78-4766-418d-8013-766018e9755b",
    "17ea292f-775d-440a-8c01-896c847ee266"
  ],
  "status": "CP",
  "note": "scas"
}
```

**New Customer**
***http://localhost:8000/customers/api?format=json***
```json
{
  "name": "ABC Inc.",
  "person": "Hereweald Endre",
  "taxnumber": "3252352323",
  "address": "2257 Wandering Ln Brea, California(CA), 92821",
  "telephone": "(714) 255-8378",
  "email": "asdasf@asf.com",
  "bankAccount": "89768584925839454"
}

```

#### PUT, DELETE Requests

**Order**
***http://localhost:8000/orders/api/[id]?format=json*** 

**Customer**
***http://localhost:8000/customers/api/[id]?format=json*** 

**Product**
***http://localhost:8000/products/api/[id]?format=json*** 