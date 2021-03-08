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
        "rest_api/ranking/most_kill/",
        views.RankingMostKillView.as_view(),
        name="rest_api_ranking_most_kill",
    ),
    path(
        "rest_api/ranking/most_death/",
        views.RankingMostDeathView.as_view(),
        name="rest_api_ranking_most_death",
    ),
    path(
        "rest_api/ranking/most_assist/",
        views.RankingMostAssistView.as_view(),
        name="rest_api_ranking_most_assist",
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
