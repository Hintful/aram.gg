from django.http import HttpResponse
from django.views.generic import ListView

from .models import Users


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class ProfileView(ListView):
    model = Users
