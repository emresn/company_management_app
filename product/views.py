from datetime import date, datetime
import json
from urllib.request import Request
from django.shortcuts import render
from .models import Image, Product
from django.http import JsonResponse


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Product
from .serializers import ProductSerializer

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


# def show_products_api(request: Request):
#     if request.method == "GET":
#         data = {}
#         products: list[Product] = Product.objects.order_by("-created_at")
        

#         for product in products:
#             images_array_raw = product.images.all()
#             images_array = []
#             for i in images_array_raw:
#                 images_array.append(i.href)

#             data[product.key] = {
#                 "id": product.id,
#                 "key": product.key,
#                 "title": product.title,
#                 "description": product.description,
#                 "is_active": product.is_active,
#                 "price": product.price,
#                 "images": images_array,
#                 "stock": product.stock,
#                 # "customer": {
#                 #     "name": product.customer.name
#                 # },
#                 "created_at": product.created_at,
#                 "updated_at": product.updated_at,
#             }

#         return JsonResponse({
#             "data": data,

#         })
#     else:
#         pass


# def show_product_api(request: Request, id):
#     if request.method == "GET":
#         product: Product = Product.objects.get(id=id)
#         images_array_raw = product.images.all()
#         images_array = []
#         for i in images_array_raw:
#             images_array.append(i.href)

#         return JsonResponse({
#             "data":  {"id": product.id,
#                       "key": product.key,
#                       "title": product.title,
#                       "description": product.description,
#                       "created_at": product.created_at,
#                       "updated_at": product.updated_at,
#                       "stock": product.stock,
#                       "is_active": product.is_active,
#                       "price": product.price,
#                       "images": images_array}
#         })
#     else:
#         pass


class ProductListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the product items for given requested user
        '''
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Product with given product data
        '''
        
        data = {
            "title": request.data.get('title'),
            "description": request.data.get('description'),
            "stock": request.data.get('stock'),
            "is_active": request.data.get('is_active'),
            "price": request.data.get('price'),
            "images": request.data.get('images'),
            
        }
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the Product with given todo_id
        '''
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
        '''
        Updates the todo item with given id if exists
        '''
        product_instance = self.get_object(id)
        if not product_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "title": request.data.get('title'),
            "description": request.data.get('description'),
            "stock": request.data.get('stock'),
            "is_active": request.data.get('is_active'),
            "price": request.data.get('price'),
            "images": request.data.get('images'),
        }
        serializer = ProductSerializer(instance = product_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        '''
        Deletes the todo item with given id if exists
        '''
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