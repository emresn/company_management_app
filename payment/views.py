from django.shortcuts import render,redirect
from customer.serializer import CustomerSerializer
from erp.constants.context_consts import ContextConsts
from erp.utils.time_functions import generateTimeObj, generateTimeObjBackend, generateTimeStr
from order.serializers import OrderSerializer
from payment.forms import PaymentForm
from payment.serializer import PaymentSerializer
from .models import Customer, Payment
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from urllib.request import Request
from django.contrib import messages
from order.models import Order, OrderItem
from django.db.models import Sum


def index(request: Request):
    payments = Payment.objects.all()
    payments_serializer = PaymentSerializer(payments, many=True)

    left_amounts = {}
    total_amounts = {}

    customers = Customer.objects.all()
    customers_serializer = CustomerSerializer(customers, many=True)
    customers_total_prices = {}
    
    for customer in customers:
        total_order_price = 0
        orders : list[Order] = Order.objects.filter(customer = customer)
        orders_serializer = OrderSerializer(orders, many=True)
        for order in orders:
            sum = OrderItem.objects.filter(order=order).aggregate(Sum('price'))['price__sum']
            total_order_price += sum
        customers_total_prices[f"{customer.id}"] = total_order_price
    print(customers_total_prices)

            




    
    context_consts = ContextConsts.dic()
    context = {"payments": payments_serializer.data,
                **context_consts}
    return render(request, "payments.html", context)
    
def delete_payment(request, id):
    p:Payment = Payment.objects.get(id=id)
    p.delete()
    messages.warning(request, "Successfully deleted.")
    return redirect("/payment")


def edit_payment(request:Request,id):
    p:Payment = Payment.objects.get(id=id)
    serializer = PaymentSerializer(p)
    p_date = generateTimeStr(generateTimeObjBackend(serializer.data['date']))
    context_consts = ContextConsts.dic()
    customer = CustomerSerializer(p.company)
    form = PaymentForm(request.POST or None, initial={**serializer.data, 'company': customer.data['id']})
    context = {
        "title": "Update Payment",
        "mode": "edit",
        'date': p_date,
        "form": form, 
        **context_consts
    }

    if form.is_valid():
        p.company= form.cleaned_data.get("company")
        p.is_received= form.cleaned_data.get("is_received")
        p.amount= form.cleaned_data.get("amount")
        date_str= form.cleaned_data.get("date")
        date = generateTimeObj(date_str)
        p.date= date
        p.save()
        messages.success(request, "Successfully updated")
        return redirect("/payments")
  

    return render(request, "payment_form.html", context)


def add_payment(request:Request):
    context_consts = ContextConsts.dic()
    form = PaymentForm(request.POST or None)

    context = {
        "title": "New Payment",
        "mode": "new",
        "form": form, 
        **context_consts
    }

    if form.is_valid():
        product = Payment()
        product.company= form.cleaned_data.get("company")
        product.is_received= form.cleaned_data.get("is_received")
        product.amount= form.cleaned_data.get("amount")
        date_str= form.cleaned_data.get("date")
        date = generateTimeObj(date_str)
        product.date= date

        product.save()
        messages.success(request, "Successfully added")
        return redirect("/payments")
  

    return render(request, "payment_form.html", context)


class PaymentListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            "company": request.data.get('company'),
            "is_received": request.data.get('is_received'),
            "amount": request.data.get('amount')
        }

        serializer = PaymentSerializer(data=data)
        if serializer.is_valid():
            new_serializer = serializer.create(data)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Payment.objects.get(id=id)
        except Payment.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = PaymentSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "company": request.data.get('company'),
            "is_received": request.data.get('is_received'),
            "amount": request.data.get('amount')
        }
        
        company = Customer.objects.get(id=request.data.get('company'))
        instance.company = company
        serializer = PaymentSerializer(instance=instance, data=data, partial=True)
       
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
