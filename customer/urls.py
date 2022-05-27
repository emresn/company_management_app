from django.urls import path
from . import views

app_name = 'customer'

urlpatterns = [
    path('api', views.CustomerListApiView.as_view()), 
    path('api/<uuid:id>/', views.CustomerApiView.as_view()), 
    path('', views.index, name="customers"),

]
