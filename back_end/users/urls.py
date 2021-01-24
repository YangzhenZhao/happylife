from django.contrib import admin
from django.urls import path
from .views import SignupView, hefeng_city_id

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('hefeng_city_id/<username>', hefeng_city_id, name='hefeng_city_id'),
]
