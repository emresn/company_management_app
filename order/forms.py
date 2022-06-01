from cProfile import label
from datetime import datetime
from django import forms
from customer.models import Customer
from product.models import Product
from erp.constants.site_constants import Status


class OrderItemForm(forms.Form):
    choices = Status.tolist()
    product = forms.ModelChoiceField(label="Product", queryset=Product.objects.order_by("name").distinct('name'), widget=forms.Select(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black', 'x-model': "selectedProductId"}))
    price = forms.FloatField(label="Price", initial="", min_value=0, widget=forms.NumberInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black', 'x-model': "selectedProductPrice"}))
    quantity = forms.IntegerField(label="Quantity", initial="", min_value=0, widget=forms.NumberInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black', 'x-model': "selectedProductQty"}))


class OrderForm(forms.Form):
    choices = Status.tolist()
    status = forms.ChoiceField(choices=choices, label="Status", required=True, initial=choices[0], widget=forms.Select(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    date = forms.DateTimeField(input_formats=['%d/%m/%Y %H:%M'], initial=datetime.now, widget=forms.DateTimeInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    customer = forms.ModelChoiceField(label="Customer", queryset=Customer.objects.distinct(
        'name'), widget=forms.Select(attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    note = forms.CharField(label="Note", required=False,  widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    items = forms.JSONField(label="", widget=forms.Textarea(
        attrs={'placeholder': '', 'class': 'p-3 my-2 hidden w-full border border-black', 'x-text': "order_items_json_stringfy", 'x-init': "$watch('order_items', value => getOrderItems(value))"}))

    #
