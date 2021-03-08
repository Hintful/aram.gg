# Generated by Django 3.1.7 on 2021-03-08 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aramgg", "0007_auto_20210308_2018"),
    ]

    operations = [
        migrations.AddField(
            model_name="champion",
            name="longest_game_length",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="most_damage_done",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="most_damage_taken",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="most_gold_earned",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="most_gold_spent",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="most_healing_done",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_assist",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_death",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_double_kill",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_legendary_kill",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_penta_kill",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_quadra_kill",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="champion",
            name="num_max_triple_kill",
            field=models.IntegerField(default=0),
        ),
    ]
