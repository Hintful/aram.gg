from django.core.exceptions import ViewDoesNotExist, ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .api import RiotApiRequests
from .models import User, Champion
from .serializers import UserSerializer, ChampionSerializer


class UserView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionView(APIView):
    serializer_class = ChampionSerializer
    queryset = Champion.objects.all()


class UserDetailView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        try:
            return get_object_or_404(User, username__iexact=self.kwargs["username"])
        except Http404:
            raise ViewDoesNotExist(
                f"Selected user record for the user {self.kwargs['username']} does not exist. "
            )

    def get(self, request, *args, **kwargs):
        try:
            riot_api = RiotApiRequests(
                summoner_name=self.kwargs["username"], request_limit=10
            )
            riot_api.get_account_info()
            riot_api.get_total_match_info()
            user = User.objects.get(username__iexact=self.kwargs["username"])
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ChampionDetailView(APIView):
    serializer_class = ChampionSerializer
    queryset = User.objects.none()

    def get(self, request, *args, **kwargs):
        champions = get_list_or_404(
            Champion, user__username__iexact=self.kwargs["username"]
        )
        serializer = ChampionSerializer(champions, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        try:
            username = str(self.kwargs["username"])
            return get_object_or_404(Champion, user__username__iexact=username)
        except ValueError:
            raise ViewDoesNotExist(
                f"Selected champion record for the user {self.kwargs['username']} does not exist. "
            )
