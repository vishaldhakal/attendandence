from rest_framework import serializers
from . import models


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = models.Attendance
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = models.User
        depth = 1
