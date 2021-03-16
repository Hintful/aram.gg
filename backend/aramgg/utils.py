import logging
from typing import List, Dict

from django.db import models
from django.db.models import Sum, F, ExpressionWrapper

from aramgg.models import Champion, User
from aramgg.serializers import UserSerializer
from log.trace_log import trace_log

logger = logging.getLogger(__name__)


@trace_log(logger)
def get_top_champs(num_champs: int, attribute: str, column_name: str) -> List:
    top_champs = list()
    annotate_attr = {attribute: Sum(column_name) / (Sum("win") + Sum("loss"))}
    filter_attr = {f"{attribute}__isnull": False}

    champion_data = (
        Champion.objects.values("champion_id")
        .annotate(**annotate_attr)
        .filter(**filter_attr)
        .order_by(f"-{attribute}")[:num_champs]
    )

    for i, champ in zip(range(len(champion_data)), champion_data):
        top_champs.append(
            {
                "champion_id": champ["champion_id"],
                attribute: champ[attribute],
            }
        )

    return top_champs


@trace_log(logger)
def get_top_users(
    num_users: int,
    attribute: str,
    column_name: str,
    is_based_on_avg: bool,
    min_game_req: int = 0,
    reverse: bool = False,
) -> List:
    top_users = list()
    annotate_attr = (
        get_annotate_attr_based_on_avg(attribute=attribute, column_name=column_name)
        if is_based_on_avg
        else get_annotate_attr_based_on_max(
            attribute=attribute, column_name=column_name
        )
    )
    filter_attr = {f"{attribute}__isnull": False}

    user_data = (
        User.objects.annotate(
            **annotate_attr, num_games=Sum("champion__win") + Sum("champion__loss")
        )
        .filter(**filter_attr)
        .filter(num_games__gte=min_game_req)
        .order_by(
            f"-{attribute}",
            "username" if not reverse else f"{attribute}",
            "username",
            "-level",
        )[:num_users]
    )

    for i, user in zip(range(len(user_data)), user_data):
        user_serializer = UserSerializer(user)
        if is_based_on_avg:
            top_users.append(
                {
                    "user": user_serializer.data,
                    attribute: getattr(user, attribute),
                }
            )
        else:
            top_users.append(
                {
                    "user": user_serializer.data,
                    attribute: getattr(user, attribute),
                    "champion_id": user.champion_id,
                }
            )

    return top_users


@trace_log(logger)
def get_annotate_attr_based_on_avg(attribute: str, column_name: str) -> Dict:
    return {
        attribute: ExpressionWrapper(
            (Sum(f"champion__{column_name}"))
            * 1.0
            / (Sum("champion__win") + Sum("champion__loss")),
            output_field=models.FloatField(),
        )
    }


@trace_log(logger)
def get_annotate_attr_based_on_max(attribute: str, column_name: str) -> Dict:
    return {
        attribute: F(f"champion__{column_name}"),
        "champion_id": F("champion__champion_id"),
    }
