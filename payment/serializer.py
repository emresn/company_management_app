
from customer.models import Customer
from customer.serializer import CustomerSerializer
from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):

    company = CustomerSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'company', 'is_received', 'amount','date','created_at', 'updated_at']

    def create(self, validated_data):
        print("dgadgag")
        company_id = validated_data.pop('company')
        company:Customer = Customer.objects.get(id=company_id)
        instance: Payment = super().create(validated_data)
        instance.company = company
        instance.save()

        serializer = PaymentSerializer(instance)
        return serializer
