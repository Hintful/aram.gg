from django.db import models


class Users(models.Model):
    username = models.CharField(max_length=40, null=False, blank=False, unique=True)
    level = models.IntegerField(null=False, blank=False)
