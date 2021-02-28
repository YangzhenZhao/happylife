from django.contrib import admin
from django.urls import path
from .views import SignupView, HengFengCityId

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('hefeng_city_id/<username>', HengFengCityId.as_view(), name='hefeng_city_id'),
]
