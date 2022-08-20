from django.contrib import admin

from product.models import Image, Product

# Register your models here.

class ImageAdmin(admin.ModelAdmin):
    list_display = ['href', 'id']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at', 'id']

admin.site.register(Image,ImageAdmin)
admin.site.register(Product,ProductAdmin)
