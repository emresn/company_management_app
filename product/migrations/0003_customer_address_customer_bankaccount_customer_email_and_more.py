# Generated by Django 4.0.4 on 2022-05-21 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_customer_product_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=100, null=True, verbose_name='Address'),
        ),
        migrations.AddField(
            model_name='customer',
            name='bankAccount',
            field=models.CharField(max_length=100, null=True, verbose_name='Bank Account'),
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=100, null=True, verbose_name='Email'),
        ),
        migrations.AddField(
            model_name='customer',
            name='telephone',
            field=models.CharField(max_length=100, null=True, verbose_name='Tel'),
        ),
    ]
