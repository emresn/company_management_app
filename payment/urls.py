from django.urls import path
from . import views

app_name = 'payment'

urlpatterns = [
    path('api', views.PaymentListApiView.as_view()), 
    path('api/<uuid:id>/', views.PaymentApiView.as_view()), 
    path('', views.index, name="payments"),

]
