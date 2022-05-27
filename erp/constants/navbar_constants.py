class Navbar:
    def __init__(self, href, title):
        self.href = href
        self.title = title

    def makeList():
        home = Navbar(href="/", title="Home")
        products = Navbar(href="/products", title="Products")
        orders = Navbar(href="/orders", title="Orders")
        customers = Navbar(href="/customers", title="Customers")
        payments = Navbar(href="/payments", title="Payments")

        return [home, products, orders, customers, payments]



