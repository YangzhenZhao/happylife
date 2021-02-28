from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
import json
from .models import MyUser
from rest_framework.permissions import IsAuthenticated

class SignupView(APIView):
    def post(self, request):
        body_dict = json.loads(request.body.decode())
        print(body_dict)
        user = MyUser.objects.create_user(
            body_dict["username"],
            body_dict["password"],
            body_dict["email"],
            body_dict["addr"],
            body_dict["sex"],
            body_dict["hefengCityId"],
            body_dict["dateOfBirth"],
        )
        if user is not None:
            result = {
                "status": "200",
                "data": {
                    "msg": "success"
                }
            }
        else:
            result = {
                "status": "404",
                "data": {
                    "msg": "fail"
                }
            }
        return HttpResponse(json.dumps(result))


class HengFengCityId(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, username: str) -> str:
        user = MyUser.objects.get(username=username)
        return HttpResponse(user.hefeng_city_id)
