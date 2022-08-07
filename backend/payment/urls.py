from django.urls import path
from . import views
from erp.views import json_error_msg

app_name = 'payment'

urlpatterns = [
    path('api', views.PaymentListApiView.as_view()),
    path('api/<uuid:id>/', views.PaymentApiView.as_view()),
    path('', json_error_msg)

]
