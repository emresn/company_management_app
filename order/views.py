import json
from django.shortcuts import render
from customer.models import Customer
from erp.constants.context_consts import ContextConsts
from order.models import Order, OrderItem
from urllib.request import Request
from django.http import JsonResponse
import json
from django.core import serializers
from order.price_model import OrderPrice

from order.serializers import OrderSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Order
from .serializers import OrderSerializer
# Create your views here.


def index(request: Request):
    orders = Order.objects.order_by("-created_at")
    serializer = OrderSerializer(orders, many=True)
    context_consts = ContextConsts.dic()
    context = {"orders": serializer.data,
                **context_consts}
    return render(request, "orders.html", context)


def orders_api(request: Request):
    if request.method == "GET":
        data = []
        orders = Order.objects.all()

        for order in orders:
            # order_items:list[OrderItem] = order.items
            order_items = OrderItem.objects.all()
            order_items_serialize = serializers.serialize(
                'json', order_items)
            order_items_json = json.loads(order_items_serialize)
            customer = serializers.serialize(
                'json', Customer.objects.all())
            customer_json = json.loads(customer)[0]

            data.append({"id": order.id,
                         "status": order.status,
                         "order_no": order.order_no,
                         "order_items": order_items_json,
                         "customer": customer_json,
                         "created_at": order.created_at,
                         "updated_at": order.updated_at, })

        return JsonResponse({
            "data": data,
        })
    else:
        pass


class OrderListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the product items for given requested user
        '''
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Order with given product data
        '''
        data = {
            "customer": request.data.get('customer'),
            "items": request.data.get('items'),
            "status": request.data.get('status'),
            "note": request.data.get('note')
        }
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            # serializer.save()
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
            new_serializer = serializer.create(data)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Order.objects.get(id=id)
        except Order.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the Order with given todo_id
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = OrderSerializer(instance)
        order_price_dict = OrderPrice.build(serializer.data['items'])
        
        return Response({**serializer.data, **order_price_dict}, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, id, *args, **kwargs):
        '''
        Updates the todo item with given id if exists
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "id": request.data.get('id'),
            "order_no": request.data.get('order_no'),
            "customer": request.data.get('customer'),
            "items": request.data.get('items'),
            "status": request.data.get('status'),
            "note": request.data.get('note'),
        }

        items_id_list = request.data.get('items')
        items_obj_list= []
        for i in items_id_list:
            item = OrderItem.objects.get(id=i)
            items_obj_list.append(item)
        instance.items.set(items_obj_list)

        customer = Customer.objects.get(id=request.data.get('customer'))
        instance.customer = customer

        serializer = OrderSerializer(
            instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        '''
        Deletes the todo item with given id if exists
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
