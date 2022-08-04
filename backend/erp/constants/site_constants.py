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
    CURRENCY = '$'
    # DATE_FORMAT should be "DD-MM-YYYY", "YYYY-MM-DD" or "D d M, Y"
    DATE_FORMAT= "D d M, Y"
    VAT = 18


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
    def toList():
        CHOICES = []
        keylist = STATUS_KEYS.keys()
        for i in keylist:
            CHOICES.append((STATUS_KEYS[i]['key'], STATUS_KEYS[i]['value']))
        return CHOICES