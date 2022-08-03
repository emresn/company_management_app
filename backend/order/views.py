from datetime import datetime
import json
from django.contrib import messages
from django.shortcuts import render, redirect
from customer.models import Customer
from erp.constants.context_consts import ContextConsts
from erp.constants.site_constants import SiteConstants
from erp.utils.time_functions import generateTimeObj, generateTimeObjBackend, generateTimeStr
from order.forms import OrderForm, OrderItemForm
from order.models import Order, OrderItem
from urllib.request import Request
from django.http import JsonResponse
import json
from django.core import serializers
from order.price_model import OrderPrice

from order.serializers import OrderSerializer
from product.models import Product
from product.serializers import ProductSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Order
from .serializers import OrderItemSerializer, OrderSerializer
from customer.serializer import CustomerSerializer
from django.db.models import Sum

def index(request: Request):
    orders = Order.objects.order_by("-date")
    serializer = OrderSerializer(orders, many=True)
    order_prices = {}
    for o in orders:
        order_price = OrderItem.objects.all().filter(order=o).aggregate(Sum('total_price'))
        order_prices["{}".format(o.id)] = order_price

    context_consts = ContextConsts.dic()
    context = {"orders": serializer.data, "order_prices": order_prices,
                **context_consts}
    return render(request, "orders.html", context)

def delete_order(request,id):
    o:Order = Order.objects.get(id=id)
    items = OrderItem.objects.all().filter(order=o)
    for i in items:
        i.delete()
    o.delete()
    messages.warning(request, "Successfully deleted.")
    return redirect("/orders")

def edit_order(request, id):
    o:Order = Order.objects.get(id=id)
    serializer = OrderSerializer(o)
    o_items = OrderItemSerializer(o.items, many=True)
    o_customer = CustomerSerializer(o.customer)
    o_date = generateTimeStr(generateTimeObjBackend(serializer.data['date']))
    products = Product.objects.all()
    products_serializer = ProductSerializer(products, many=True)
    context_consts = ContextConsts.dic()
    

    o_items_filtered = {}
    for i in o_items.data:
        item_dict = {"id": i['product']['id'],"name": "{}-{}".format(i['product']['code'],i['product']['name']), "qty": i['quantity'], "price": i['price']}
        o_items_filtered[i['id']] = item_dict

    orderItemForm = OrderItemForm(request.POST or None, initial={'products': products_serializer.data})
    orderForm = OrderForm(request.POST or None ,initial={'status': serializer.data['status'], 'note': serializer.data['note'], 'customer': o_customer.data['id']})
    
    context = {
        "title": "Edit Order",
        "mode": "edit",
        'date': o_date,
        'items': o_items_filtered,
        "orderItemForm":orderItemForm,
        "orderForm": orderForm, **context_consts
    }
    if orderForm.is_valid():
        # print('valid')
        
        date_str= orderForm.cleaned_data.get("date")
        date = generateTimeObj(date_str)

        o.customer = orderForm.cleaned_data.get("customer")
        o.note = orderForm.cleaned_data.get("note")
        o.status = orderForm.cleaned_data.get("status")
        o.date=date
        o.save()
        
        items_obj:dict = orderForm.cleaned_data.get("items")
        items:list[OrderItem]= []
        items_id_list = []
        order_price = 0
        order_vat_price = 0
        order_total_price = 0
        for i in items_obj.keys():
            orderItem = OrderItem()
            orderItem.product = Product.objects.get(id=items_obj[i]['id'])
            orderItem.quantity = items_obj[i]['qty']
            orderItem.price = items_obj[i]['price']
            order_price += (int(orderItem.quantity) * float(orderItem.price))
            order_vat_price = SiteConstants.VAT /100 * order_price
            order_total_price = (order_price + order_vat_price)
            orderItem.save()
            items_id_list.append(orderItem.id)
            items.append(orderItem)
        order_items_list = OrderItem.objects.filter(id__in = items_id_list)
        o.items.set(order_items_list)
        o.price = order_price
        o.vat = order_vat_price
        o.total_price = order_total_price
        o.save()
        messages.success(request, "Successfully updated.")

        return redirect("/orders")
    return render(request, "order_form.html", context)



def new_order(request):
    context_consts = ContextConsts.dic()
    orderItemForm = OrderItemForm(request.POST or None)
    orderForm = OrderForm(request.POST or None)

    context = {
        "title": "New Order","mode": "new",
        "orderItemForm":orderItemForm,
        "orderForm": orderForm, **context_consts
    }

    if orderForm.is_valid():
        order:Order = Order()
        date_str= orderForm.cleaned_data.get("date")
        date = generateTimeObj(date_str)

        order.customer = orderForm.cleaned_data.get("customer")
        order.note = orderForm.cleaned_data.get("note")
        order.status = orderForm.cleaned_data.get("status")
        order.date=date
        order.save()
        
        items_obj:dict = orderForm.cleaned_data.get("items")
        items:list[OrderItem]= []
        items_id_list = []
        order_price = 0
        order_vat_price = 0
        order_total_price = 0
        for i in items_obj.keys():
            orderItem = OrderItem()
            orderItem.product = Product.objects.get(id=i)
            orderItem.quantity = items_obj[i]['qty']
            orderItem.price = items_obj[i]['price']
            order_price += (int(orderItem.quantity) * float(orderItem.price))
            order_vat_price = SiteConstants.VAT /100 * order_price
            order_total_price = (order_price + order_vat_price)
            orderItem.save()
            items_id_list.append(orderItem.id)
            items.append(orderItem)
        order_items_list = OrderItem.objects.filter(id__in = items_id_list)
        order.items.set(order_items_list)
        order.price = order_price
        order.vat = order_vat_price
        order.total_price = order_total_price
        order.save()
        messages.success(request, "Successfully added")

        return redirect("/orders")
    return render(request, "order_form.html", context)


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
