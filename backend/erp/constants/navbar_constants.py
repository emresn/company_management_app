class Navbar:
    def __init__(self, href, title, icon):
        self.href = href
        self.title = title
        self.icon = icon

    def makeList():
        home = Navbar(href="/", title="Home", icon="img/home.svg")
        products = Navbar(href="/products", title="Products",icon="img/product.svg")
        orders = Navbar(href="/orders", title="Orders",icon="img/order.svg")
        customers = Navbar(href="/customers", title="Customers",icon="img/customer.svg")
        payments = Navbar(href="/payments", title="Payments",icon="img/payment.svg")

        return [home, products, orders, customers, payments]



