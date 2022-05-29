from audioop import add
from erp.constants.navbar_constants import Navbar


class SiteConstants:
    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'Europe/Istanbul'

    COMPANY_NAME = 'COMPANY'
    COMPANY_DESCRIPTION = 'A Company build Erp systems'
    COMPANY_ADDRESS = '''
    2211 Pleasant Grove Trl SW
    Cleveland, Tennessee(TN), 37311
    '''
    COMPANY_TEL = '(423) 476-1220'
    COMPANY_EMAIL = ''


class CompanyInfo:
    def __init__(self, name, description, address, tel, email):
        self.name = name
        self.desc = description
        self.address = address
        self.tel = tel
        self.email = email

    def model():
        company = CompanyInfo(
            name=SiteConstants.COMPANY_NAME,
            description=SiteConstants.COMPANY_DESCRIPTION,
            address=SiteConstants.COMPANY_ADDRESS,
            tel=SiteConstants.COMPANY_TEL,
            email=SiteConstants.COMPANY_EMAIL,
        )

        return company


STATUS_KEYS = {
    "NOT_STARTED": {"key": "NS", "value": 'Not Started'},
    "IN_PROGRESS": {"key": "IP", "value": 'In Progress'},
    "COMPLETED": {"key": "CP", "value":  'Completed'},
    "DELIVERED": {"key": "DE", "value":  'Delivered'},
    "RETURNED_BACK": {"key": "RB", "value": 'Returned Back'},
    "CANCELLED": {"key": "CA", "value":  'Cancelled'},
}


class Status():
    def tolist():
        CHOICES = [
            (STATUS_KEYS['NOT_STARTED']['key'], STATUS_KEYS['NOT_STARTED']['value']),
            (STATUS_KEYS['IN_PROGRESS']['key'], STATUS_KEYS['IN_PROGRESS']['value']),
            (STATUS_KEYS['COMPLETED']['key'], STATUS_KEYS['COMPLETED']['value']),
            (STATUS_KEYS['DELIVERED']['key'], STATUS_KEYS['DELIVERED']['value']),
            (STATUS_KEYS['RETURNED_BACK']['key'], STATUS_KEYS['RETURNED_BACK']['value']),
            (STATUS_KEYS['CANCELLED']['key'], STATUS_KEYS['CANCELLED']['value'])
        ]
        return CHOICES