import logging
import os
from typing import Dict, List, Any

import django
from requests import Response
from rest_framework import status

from aramgg.config import RIOT_API_KEY
from aramgg.exceptions import SummonerNotFoundException, RateLimitExceededException
from log.trace_log import trace_log

os.environ["DJANGO_SETTINGS_MODULE"] = "backend.local_settings"
django.setup()

import requests
from aramgg.models import Champion, User

BASE_URL = "https://na1.api.riotgames.com"
PARAMS = {"api_key": RIOT_API_KEY}

logger = logging.getLogger(__name__)


class RiotApiRequests:
    def __init__(self, summoner_name: str, request_limit: int = 10):
        self.summoner_name = summoner_name
        self.request_limit = request_limit

    @trace_log(logger)
    def check_rate_limit(self, request: Response) -> None:
        if request.status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            raise RateLimitExceededException(
                f"Rate limit exceeded with summoner name: {self.summoner_name}"
            )

    @trace_log(logger)
    def check_if_summoner_exists(self, request: Response) -> None:
        if request.status_code == status.HTTP_404_NOT_FOUND:
            raise SummonerNotFoundException(f"Summoner not found: {self.summoner_name}")

    @trace_log(logger)
    def get_account_info(self) -> User:
        """ Get account information based on the summoner name """

        url = f"{BASE_URL}/lol/summoner/v4/summoners/by-name/{self.summoner_name}"
        request = requests.get(url=url, params=PARAMS)
        self.check_rate_limit(request)
        self.check_if_summoner_exists(request)

        data = request.json()
        User.objects.update_or_create(
            username=data["name"].replace(" ", "").lower(),
            defaults={
                "profile_icon": data["profileIconId"],
                "account_id": data["accountId"],
                "level": data["summonerLevel"],
            },
        )

        return User.objects.get(username=self.summoner_name)

    @trace_log(logger)
    def get_match_list(self, user: User) -> List[Dict[str, int]]:
        """ Get list of game IDs and timestamps based on the summoner's account ID """

        url = f"{BASE_URL}/lol/match/v4/matchlists/by-account/{user.account_id}"
        request = requests.get(url=url, params=PARAMS)
        self.check_rate_limit(request)
        match_list = request.json()
        final_list = list()
        final_list = [
            {"gameId": match["gameId"], "timestamp": match["timestamp"]}
            for match in match_list["matches"]
        ]
        final_list = sorted(final_list, key=lambda k: k["timestamp"])

        # If user already has a record of timestamp,
        # only get game records that happened after given timestamp
        if user.last_updated is not None:
            final_list = list(
                filter(
                    lambda element: element["timestamp"] > user.last_updated,
                    final_list,
                )
            )

        return final_list

    @trace_log(logger)
    def update_user_champion_info(self, user: User, data: Dict) -> None:
        participant_identity_list = data["participantIdentities"]
        participant_id = None

        for identity in participant_identity_list:
            if identity["player"]["currentAccountId"] == user.account_id:
                participant_id = identity["participantId"]
                break

        # Get the match information about the user
        participant_info = next(
            participant
            for participant in data["participants"]
            if participant["participantId"] == participant_id
        )
        participant_stats = participant_info["stats"]
        # Get or create champion records and update relative fields
        champion, created = Champion.objects.get_or_create(
            champion_id=participant_info["championId"], user=user
        )
        if participant_stats["win"]:
            champion.win += 1
        else:
            champion.loss += 1

        self.update_max_record(
            champion=champion,
            attribute="largest_killing_spree",
            new_val=participant_stats["largestKillingSpree"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_kill",
            new_val=participant_stats["kills"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_assist",
            new_val=participant_stats["assists"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_death",
            new_val=participant_stats["deaths"],
        )
        self.update_max_record(
            champion=champion,
            attribute="most_gold_spent",
            new_val=participant_stats["goldSpent"],
        )
        self.update_max_record(
            champion=champion,
            attribute="most_gold_earned",
            new_val=participant_stats["goldEarned"],
        )
        self.update_max_record(
            champion=champion,
            attribute="most_damage_done",
            new_val=participant_stats["totalDamageDealtToChampions"],
        )
        self.update_max_record(
            champion=champion,
            attribute="most_damage_taken",
            new_val=participant_stats["totalDamageTaken"],
        )
        self.update_max_record(
            champion=champion,
            attribute="most_healing_done",
            new_val=participant_stats["totalHeal"],
        )
        self.update_max_record(
            champion=champion,
            attribute="longest_game_length",
            new_val=data["gameDuration"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_double_kill",
            new_val=participant_stats["doubleKills"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_triple_kill",
            new_val=participant_stats["tripleKills"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_quadra_kill",
            new_val=participant_stats["quadraKills"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_penta_kill",
            new_val=participant_stats["pentaKills"],
        )
        self.update_max_record(
            champion=champion,
            attribute="num_max_legendary_kill",
            new_val=participant_stats["unrealKills"],
        )

        champion.num_double_kill += participant_stats["doubleKills"]
        champion.num_triple_kill += participant_stats["tripleKills"]
        champion.num_quadra_kill += participant_stats["quadraKills"]
        champion.num_penta_kill += participant_stats["pentaKills"]
        champion.num_legendary_kill += participant_stats["unrealKills"]
        champion.total_gold_spent += participant_stats["goldSpent"]
        champion.total_gold_earned += participant_stats["goldEarned"]
        champion.total_game_length += data["gameDuration"]
        champion.total_damage_done += participant_stats["totalDamageDealtToChampions"]
        champion.total_healing_done += participant_stats["totalHeal"]
        champion.total_damage_taken += participant_stats["totalDamageTaken"]
        champion.kill += participant_stats["kills"]
        champion.death += participant_stats["deaths"]
        champion.assist += participant_stats["assists"]
        champion.save()

    @staticmethod
    @trace_log(logger)
    def update_max_record(champion: Champion, attribute: str, new_val: Any) -> None:
        """Replace original value to new value if new value is greater than the original val"""

        original_val = getattr(champion, attribute)
        update_val = new_val if original_val < new_val else original_val
        setattr(champion, attribute, update_val)
        champion.save()

    @trace_log(logger)
    def get_match_data(self, match_id: int) -> Dict:
        """ Get information about specific match based on the match ID """

        url = f"{BASE_URL}/lol/match/v4/matches/{match_id}"
        request = requests.get(url=url, params=PARAMS)
        self.check_rate_limit(request)
        data = request.json()

        return data

    @trace_log(logger)
    def get_total_match_info(self) -> List:
        """ Return combined dictionary with relevant match information """

        aram_list = list()
        user = self.get_account_info()
        match_list = self.get_match_list(user=user)

        for index, match in zip(range(self.request_limit), match_list):
            match_data = self.get_match_data(match_id=match["gameId"])
            if match_data["gameMode"] == "ARAM":
                aram_list.append(match_data)
                self.update_user_champion_info(user=user, data=match_data)
            timestamp = match_data["gameCreation"]
            user.last_updated = (
                timestamp
                if (user.last_updated is None or timestamp > user.last_updated)
                else user.last_updated
            )
            user.save()

        return aram_list


if __name__ == "__main__":
    riot_api = RiotApiRequests(summoner_name="juis", request_limit=10)
    total_match_info = riot_api.get_total_match_info()
