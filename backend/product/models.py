import string
from django.db import models
import uuid
from django.core.validators import MinValueValidator


class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    href = models.URLField(null=True)

    def __str__(self) -> str:
        return '{}'.format(self.href[self.href.rfind('/')+1:])


# Create your models here.
class Product(models.Model):

    def generateProductCode(self):
        import random
        size1 = 2
        size2 = 4
        chars1 = string.ascii_uppercase
        chars2 = string.digits
        str1 = "".join(random.choice(chars1) for _ in range(size1))
        str2 = "".join(random.choice(chars2) for _ in range(size2))
        generated_code = '{}_{}'.format(str1, str2)
        return generated_code

    
    name = models.CharField(max_length=50, null=False, default="", verbose_name="Name")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(unique=True, editable=False,
                           max_length=10, null=False, verbose_name="Code")
    is_active = models.BooleanField(default=True, null=False)
    images = models.ManyToManyField(Image, blank=True, default=[])
    description = models.TextField(null=True, blank=True, default="")
    gr = models.FloatField(default=0.0,verbose_name="Weight(gr)", blank=True, null=False )
    stock = models.IntegerField(
        null=False, default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)

    def __str__(self) -> str:
        return '{}-{}'.format(self.code,self.name)

    def save(self, *args, **kwargs):
        self.code = self.generateProductCode()
        super().save(*args, **kwargs)  # Call the "real" save() method.

    class Meta:
        verbose_name_plural = "Products"
        ordering = ['created_at']
