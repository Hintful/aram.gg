# Generated by Django 3.1.7 on 2021-03-08 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aramgg", "0005_auto_20210308_0302"),
    ]

    operations = [
        migrations.AddField(
            model_name="champion",
            name="num_max_kill",
            field=models.IntegerField(default=0),
        ),
    ]