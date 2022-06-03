from django.urls import path
from . import views

app_name = 'payment'

urlpatterns = [
    path('api', views.PaymentListApiView.as_view()), 
    path('api/<uuid:id>/', views.PaymentApiView.as_view()), 
    path('', views.index, name="payments"),
    path('new', views.add_payment, name="add_payment"),
    path('edit/<uuid:id>/', views.edit_payment, name="edit_payment"),
    path('delete/<uuid:id>/', views.delete_payment, name="delete_payment"),

]
