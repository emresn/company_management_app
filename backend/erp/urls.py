from django.contrib import admin
from django.urls import path, include
from erp.views import json_error_msg
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',json_error_msg),
    path('products/', include("product.urls")),
    path('orders/', include("order.urls")),
    path('customers/', include("customer.urls")),
    path('payments/', include("payment.urls")),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 


]
