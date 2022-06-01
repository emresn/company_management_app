from urllib.request import Request
from django.shortcuts import render, redirect
from erp.constants.context_consts import ContextConsts
from product.forms import ProductForm
from .models import Image, Product
from .serializers import ImageSerializer, ProductSerializer
from order.models import Order
from customer.models import Customer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.contrib import messages
from django.urls import path
# Create your views here.


def index(request: Request):
    products_len = Product.objects.count
    orders:Order = Order.objects.all()
    active_order_items_list= []
    for i in orders:
        if i.status == 'NS' or i.status == 'IP':
            active_order_items_list.append(i)


    active_orders_len = len(active_order_items_list)
    products_len = Product.objects.count
    customers_len = Customer.objects.count
    context_consts = ContextConsts.dic()
    context = {"products_len": products_len,
               "orders_len": active_orders_len, "customers_len": customers_len, **context_consts}
    return render(request, "index.html", context)


def products(request: Request):

    if request.method == 'GET':
        products = Product.objects.order_by("created_at")
        serializer = ProductSerializer(products, many=True)
        context_consts = ContextConsts.dic()
        context = {"products": serializer.data, **context_consts}
        return render(request, "products.html", context)

    elif request.method == 'POST':
        context_consts = ContextConsts.dic()
        context = {"products": products, **context_consts}
        return render(request, "index.html", context)


def show_product(request, id):
    product: Product = Product.objects.get(id=id)
    stock_list = range(1, product.stock)
    context_consts = ContextConsts.dic()
    context = {"product": product, "stock_list": stock_list, **context_consts}
    return render(request, "products.html", context)

def delete_product(request,id):
    p = Product.objects.get(id=id)
    p.delete()
    messages.warning(request, "Successfully deleted")
    return redirect("/products")

def edit_product(request, id):
    p = Product.objects.get(id=id)
    serializer = ProductSerializer(p)
    image_serializer = ImageSerializer(p.images, many=True)
    context_consts = ContextConsts.dic()
    form = ProductForm(request.POST or None, initial={"image_href": image_serializer.data[0]['href'] ,**serializer.data}, )
    
    context = {
        "title": "New Product","mode": "edit",
        "form": form, **context_consts
    }

    if form.is_valid():
        
        p.name = form.cleaned_data.get("name")
        p.is_active = form.cleaned_data.get("is_active")
        p.description = form.cleaned_data.get("description")
        p.stock = form.cleaned_data.get("stock")
        p.gr = form.cleaned_data.get("gr")
       
        p.save()
        image_href = form.cleaned_data.get("image_href")
        image = Image()
        image.href = image_href
        image.save()
       
        p.images.set([image])        
        messages.success(request, "Successfully updated")
        return redirect("/products")
  

    return render(request, "product_form.html", context)


def new_product(request):
    context_consts = ContextConsts.dic()
    form = ProductForm(request.POST or None)

    context = {
        "title": "New Product","mode": "new",
        "form": form, **context_consts
    }

    if form.is_valid():
        product = Product()
        product.name= form.cleaned_data.get("name")
        product.is_active= form.cleaned_data.get("is_active")
        product.description= form.cleaned_data.get("description")
        product.stock= form.cleaned_data.get("stock")
        product.gr = form.cleaned_data.get("gr")
        product.save()
        image_href = form.cleaned_data.get("image_href")
        image = Image()
        image.href = image_href
        image.save()
       
        product.images.set([image])        
        messages.success(request, "Successfully added")

        return redirect("/products")
  

    return render(request, "product_form.html", context)

class ProductListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get('name'),
            "description": request.data.get('description'),
            "stock": request.data.get('stock'),
            "images": request.data.get('images'),
            "is_active": request.data.get('is_active')
        }

        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            new_serializer = serializer.create(data)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        product_instance = self.get_object(id)
        if not product_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProductSerializer(product_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, id, *args, **kwargs):
        product_instance = self.get_object(id)
        if not product_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "name": request.data.get('name'),
            "description": request.data.get('description'),
            "stock": request.data.get('stock'),
            "is_active": request.data.get('is_active'),
            "images": request.data.get('images'),
        }
        serializer = ProductSerializer(
            instance=product_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        product_instance = self.get_object(id)
        if not product_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        product_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
