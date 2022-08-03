from django import forms
from .models import Customer
class PaymentForm(forms.Form):
    company = forms.ModelChoiceField(label="Company", queryset=Customer.objects.order_by("name").distinct('name'), widget=forms.Select(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black', }))
    is_received = forms.CharField(label="Is_received?", required=False, empty_value=False,initial=True ,widget=forms.CheckboxInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 border border-black', }))
    amount = forms.FloatField(label="Price", initial="", min_value=0, widget=forms.NumberInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black', }))
    date = forms.CharField(label="",required=True, widget=forms.TextInput(
        attrs={'class': 'hidden p-3 my-2  w-full border border-black'}))
    