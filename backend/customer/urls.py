from django.urls import path
from . import views
from erp.views import json_error_msg

app_name = 'customer'

urlpatterns = [
    path('api', views.CustomerListApiView.as_view()), 
    path('api/<uuid:id>/', views.CustomerApiView.as_view()), 
    path("",json_error_msg)
]
