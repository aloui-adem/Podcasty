#will take our model db room which has the code and will translate the code into json response 
from rest_framework import serializers
from .models import Room

class serializerRoom(serializers.ModelSerializer):
    class Meta:# what we want to serialize into json response
        model=Room
        fields=('id','code','host','guest_can_pause','votes_to_skip','created_at')#fields that we want to serialize into json response

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Room
        fields=('guest_can_pause', 'votes_to_skip')