# todo/todo_api/serializers.py
from rest_framework import serializers
from .models import Image, Product


# class ImageListSerializer(serializers.ListSerializer):

#     def update(self, instance, validated_data):
#         # Maps for id->instance and id->data item.
#         image_mapping = {image.id: image for image in instance}
#         data_mapping = {item['id']: item for item in validated_data}

#         # Perform creations and updates.
#         ret = []
#         for image_id, data in data_mapping.items():
#             image = image_mapping.get(image_id, None)
#             if image is None:
#                 ret.append(self.child.create(data))
#             else:
#                 ret.append(self.child.update(image, data))

#         # Perform deletions.
#         for image_id, image in image_mapping.items():
#             if image_id not in data_mapping:
#                 image.delete()

#         return ret

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'href']
        # list_serializer_class = ImageListSerializer

    def create(self, validated_data):
        instance = super().create(validated_data)
        serializer = ImageSerializer(instance)
        return serializer


class ProductSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True)

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

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        image_obj_list = []
        for i in images_data:
            print(i)
            try :
                image = Image.objects.get(href=i['href'])
                print("Getting Image",image)
            except :
                image = Image.objects.create(href=i['href'])
                print("Creating Image",image)
            image_obj_list.append(image)
        instance: Product = super().create(validated_data)
       
        instance.images.set(image_obj_list)
        serializer = ProductSerializer(instance)
        return serializer

    def update(self, instance: Product, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.code = validated_data.get('code', instance.code)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.gr = validated_data.get('gr', instance.gr)
        instance.is_active = validated_data.get(
            'is_active', instance.is_active)
        images_data = validated_data.get('images', instance.images)
        image_obj_list = []
        for i in images_data:
            try :
                image = Image.objects.get(href=i['href'])
                print("Getting Image",image)
            except :
                image = Image.objects.create(href=i['href'])
                print("Creating Image",image)
            image_obj_list.append(image)
            
        instance.images.set(image_obj_list)
        serializer = ProductSerializer(instance)
        return serializer
