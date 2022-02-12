from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('submit-attendance-direct/', views.submit_direct, name='submit_direct'),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
]
