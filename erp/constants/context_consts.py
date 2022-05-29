from erp.constants.navbar_constants import Navbar
from erp.constants.site_constants import STATUS_KEYS, CompanyInfo


class ContextConsts:

    def dic():
        navbar = Navbar.makeList()
        company_info = CompanyInfo.model()

        return {
            "navbar": navbar,
            "company": company_info,
            "status_keys": STATUS_KEYS,
            "colors": {
                "danger": "bg-red-600 text-gray-200 hover:bg-red-500",
                "primary": "bg-blue-600 text-gray-200 hover:bg-blue-500",
                "success": "bg-green-600 text-gray-800 hover:bg-green-500",
                "light": "bg-gray-200 text-gray-800 hover:bg-gray-100",
                "dark": "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }
        }
