from django.db import models


class User(models.Model):
    username = models.CharField(max_length=40, null=False, blank=False, unique=True)
    level = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.username
