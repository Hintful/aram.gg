import requests

API_KEY = "RGAPI-66c4b81c-e4e7-409c-bd29-b4c90526d3ec"
params = {"api_key": API_KEY}

def get_account_id(summoner_name):
# def getAccountID(summmoner_name):
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
    
    r = requests.get(url=url, params=params)
    data = r.json()

    return {"accountId": data["accountId"], "profileIconId": data["profileIconId"], "summonerLevel": data["summonerLevel"]}

def get_matchlist(accountId):
    url = f"https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/{accountId}"
    r = requests.get(url=url, params=params)
    data = r.json()

    return data

def get_match(matchId):
    url = f"https://na1.api.riotgames.com/lol/match/v4/matches/{matchId}"
    r = requests.get(url=url, params=params)
    data = r.json()

    return data


if __name__ == '__main__':
    account_info = (get_account_id('JuIs'))
    matchlist = list(map(lambda x: x["gameId"], get_matchlist(account_info["accountId"])["matches"]))
    # print(matchlist[0])

    match_datas = []
    for match in matchlist:
        match_data = get_match(match)
        if(match_data["gameMode"] == "ARAM"):
            print(match_data)
            break
            match_datas.append(match_data)
    
    # print(match_datas[0])
    
    


