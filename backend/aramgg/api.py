from typing import Dict, List

import requests

API_KEY = "RGAPI-1f479b8e-1c4b-400d-a871-b98ed6029f1f"
BASE_URL = "https://na1.api.riotgames.com"
PARAMS = {"api_key": API_KEY}


class RiotApiRequests:
    def __init__(self, summoner_name: str, request_limit: int = 10):
        self.summoner_name = summoner_name
        self.request_limit = request_limit

    def get_account_info(self) -> Dict:
        """ Get account information based on the summoner name """

        url = f"{BASE_URL}/lol/summoner/v4/summoners/by-name/{self.summoner_name}"
        request = requests.get(url=url, params=PARAMS)
        data = request.json()

        return {
            "account_id": data["accountId"],
            "profile_icon_id": data["profileIconId"],
            "summoner_level": data["summonerLevel"],
        }

    @staticmethod
    def get_match_list(account_id: str) -> List[int]:
        """ Get list of game IDs based on the summoner's account ID """

        url = f"{BASE_URL}/lol/match/v4/matchlists/by-account/{account_id}"
        request = requests.get(url=url, params=PARAMS)
        match_list = request.json()

        return [match["gameId"] for match in match_list["matches"]]

    @staticmethod
    def get_match_data(match_id: int) -> Dict:
        """ Get information about specific match based on the match ID """

        url = f"{BASE_URL}/lol/match/v4/matches/{match_id}"
        request = requests.get(url=url, params=PARAMS)
        data = request.json()

        return data

    def get_total_match_info(self) -> Dict:
        """ Return combined dictionary with relevant match information """

        aram_list = list()
        info_dict = self.get_account_info()
        match_list = self.get_match_list(account_id=info_dict["account_id"])

        for index, match in zip(range(self.request_limit), match_list):
            match_data = self.get_match_data(match)
            if match_data["gameMode"] == "ARAM":
                aram_list.append(match_data)

        info_dict["match_list"] = aram_list
        return info_dict


if __name__ == "__main__":
    riot_api = RiotApiRequests(summoner_name="juis", request_limit=10)
    info = riot_api.get_total_match_info()
    print(info)
