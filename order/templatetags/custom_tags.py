import json
from django import template
from datetime import datetime
from erp.constants.site_constants import SiteConstants

from erp.utils.time_functions import generateTimeStr



register = template.Library()

def gen_date(value):
    d = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S%z')
    time = generateTimeStr(d)
    return time

# customer page
def active_order_count(lst, key):
    count = 0
    for i in lst:
        if i["id"] == key:
            count = i['active_order_count']
    return count


def total_order_count(lst, key):
    count = 0
    for i in lst:
        if i["id"] == key:
            count = i['total_order_count']
    return count
##############################

# payments page
def total_orders_sum(lst, key):
    count = 0
    for i in lst:
        if i["id"] == key:
            count = i['total_orders_sum']
    return count

def left_orders_sum(lst, key):
    count = 0
    for i in lst:
        if i["id"] == key:
            count = i['left_orders_sum']
    return count

def paid_orders_sum(lst, key):
    count = 0
    for i in lst:
        if i["id"] == key:
            count = i['paid_orders_sum']
    return count

########################

register.filter('gen_date', gen_date)
register.filter('total_order_count', total_order_count)
register.filter('active_order_count', active_order_count)
register.filter('total_orders_sum', total_orders_sum)
register.filter('left_orders_sum', left_orders_sum)
register.filter('paid_orders_sum', paid_orders_sum)

