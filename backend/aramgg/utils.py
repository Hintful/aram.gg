from typing import List, Dict

from django.db.models import Sum, F

from aramgg.models import Champion, User
from aramgg.serializers import UserSerializer


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


def get_top_users(
    num_users: int, attribute: str, column_name: str, is_based_on_avg: bool
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
        User.objects.annotate(**annotate_attr)
        .filter(**filter_attr)
        .order_by(f"-{attribute}")[:num_users]
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


def get_annotate_attr_based_on_avg(attribute: str, column_name: str) -> Dict:
    return {
        attribute: Sum(f"champion__{column_name}")
        / (Sum("champion__win") + Sum("champion__loss"))
    }


def get_annotate_attr_based_on_max(attribute: str, column_name: str) -> Dict:
    return {
        attribute: F(f"champion__{column_name}"),
        "champion_id": F("champion__champion_id"),
    }
