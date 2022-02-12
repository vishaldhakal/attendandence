from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from django.contrib import auth
from .models import Attendance
from .serializers import UserSerializer, AttendanceSerializer
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(["POST"])
def register(request):
    if request.method == "POST":
        # get form values
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        password2 = request.POST["password2"]

        # Checking
        if password == password2:
            # check username
            if User.objects.filter(username=username).exists():
                return JsonResponse(
                    {"error": "Username Already Exists"}, status=status.HTTP_400_BAD_REQUEST
                )
            else:
                if User.objects.filter(email=email).exists():
                    return JsonResponse(
                        {"error": "Email Already Exists"}, status=status.HTTP_400_BAD_REQUEST
                    )
                else:
                    user = User.objects.create_user(
                        username=username, password=password, email=email)
                    user.save()
                    return JsonResponse(
                        {"success": "Sucessfully Created Employee"}
                    )
        else:
            return JsonResponse(
                {"error": "Password and Confirm password Doesnot Match"}, status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return JsonResponse(
            {"error": "Not Post Request"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_attendance(request):
    userr = User.objects.get(id=request.user.id)
    attendances_list = Attendance.objects.filter(user=userr)
    attendances_list_serialized = AttendanceSerializer(
        attendances_list, many=True)
    return Response({"attendance_data": attendances_list_serialized.data})


@api_view(["POST"])
def submit_direct(request):
    username = request.POST["username"]
    password = request.POST["password"]
    userr = User.objects.get(username=username, password=password)

    return Response({"attendance_data": "haha"})
