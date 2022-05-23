# todo/todo_api/serializers.py
from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    images = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='href'
    )


    class Meta:
        model = Product
        fields = [
            "title",
            "id",
            "key",
            "is_active",
            "images",
            "description",
            "price",
            "stock",
            "created_at",
            "updated_at",
        ]
