from django.shortcuts import render, redirect
from customer.forms import CustomerForm
from django.contrib import messages
from customer.serializer import CustomerSerializer
from erp.constants.context_consts import ContextConsts
from .models import Customer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from urllib.request import Request

def index(request: Request):
    customers = Customer.objects.order_by("name")
    serializer = CustomerSerializer(customers, many=True)
    context_consts = ContextConsts.dic()
    context = {"customers": serializer.data,
                **context_consts}
    return render(request, "customers.html", context)

def new_customer(request:Request):
    context_consts = ContextConsts.dic()
    form = CustomerForm(request.POST or None)

    context = {
        "title": "New Product","mode": "new",
        "form": form, **context_consts
    }

    if form.is_valid():
        product = Customer()
        product.name= form.cleaned_data.get("name")
        product.person= form.cleaned_data.get("person")
        product.taxnumber= form.cleaned_data.get("taxnumber")
        product.address= form.cleaned_data.get("address")
        product.telephone = form.cleaned_data.get("telephone")
        product.email= form.cleaned_data.get("email")
        product.bankAccount = form.cleaned_data.get("bankAccount")
        product.save()
       
        messages.success(request, "Successfully added")

        return redirect("/customers")
  

    return render(request, "customer_form.html", context)



class CustomerListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get('name'),
            "person": request.data.get('person'),
            "taxnumber": request.data.get('taxnumber'),
            "address": request.data.get('address'),
            "telephone": request.data.get('telephone'),
            "email": request.data.get('email'),
            "bankAccount": request.data.get('bankAccount')
        }

        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            new_serializer = serializer.create(data)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CustomerSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "name": request.data.get('name'),
            "person": request.data.get('person'),
            "taxnumber": request.data.get('taxnumber'),
            "address": request.data.get('address'),
            "telephone": request.data.get('telephone'),
            "email": request.data.get('email'),
            "bankAccount": request.data.get('bankAccount')
        }
        serializer = CustomerSerializer(instance = instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
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

