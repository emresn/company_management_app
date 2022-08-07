from urllib.request import Request
from django.http import JsonResponse


def json_error_msg(request: Request):
    return JsonResponse({
        "message": "Error",
    })
