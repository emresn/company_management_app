from django.urls import path
from .views import (
    ImageApiView,
    ProductDetailApiView,
    ProductListApiView,
)
from erp.views import json_error_msg

app_name = 'product'

urlpatterns = [
    path('api', ProductListApiView.as_view()), 
    path('api/<uuid:id>/', ProductDetailApiView.as_view()), 
    path('api/image/', ImageApiView.as_view()),
    path('', json_error_msg)

]
