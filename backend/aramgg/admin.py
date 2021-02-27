from django.contrib import admin

from .models import User


class AramggAdmin(admin.ModelAdmin):
    list_display = ("username", "level")


admin.site.register(User, AramggAdmin)
