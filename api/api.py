import requests


def main():
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/juis"
    api_key = "RGAPI-66c4b81c-e4e7-409c-bd29-b4c90526d3ec"
    params = {"api_key": api_key}
    r = requests.get(url=url, params=params)
    data = r.json()

    print(data)


if __name__ == '__main__':
    main()
