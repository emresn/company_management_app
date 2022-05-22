from django.db import models
import uuid

class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name= models.CharField(max_length=100,null=True,verbose_name="Name")
    person= models.CharField(max_length=100,null=True,verbose_name="Person")
    taxnumber= models.CharField(max_length=100,null=True,verbose_name="Tax Number")
    address= models.TextField(max_length=300,null=True,verbose_name="Address")
    telephone= models.CharField(max_length=100,null=True,verbose_name="Tel")
    email= models.EmailField(max_length=100,null=True,verbose_name="Email")
    bankAccount= models.CharField(max_length=100,null=True,verbose_name="Bank Account")

    def __str__(self) -> str:
        return '{}'.format(self.name)