from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('', views.index, name="orders"),
    path('new', views.new_order, name="new_order"),
    path('edit/<uuid:id>', views.edit_order, name="edit_order"),
    path('delete/<uuid:id>', views.delete_order, name="delete_order"),
    # path('api', views.orders_api, name="orders_api"),
    path('api', views.OrderListApiView.as_view()), 
    path('api/<uuid:id>/', views.OrderDetailApiView.as_view()), 

]
