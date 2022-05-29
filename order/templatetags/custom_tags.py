from django import template
from datetime import datetime



register = template.Library()

def gen_date(value):
    d = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S%z')
    new_date = d.strftime('%d/%m/%Y %H:%M')
    return new_date


register.filter('gen_date', gen_date)
