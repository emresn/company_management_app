from django.urls import path
from . import views
from erp.views import json_error_msg

app_name = 'order'

urlpatterns = [
    path('api', views.OrderListApiView.as_view()), 
    path('api/<uuid:id>/', views.OrderDetailApiView.as_view()), 
    path('', json_error_msg)

]
