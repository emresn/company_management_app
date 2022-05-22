import json
from django.shortcuts import render
from customer.models import Customer
from order.models import Order, OrderItem
from urllib.request import Request
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.forms.models import model_to_dict
import json
from django.core import serializers

# Create your views here.


def index(request: Request):
    orders = Order.objects.order_by("-created_at")
    context = {"orders": orders}
    return render(request, "index.html", context)


def orders_api(request: Request):
    if request.method == "GET":
        data = []
        orders: list[Order] = Order.objects.order_by("-created_at")

        for order in orders:

            # order_items:list[OrderItem] = order.items
            order_items = serializers.serialize(
                'json', OrderItem.objects.all())
            order_items_json = json.loads(order_items)
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
