### Commands

**Create Virtual Enviroment**
`virtualenv venv`

**activate venv**
`source venv/bin/activate`

**start project**
`django-admin startproject dshop`

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

