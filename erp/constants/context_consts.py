from erp.constants.navbar_constants import Navbar
from erp.constants.site_constants import CompanyInfo


class ContextConsts:

    def dic():
        navbar = Navbar.makeList()
        company_info = CompanyInfo.model()

        return {
            "navbar": navbar,
            "company": company_info
        }
