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
