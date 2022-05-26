from struct import calcsize
from order.models import Order, OrderItem


class OrderPrice():
    def __init__(self, net_cost, vat, total_cost):
        self.net_cost = net_cost
        self.vat = vat
        self.total_cost = total_cost
    def __calculate__(item_cost:float):
        net_cost:float = round(item_cost,2)
        vat:float = round(net_cost * 18 /100,2)
        return OrderPrice(
            net_cost= net_cost,
            vat= vat,
            total_cost=net_cost+vat
        )
    
    def build(items_dict):
        print(items_dict)
        # order_items:list[OrderItem] = order.items
        # print(order_items)
        price = 0.0
        for item in items_dict:
            price +=(item['price']*item['quantity'])
        model = OrderPrice.__calculate__(price)
        order_price_dict = {
            "net_cost": model.net_cost, 
            "vat": model.vat, 
            "total_cost": model.total_cost
        }
        return order_price_dict
            

