from django.urls import path
from . import views


app_name = 'product'

urlpatterns = [
    path('', views.index, name="products"),
    path('<uuid:id>', views.show_product, name="show_product"),
    path('api/<uuid:id>', views.show_product_api, name="show_product_api"),
    path('api', views.show_products_api, name="show_products_api")    

]
