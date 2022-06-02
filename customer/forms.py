from django import forms

class CustomerForm(forms.Form):
    name = forms.CharField(label="Name", required=True, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    person = forms.CharField(label="Person",required=False, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    taxnumber = forms.CharField(label="Taxnumber",required=False,  widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    address = forms.CharField(label="Address",required=False, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    telephone = forms.CharField(label="Telephone",required=False, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    email = forms.CharField(label="Email",required=False, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    bankAccount = forms.CharField(label="Bank Account",required=False, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))