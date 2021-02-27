from aramgg.views import UserView
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"users", UserView, "user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("aramgg/", include(router.urls)),
]
