# todo/todo_api/serializers.py
from product.serializers import ProductSerializer
from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)


    class Meta:
        model = OrderItem
        fields = ['id','product','quantity','status','is_active','created_at','updated_at']


class OrderSerializer(serializers.ModelSerializer):

    customer = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_no",
            "customer",
            "items",
            "status",
            "note",
            "created_at",
            "updated_at",
        ]
