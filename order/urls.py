from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('', views.index, name="orders"),
    path('api', views.orders_api, name="orders_api"),

]
