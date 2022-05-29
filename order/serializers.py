# todo/todo_api/serializers.py
from customer.models import Customer
from customer.serializer import CustomerSerializer
from product.serializers import ProductSerializer
from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id','product','quantity','price','status','is_active','created_at','updated_at']


class OrderSerializer(serializers.ModelSerializer):

    customer = CustomerSerializer( read_only=True)
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
            'date',
            "created_at",
            "updated_at",
        ]
    
    # def to_representation(self, instance):
    #     self.fields['customer'] =  CustomerSerializer(read_only=True)
    #     return super(OrderSerializer, self).to_representation(instance)

    def create(self,validated_data):
        
        customer_id = validated_data.pop('customer')
        items_id_list = validated_data.pop('items')
        customer:Customer = Customer.objects.get(id=customer_id)
        instance:Order = super().create(validated_data)
        instance.customer = customer

        items_obj_list= []
        for i in items_id_list:
            item = OrderItem.objects.get(id=i)
            items_obj_list.append(item)
        instance.items.set(items_obj_list)


        instance.save()
       
        serializer = OrderSerializer(instance)
        return serializer

