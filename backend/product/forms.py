from django import forms


    
class ProductForm(forms.Form):
    is_active = forms.CharField(label="Active?", required=False, empty_value=False,initial=True ,widget=forms.CheckboxInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 border border-black', }))
    name = forms.CharField(label="Name", required=True, widget=forms.TextInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    image_href = forms.CharField(label="Image",required=False, widget=forms.TextInput(
        attrs={'placeholder': 'url://', 'class': 'p-3 my-2 w-full border border-black'}))
    description = forms.CharField(label="Description",required=False,  widget=forms.TextInput(
        attrs={'placeholder': 'description', 'class': 'p-3 my-2 w-full border border-black'}))
    stock = forms.IntegerField(label="Stock",required=False, min_value=0, widget=forms.NumberInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    gr = forms.FloatField(label="Weight(gr)",required=False, min_value=0, widget=forms.NumberInput(
        attrs={'placeholder': '', 'class': 'p-3 my-2 w-full border border-black'}))
    
