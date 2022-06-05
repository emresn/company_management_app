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



register.filter('gen_date', gen_date)

