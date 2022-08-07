from datetime import datetime
from erp.constants.site_constants import SiteConstants

def generateDateFormatForPy(site_date_format):
    date_format_py = ''
    if (site_date_format == 'D d M, Y'):
        date_format_py = '%a %d %b %Y'
    elif (site_date_format == 'DD-MM-YYYY'):
        date_format_py = '%d-%m-%Y'
    elif (site_date_format == 'YYYY-MM-DD'):
        date_format_py = '%Y-%m-%d' 
    else:
        date_format_py = '%a %d %b %Y' 
    return date_format_py

    
def generateTimeObj(time_str:str):
    date_format = SiteConstants.DATE_FORMAT
    date_format_py = generateDateFormatForPy(date_format)
    
    time_obj = datetime.strptime(time_str, date_format_py)
    return time_obj

def generateTimeStr(time:datetime):
    date_format = SiteConstants.DATE_FORMAT
    date_format_py = generateDateFormatForPy(date_format)
    date_str = datetime.strftime(time,date_format_py)
    return date_str

def generateTimeObjBackend(time_str:str):
    date_format = '%Y-%m-%dT%H:%M:%S%z'
    time_obj = datetime.strptime(time_str, date_format)
    return time_obj



