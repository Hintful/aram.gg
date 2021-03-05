from django.core.exceptions import ViewDoesNotExist
from rest_framework import generics

from .models import User, Champion
from .serializers import UserSerializer, ChampionSerializer


class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionView(generics.ListAPIView):
    serializer_class = ChampionSerializer
    queryset = Champion.objects.all()


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionDetailView(generics.RetrieveAPIView):
    serializer_class = ChampionSerializer
    queryset = User.objects.none()

    def get_queryset(self):
        try:
            champion_id = str(self.kwargs["champion_id"])
            return Champion.objects.filter(champion_id=champion_id)
        except ValueError:
            raise ViewDoesNotExist(
                f"Selected champion record for the user does not exist. "
            )
