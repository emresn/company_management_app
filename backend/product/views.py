from .models import  Product
from .serializers import  ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions



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
