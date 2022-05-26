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

    def generateProductKey(title):
        import random
        size = 4
        chars = string.ascii_uppercase + string.digits
        randomstr = "".join(random.choice(chars) for _ in range(size))
        generated_key = '{}_{}'.format(title, randomstr)
        Tr2Eng = str.maketrans("çğıöşü", "cgiosu")
        return generated_key.lower().translate(Tr2Eng)

    title = models.CharField(max_length=50, null=True, verbose_name="Name")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(editable=False, unique=True,
                           max_length=50, null=True, verbose_name="Key")
    is_active = models.BooleanField(default=True, null=False)
    images = models.ManyToManyField(Image, blank=True)
    description = models.TextField(null=True)
    stock = models.IntegerField(
        null=False, default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)

    def __str__(self) -> str:
        return '{}'.format(self.title)

    def save(self, *args, **kwargs):
        self.key = self.generateProductKey()
        super().save(*args, **kwargs)  # Call the "real" save() method.

    class Meta:
        verbose_name_plural = "Products"
        ordering = ['created_at']
