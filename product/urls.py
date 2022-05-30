from django.urls import path
from . import views
from .views import (
    ProductDetailApiView,
    ProductListApiView,
)

app_name = 'product'

urlpatterns = [
    path('', views.products, name="products"),
    path('new', views.new_product, name="new_products"),
    path('edit/<uuid:id>/', views.edit_product, name="edit_product"),
    path('delete/<uuid:id>/', views.delete_product, name="delete_product"),
    path('<uuid:id>', views.show_product, name="show_product"),
    # path('api/<uuid:id>', views.show_product_api, name="show_product_api"),
    # path('api', views.show_products_api, name="show_products_api") 
    path('api', ProductListApiView.as_view()), 
    path('api/<uuid:id>/', ProductDetailApiView.as_view()), 

]
