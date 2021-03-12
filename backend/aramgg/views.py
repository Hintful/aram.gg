from django.core.exceptions import ViewDoesNotExist, ObjectDoesNotExist
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .api import RiotApiRequests
from .models import User, Champion
from .serializers import UserSerializer, ChampionSerializer
from .utils import get_top_champs, get_top_users


class UserView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionView(APIView):
    serializer_class = ChampionSerializer
    queryset = Champion.objects.all()


class RankingChampWithMostKill(APIView):
    queryset = Champion.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_champs = get_top_champs(
            num_champs=3, attribute="avg_kill", column_name="kill"
        )
        return Response(top_champs)


class RankingChampWithMostAssist(APIView):
    queryset = Champion.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_champs = get_top_champs(
            num_champs=3, attribute="avg_assist", column_name="assist"
        )
        return Response(top_champs)


class RankingChampWithMostDeath(APIView):
    queryset = Champion.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_champs = get_top_champs(
            num_champs=3, attribute="avg_death", column_name="death"
        )
        return Response(top_champs)


class RankingMostDamageDoneInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="damage_done",
            column_name="most_damage_done",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostDamageTakenInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="damage_taken",
            column_name="most_damage_taken",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostHealingDoneInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="healing_done",
            column_name="most_healing_done",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostKillInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="max_kill",
            column_name="num_max_kill",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostAssistInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="max_assist",
            column_name="num_max_assist",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostDeathInAGameView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="max_death",
            column_name="num_max_death",
            is_based_on_avg=False,
        )
        return Response(top_users)


class RankingMostAverageKillView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3, attribute="avg_kill", column_name="kill", is_based_on_avg=True
        )
        return Response(top_users)


class RankingMostAverageAssistView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="avg_assist",
            column_name="assist",
            is_based_on_avg=True,
        )
        return Response(top_users)


class RankingMostAverageDeathView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=3,
            attribute="avg_death",
            column_name="death",
            is_based_on_avg=True,
        )
        return Response(top_users)


class Top50MostKillsInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="max_kill",
            column_name="num_max_kill",
            is_based_on_avg=False,
        )
        return Response(top_users)


class Top50MostDeathsInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="max_death",
            column_name="num_max_death",
            is_based_on_avg=False,
        )
        return Response(top_users)


class Top50MostAssistsInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="max_assist",
            column_name="num_max_assist",
            is_based_on_avg=False,
        )
        return Response(top_users)


class Top50MostDamageDoneInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="damage_done",
            column_name="most_damage_done",
            is_based_on_avg=False,
        )
        return Response(top_users)


class Top50MostDamageTakenInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="damage_taken",
            column_name="most_damage_taken",
            is_based_on_avg=False,
        )
        return Response(top_users)


class Top50MostHealingDoneInOneGame(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        top_users = get_top_users(
            num_users=50,
            attribute="healing_done",
            column_name="most_healing_done",
            is_based_on_avg=False,
        )
        return Response(top_users)


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

    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
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

    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        username = self.kwargs["username"]
        champions = get_list_or_404(Champion, user__username__exact=username)
        serializer = ChampionSerializer(champions, many=True)
        return Response(serializer.data)
