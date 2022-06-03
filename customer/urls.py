from django.urls import path
from . import views

app_name = 'customer'

urlpatterns = [
    path('api', views.CustomerListApiView.as_view()), 
    path('api/<uuid:id>/', views.CustomerApiView.as_view()), 
    path('', views.index, name="customers"),
    path('new', views.new_customer, name="new_customers"),
    path('edit/<uuid:id>/', views.edit_customer, name="edit_customer"),
    path('delete/<uuid:id>/', views.delete_payment, name="delete_customer"),


]
