from statistics import mode
from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Attendance(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    checked_in = models.BooleanField(default=False)
    checked_out = models.BooleanField(default=False)
    datee = models.DateTimeField(auto_now=False, auto_now_add=True)
    checked_in_time = models.TimeField(auto_now=False, auto_now_add=False)
    checked_out_time = models.TimeField(auto_now=False, auto_now_add=False)
    review = models.TextField(blank=True)

    def __str__(self):
        return self.name
