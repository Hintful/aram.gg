from django.db import models


class User(models.Model):
    username = models.CharField(max_length=40, null=False, blank=False, unique=True)
    level = models.IntegerField(null=False, blank=False)
    profile_icon = models.IntegerField(null=False, blank=False)
    champion = models.ManyToManyField("Champion")
    last_updated = models.BigIntegerField(null=True, blank=True)
    account_id = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.username


class Champion(models.Model):
    champion_id = models.IntegerField(null=False, blank=False)
    win = models.IntegerField(default=0, null=False, blank=False)
    loss = models.IntegerField(default=0, null=False, blank=False)
    kill = models.IntegerField(default=0, null=False, blank=False)
    death = models.IntegerField(default=0, null=False, blank=False)
    assist = models.IntegerField(default=0, null=False, blank=False)
    total_damage_done = models.IntegerField(default=0, null=False, blank=False)
    total_damage_taken = models.IntegerField(default=0, null=False, blank=False)
    total_healing_done = models.IntegerField(default=0, null=False, blank=False)
    total_game_length = models.IntegerField(default=0, null=False, blank=False)

    def __str__(self):
        return self.champion_id
