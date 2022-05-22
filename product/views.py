

from datetime import date, datetime
import json
from urllib.request import Request
from django.shortcuts import render
from .models import Product
from django.http import JsonResponse


# Create your views here.
def index(request: Request):
    products = Product.objects.order_by("-created_at")
    context = {"products": products}
    return render(request, "index.html", context)


def show_product(request, id):
    product: Product = Product.objects.get(id=id)
    stock_list = range(1, product.stock)
    context = {"product": product, "stock_list": stock_list}
    return render(request, "show_product.html", context)


def show_products_api(request: Request):
    if request.method == "GET":
        data = {}
        products: list[Product] = Product.objects.order_by("-created_at")
        

        for product in products:
            images_array_raw = product.images.all()
            images_array = []
            for i in images_array_raw:
                images_array.append(i.href)

            data[product.key] = {
                "id": product.id,
                "key": product.key,
                "title": product.title,
                "description": product.description,
                "is_active": product.is_active,
                "price": product.price,
                "images": images_array,
                "stock": product.stock,
                # "customer": {
                #     "name": product.customer.name
                # },
                "created_at": product.created_at,
                "updated_at": product.updated_at,
            }

        return JsonResponse({
            "data": data,

        })
    else:
        pass


def show_product_api(request: Request, id):
    if request.method == "GET":
        product: Product = Product.objects.get(id=id)
        images_array_raw = product.images.all()
        images_array = []
        for i in images_array_raw:
            images_array.append(i.href)

        return JsonResponse({
            "data":  {"id": product.id,
                      "key": product.key,
                      "title": product.title,
                      "description": product.description,
                      "created_at": product.created_at,
                      "updated_at": product.updated_at,
                      "stock": product.stock,
                      "is_active": product.is_active,
                      "price": product.price,
                      "images": images_array}
        })
    else:
        pass
