from django.core.exceptions import ViewDoesNotExist
from rest_framework import generics

from .models import User, Champion
from .serializers import UserSerializer, ChampionSerializer


class BaseAPIView(generics.ListAPIView):
    @classmethod
    def get_extra_actions(cls):
        return []


class UserView(BaseAPIView, generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionView(BaseAPIView, generics.ListAPIView):
    serializer_class = ChampionSerializer
    queryset = Champion.objects.all()


class UserDetailView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionDetailView(generics.ListAPIView):
    serializer_class = ChampionSerializer
    queryset = User.objects.none()

    def get_queryset(self):
        try:
            username = int(self.kwargs["username"])
            return Champion.objects.filter(user__username__iexact=username)
        except ValueError:
            raise ViewDoesNotExist(
                f"Selected champion record for the user does not exist. "
            )
