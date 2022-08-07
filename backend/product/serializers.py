# todo/todo_api/serializers.py
from rest_framework import serializers
from .models import Image, Product

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ['id','href']

class ProductSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)


    # images = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='id'
    # )


    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "code",
            "is_active",
            "images",
            "description",
            "stock",
            "gr",
            "created_at",
            "updated_at",
        ]
    
    def create(self,validated_data):
        
        images_data = validated_data.pop('images',[])
        instance:Product = super().create(validated_data)
        image_obj_list= []
        for i in images_data:
            image = Image.objects.get(id=i)
            image_obj_list.append(image)
        instance.images.set(image_obj_list)
        serializer = ProductSerializer(instance)
        return serializer
