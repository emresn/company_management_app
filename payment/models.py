from django.db import models
import uuid
from customer.models import Customer
from django.core.validators import MinValueValidator


# Create your models here.
class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)  
    is_received = models.BooleanField(default=True, null=False)
    amount = models.FloatField(null=False, verbose_name="Amount", default=0.0, validators=[MinValueValidator(0.0)])
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(null=True,auto_now=True)
    
    def __str__(self) -> str:
        return '{:.2f} - {}'.format(self.amount, self.company)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Call the "real" save() method.
        
    class Meta:
        verbose_name_plural = "Payment"
        ordering = ['created_at']