from rest_framework import serializers

from .models import User, Champion


class UserSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = "__all__"


class ChampionSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(ChampionSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Champion
        fields = "__all__"
