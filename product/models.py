from django.db import models
import uuid

class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    href = models.TextField(null=True)

    def __str__(self) -> str:
        return '{}'.format(self.href[self.href.rfind('/')+1:])

# Create your models here.
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=50,null=True,verbose_name="Key")
    is_active= models.BooleanField(default=True, null=False)
    images = models.ManyToManyField(Image)
    title= models.CharField(max_length=50,null=True,verbose_name="Name")
    description= models.TextField(null=True)    
    price= models.DecimalField(null=True,verbose_name="Price",max_digits=6, decimal_places=2)
    stock= models.IntegerField(null=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(null=True,auto_now_add=True)

    
    def __str__(self) -> str:
        return '{}'.format(self.title)
    
    class Meta:
        verbose_name_plural = "Products"

    