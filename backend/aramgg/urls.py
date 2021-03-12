from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path("rest_api/users", views.UserView.as_view(), name="rest_api_user"),
    path("rest_api/champions", views.ChampionView.as_view(), name="rest_api_champion"),
    path(
        "rest_api/user_detail/<slug:username>/",
        views.UserDetailView.as_view(),
        name="rest_api_user_detail",
    ),
    path(
        "rest_api/user_champion/<slug:username>/",
        views.ChampionDetailView.as_view(),
        name="rest_api_user_champion",
    ),
    path(
        "rest_api/ranking/most_avg_kill/",
        views.RankingMostAverageKillView.as_view(),
        name="rest_api_ranking_most_avg_kill",
    ),
    path(
        "rest_api/ranking/most_avg_death/",
        views.RankingMostAverageDeathView.as_view(),
        name="rest_api_ranking_most_avg_death",
    ),
    path(
        "rest_api/ranking/most_avg_assist/",
        views.RankingMostAverageAssistView.as_view(),
        name="rest_api_ranking_most_avg_assist",
    ),
    path(
        "rest_api/ranking/most_kill_in_one_game/",
        views.RankingMostKillInAGameView.as_view(),
        name="rest_api_ranking_most_avg_kill",
    ),
    path(
        "rest_api/ranking/most_death_in_one_game/",
        views.RankingMostDeathInAGameView.as_view(),
        name="rest_api_ranking_most_avg_assist",
    ),
    path(
        "rest_api/ranking/most_assist_in_one_game/",
        views.RankingMostAssistInAGameView.as_view(),
        name="rest_api_ranking_most_avg_death",
    ),
    path(
        "rest_api/ranking/most_damage_done_in_one_game/",
        views.RankingMostDamageDoneInAGameView.as_view(),
        name="rest_api_ranking_most_damage_done",
    ),
    path(
        "rest_api/ranking/most_damage_taken_in_one_game/",
        views.RankingMostDamageTakenInAGameView.as_view(),
        name="rest_api_ranking_most_damage_taken",
    ),
    path(
        "rest_api/ranking/most_healing_done_in_one_game/",
        views.RankingMostHealingDoneInAGameView.as_view(),
        name="rest_api_ranking_most_healing_done",
    ),
    path(
        "rest_api/ranking/champ_with_most_kill/",
        views.RankingChampWithMostKill.as_view(),
        name="rest_api_ranking_champ_with_most_kill",
    ),
    path(
        "rest_api/ranking/champ_with_most_assist/",
        views.RankingChampWithMostAssist.as_view(),
        name="rest_api_ranking_champ_with_most_assist",
    ),
    path(
        "rest_api/ranking/champ_with_most_death/",
        views.RankingChampWithMostDeath.as_view(),
        name="rest_api_ranking_champ_with_most_death",
    ),

    path(
        "rest_api/ranking/top50_most_kills_in_one_game/",
        views.Top50MostKillsInOneGame.as_view(),
        name="rest_api_top50_most_kills_in_one_game"
    ),
    path(
        "rest_api/ranking/top50_most_deaths_in_one_game/",
        views.Top50MostDeathsInOneGame.as_view(),
        name="rest_api_top50_most_deaths_in_one_game"
    ),
    path(
        "rest_api/ranking/top50_most_assists_in_one_game/",
        views.Top50MostAssistsInOneGame.as_view(),
        name="rest_api_top50_most_assists_in_one_game"
    )
]

urlpatterns = format_suffix_patterns(urlpatterns)
