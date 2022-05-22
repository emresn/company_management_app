from django.core.serializers.json import DjangoJSONEncoder

from customer.models import Customer
from order.models import Order

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Order):
            return str(obj)
        return super().default(obj)