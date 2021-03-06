from django.core.exceptions import ViewDoesNotExist, ObjectDoesNotExist
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.db import models
from django.db.models import Sum, ExpressionWrapper

from .api import RiotApiRequests
from .models import User, Champion
from .serializers import UserSerializer, ChampionSerializer
from .utils import get_top_champs, get_top_users

MIN_GAME_REQ = 20  # minimum number of games required to be in average based rankings


class UserView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChampionView(APIView):
    serializer_class = ChampionSerializer
    queryset = Champion.objects.all()


class BaseRankingAPIView(APIView):
    num_champs: int = None
    num_users: int = None
    attribute: str = None
    column_name: str = None
    is_based_one_avg: bool = None

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        derived_class_name = self.__class__.__name__.lower()
        if "champ" in derived_class_name:
            self.is_champ_ranking = True
        else:
            self.is_champ_ranking = False

    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        if self.is_champ_ranking:
            top_list = get_top_champs(
                num_champs=self.num_champs,
                attribute=self.attribute,
                column_name=self.column_name,
            )
        else:
            top_list = get_top_users(
                num_users=self.num_users,
                attribute=self.attribute,
                column_name=self.column_name,
                is_based_on_avg=self.is_based_one_avg,
                min_game_req=self.min_game_req if hasattr(self, "min_game_req") else 0,
                reverse=self.reverse if hasattr(self, "reverse") else False,
            )

        return Response(top_list)


class RankingChampWithMostKill(BaseRankingAPIView):
    queryset = Champion.objects.all()
    num_champs = 3
    attribute = "avg_kill"
    column_name = "kill"


class RankingChampWithMostAssist(BaseRankingAPIView):
    queryset = Champion.objects.all()
    num_champs = 3
    attribute = "avg_assist"
    column_name = "assist"


class RankingChampWithMostDeath(BaseRankingAPIView):
    queryset = Champion.objects.all()
    num_champs = 3
    attribute = "avg_death"
    column_name = "death"


class RankingMostDamageDoneInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "damage_done"
    column_name = "most_damage_done"
    is_based_one_avg = False


class RankingMostDamageTakenInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "damage_taken"
    column_name = "most_damage_taken"
    is_based_one_avg = False


class RankingMostHealingDoneInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "healing_done"
    column_name = "most_healing_done"
    is_based_one_avg = False


class RankingMostKillInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "max_kill"
    column_name = "num_max_kill"
    is_based_one_avg = False


class RankingMostAssistInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "max_assist"
    column_name = "num_max_assist"
    is_based_one_avg = False


class RankingMostDeathInAGameView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "max_death"
    column_name = "num_max_death"
    is_based_one_avg = False


class RankingMostAverageKillView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "avg_kill"
    column_name = "kill"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class Top50MostAverageKillView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "avg_kill"
    column_name = "kill"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class RankingMostAverageAssistView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "avg_assist"
    column_name = "assist"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class Top50MostAverageAssistView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "avg_assist"
    column_name = "assist"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class RankingMostAverageDeathView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "avg_death"
    column_name = "death"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class Top50MostAverageDeathView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "avg_death"
    column_name = "death"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ


class RankingLeastAverageDeathView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 3
    attribute = "avg_death"
    column_name = "death"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ
    reverse = True


class Top50LeastAverageDeathView(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "avg_death"
    column_name = "death"
    is_based_one_avg = True
    min_game_req = MIN_GAME_REQ
    reverse = True


class Top50MostKillsInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "max_kill"
    column_name = "num_max_kill"
    is_based_one_avg = False


class Top50MostDeathsInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "max_death"
    column_name = "num_max_death"
    is_based_one_avg = False


class Top50MostAssistsInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "max_assist"
    column_name = "num_max_assist"
    is_based_one_avg = False


class Top50MostDamageDoneInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "damage_done"
    column_name = "most_damage_done"
    is_based_one_avg = False


class Top50MostDamageTakenInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "damage_taken"
    column_name = "most_damage_taken"
    is_based_one_avg = False


class Top50MostHealingDoneInOneGame(BaseRankingAPIView):
    queryset = User.objects.all()
    num_users = 50
    attribute = "healing_done"
    column_name = "most_healing_done"
    is_based_one_avg = False


class RankingMostAvgEDView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        ranking = []
        avg_ed_user_data = (
            User.objects.annotate(
                avg_ed=ExpressionWrapper(
                    (
                        (
                            Sum("champion__total_damage_done") * 1.0
                            + Sum("champion__total_healing_done")
                        )
                        / Sum("champion__total_game_length")
                        * 60
                    ),
                    output_field=models.FloatField(),
                ),
                num_games=Sum("champion__win") + Sum("champion__loss"),
            )
            .filter(avg_ed__isnull=False)
            .filter(num_games__gte=MIN_GAME_REQ)
            .order_by("-avg_ed", "-level")[:3]
        )

        for i, user in zip(range(len(avg_ed_user_data)), avg_ed_user_data):
            user_serializer = UserSerializer(user)
            ranking.append({"user": user_serializer.data, "avg_ed": user.avg_ed})

        return Response(ranking)


class Top50MostAvgEDView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        ranking = []
        avg_ed_user_data = (
            User.objects.annotate(
                avg_ed=ExpressionWrapper(
                    (
                        (
                            Sum("champion__total_damage_done") * 1.0
                            + Sum("champion__total_healing_done")
                        )
                        / Sum("champion__total_game_length")
                        * 60
                    ),
                    output_field=models.FloatField(),
                ),
                num_games=Sum("champion__win") + Sum("champion__loss"),
            )
            .filter(avg_ed__isnull=False)
            .filter(num_games__gte=MIN_GAME_REQ)
            .order_by("-avg_ed", "-level")[:50]
        )

        for i, user in zip(range(len(avg_ed_user_data)), avg_ed_user_data):
            user_serializer = UserSerializer(user)
            ranking.append({"user": user_serializer.data, "avg_ed": user.avg_ed})

        return Response(ranking)


class RankingMostAvgKDAView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        ranking = []
        avg_ed_user_data = (
            User.objects.annotate(
                avg_kda=ExpressionWrapper(
                    (
                        (Sum("champion__kill") * 1.0 + Sum("champion__assist") * 1.0)
                        / ((Sum("champion__death") * 1.0))
                    ),
                    output_field=models.FloatField(),
                ),
                num_games=Sum("champion__win") + Sum("champion__loss"),
            )
            .filter(avg_kda__isnull=False)
            .filter(num_games__gte=MIN_GAME_REQ)
            .order_by("-avg_kda", "-level")[:3]
        )

        for i, user in zip(range(len(avg_ed_user_data)), avg_ed_user_data):
            user_serializer = UserSerializer(user)
            ranking.append({"user": user_serializer.data, "avg_kda": user.avg_kda})

        return Response(ranking)


class Top50MostAvgKDAView(APIView):
    queryset = User.objects.all()

    @staticmethod
    def get(request, *args, **kwargs):
        ranking = []
        avg_ed_user_data = (
            User.objects.annotate(
                avg_kda=ExpressionWrapper(
                    (
                        (Sum("champion__kill") * 1.0 + Sum("champion__assist") * 1.0)
                        / ((Sum("champion__death") * 1.0))
                    ),
                    output_field=models.FloatField(),
                ),
                num_games=Sum("champion__win") + Sum("champion__loss"),
            )
            .filter(avg_kda__isnull=False)
            .filter(num_games__gte=MIN_GAME_REQ)
            .order_by("-avg_kda", "-level")[:50]
        )

        for i, user in zip(range(len(avg_ed_user_data)), avg_ed_user_data):
            user_serializer = UserSerializer(user)
            ranking.append({"user": user_serializer.data, "avg_kda": user.avg_kda})

        return Response(ranking)


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
