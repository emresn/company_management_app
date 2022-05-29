import random
import string
from django.db import models
import uuid
from customer.models import Customer
from erp.constants.site_constants import Status
from product.models import  Product
from django.core.validators import MinValueValidator
from django.utils.timezone import now

class OrderItem(models.Model):
    choices = Status.tolist()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=False, serialize=True) 
    price = models.FloatField(null=False, verbose_name="Price",
                              default=0.0, validators=[MinValueValidator(0.0)])
    quantity =  models.IntegerField(default=0, null=False, verbose_name="Quantity")
    status = models.CharField(max_length=50,choices=choices,default=choices[0],verbose_name="Status",null=False)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(null=True,auto_now=True)
    def __str__(self) -> str:
        return '{} x {}'.format(self.product, self.quantity)
    class Meta:
        ordering = ['created_at']
   

class Order(models.Model):
    
    def generateOrderNo(id):
        from datetime import datetime
        date = datetime.now()
        size = 4
        chars = string.ascii_uppercase + string.digits
        randomstr = "".join(random.choice(chars) for _ in range(size))
        generated_key = '{}_{}'.format(date.strftime("%Y"), randomstr)
        return generated_key
   
    choices = Status.tolist()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_no = models.CharField(editable=False,unique=True,max_length=50,null=True,verbose_name="Order No")
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL,null=True, blank=True)  
    items = models.ManyToManyField(OrderItem) 
    status = models.CharField(max_length=50,choices=choices,default=choices[0], verbose_name="Status",null=False)
    note= models.TextField(default="", blank=True)
    date = models.DateTimeField(default=now, editable=True, blank=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(null=True,auto_now=True)
    
    def __str__(self) -> str:
        
        return '{} - {}'.format(self.order_no, self.customer)
    
    def save(self, *args, **kwargs):
        self.order_no = self.generateOrderNo()
        super().save(*args, **kwargs)  # Call the "real" save() method.
        
    
    class Meta:
        verbose_name_plural = "Orders"
        ordering = ['created_at']
        

    