docker exec -it aramgg_api_1 python manage.py makemigrations
docker exec -it aramgg_api_1 python manage.py migrate --fake aramgg zero
docker exec -it aramgg_api_1 python manage.py migrate
