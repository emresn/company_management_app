from django.contrib import admin

from product.models import Image, Product

# Register your models here.
admin.site.register(Product)
admin.site.register(Image)
