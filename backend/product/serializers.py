# todo/todo_api/serializers.py
from rest_framework import serializers
from .models import Image, Product

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id','href']
    
    def create(self, validated_data):
        instance = super().create(validated_data)
        serializer = ImageSerializer(instance)
        return serializer


class ProductSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)

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
        images_serializer : list[ImageSerializer] = []
        
        for i in images_data:
            data = {"href": i['href']}
            imgSerializer0 = ImageSerializer(data = data)
            if imgSerializer0.is_valid():
                imgSerializer = imgSerializer0.create(data)
                images_serializer.append(imgSerializer)
            print("images added")
            
        instance:Product = super().create(validated_data)
        image_obj_list= []
        for i in images_serializer:
            image = Image.objects.get(id=i.data['id'])
            image_obj_list.append(image)
        instance.images.set(image_obj_list)
        serializer = ProductSerializer(instance)
        return serializer
