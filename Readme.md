### Commands
**Start Database serice**
`sudo service postgresql restart`

**Create Virtual Enviroment**
`virtualenv venv`

**activate venv**
`source venv/bin/activate`

**start project**
`django-admin startproject product`

**postgres db settings**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```
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

**Models CASCADE or ...**
`CASCADE` : When the referenced object is deleted, also delete the objects that have references to it (when you remove a blog post for instance, you might want to delete comments as well). SQL equivalent: CASCADE.
`PROTECT` Forbid the deletion of the referenced object. To delete it you will have to delete all objects that reference it manually. SQL equivalent: RESTRICT.
`RESTRICT`: (introduced in Django 3.1) Similar behavior as PROTECT that matches SQL's RESTRICT more accurately. (See django documentation example)
`SET_NULL` : Set the reference to NULL (requires the field to be nullable). For instance, when you delete a User, you might want to keep the comments he posted on blog posts, but say it was posted by an anonymous (or deleted) user. SQL equivalent: SET NULL.
`SET_DEFAULT` : Set the default value. SQL equivalent: SET DEFAULT.
`SET(...)` : Set a given value. This one is not part of the SQL standard and is entirely handled by Django.
`DO_NOTHING` : Probably a very bad idea since this would create integrity issues in your database (referencing an object that actually doesn't exist). SQL equivalent: NO ACTION. 

**Change Password**
`python3 manage.py changepassword <user_name>`

**APIs**
**POST New Product**
```json
{
  "title": "Product-18",
  "is_active": true,
  "images": [
    "4b0ccb54-6406-42ea-8ee7-7a2d89ae70d5",
    "db47c6ea-29cd-4369-8668-d054ae3875f2"
  ],
  "description": "Şeffaf afsg",
  "price": 4.25,
  "stock": 8000
}
```
