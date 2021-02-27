from django.db import models


class User(models.Model):
    username = models.CharField(max_length=40, null=False, blank=False, unique=True)
    level = models.IntegerField(null=False, blank=False)
    profile_icon = models.IntegerField(null=False, blank=False)
    champion = models.ManyToManyField("Champion")

    def __str__(self):
        return self.username


class Game(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    is_aram = models.BooleanField(default=False, null=False)
    user = models.ForeignKey("User", on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Champion(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name
