from django.core.exceptions import ViewDoesNotExist, ObjectDoesNotExist
from django.db.models import Sum
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


class RankingMostKillView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        top_three = list()
        max_kill_user_data = User.objects.annotate(
            avg_kill_per_game=Sum("champion__kill")
            / (Sum("champion__win") + Sum("champion__loss"))
        ).order_by("-avg_kill_per_game")[:3]

        for i, user in zip(range(len(max_kill_user_data)), max_kill_user_data):
            user_serializer = UserSerializer(user)
            top_three.append(
                {
                    f"{i+1}": {
                        "user": user_serializer.data,
                        "avg_kill": user.avg_kill_per_game,
                    }
                }
            )

        return Response(top_three)


class RankingMostAssistView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        top_three = list()
        max_assist_user_data = User.objects.annotate(
            avg_assist_per_game=Sum("champion__assist")
            / (Sum("champion__win") + Sum("champion__loss"))
        ).order_by("-avg_assist_per_game")[:3]

        for i, user in zip(range(len(max_assist_user_data)), max_assist_user_data):
            user_serializer = UserSerializer(user)
            top_three.append(
                {
                    f"{i+1}": {
                        "user": user_serializer.data,
                        "avg_assist": user.avg_assist_per_game,
                    }
                }
            )

        return Response(top_three)


class RankingMostDeathView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        top_three = list()
        max_death_user_data = User.objects.annotate(
            avg_death_per_game=Sum("champion__death")
            / (Sum("champion__win") + Sum("champion__loss"))
        ).order_by("-avg_death_per_game")[:3]

        for i, user in zip(range(len(max_death_user_data)), max_death_user_data):
            user_serializer = UserSerializer(user)
            top_three.append(
                {
                    f"{i+1}": {
                        "user": user_serializer.data,
                        "avg_death": user.avg_death_per_game,
                    }
                }
            )

        return Response(top_three)


class UserDetailView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        try:
            return get_object_or_404(User, username__exact=self.kwargs["username"])
        except Http404:
            raise ViewDoesNotExist(
                f"Selected user record for the user {self.kwargs['username']} does not exist. "
            )

    def get(self, request, *args, **kwargs):
        username = self.kwargs["username"]
        try:
            riot_api = RiotApiRequests(summoner_name=username, request_limit=10)
            riot_api.get_account_info()
            riot_api.get_total_match_info()
            user = User.objects.get(username__exact=username)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(data=username, status=status.HTTP_404_NOT_FOUND)


class ChampionDetailView(APIView):
    serializer_class = ChampionSerializer
    queryset = User.objects.none()

    def get_queryset(self):
        username = str(self.kwargs["username"])
        try:
            return get_object_or_404(Champion, user__username__exact=username)
        except ValueError:
            raise ViewDoesNotExist(
                f"Selected champion record for the user {username} does not exist. "
            )

    def get(self, request, *args, **kwargs):
        username = self.kwargs["username"]
        champions = get_list_or_404(Champion, user__username__exact=username)
        serializer = ChampionSerializer(champions, many=True)
        return Response(serializer.data)
