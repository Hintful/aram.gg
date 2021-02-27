from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<slug:username>", views.ProfileView.as_view(), name="user_profile"),
]
