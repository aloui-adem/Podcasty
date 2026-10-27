#api view lets us create a view that will let us see the list of rooms that are created in the database JSON
#generic views are a set of already built views that we can use to create our own views
from django.shortcuts import render
from .serializers import serializerRoom, CreateRoomSerializer
from .models import Room
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class RoomView(generics.ListAPIView):
    queryset=Room.objects.all()#query the database to get all the rooms that are created
    serializer_class=serializerRoom#serialize the data into json response
    #made to show all the rooms

class JoinRoom(APIView):
    lookup_url_kwargs='code'
    def post(self,request,formal=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup_url_kwargs)
        if code!=None:
            room_result=Room.objects.filter(code=code)
            if len(room_result)>0:
                room=room_result[0]
                self.request.session['room_code']=code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad request': 'INvalid room code!'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'BAD REQUEST': 'INVALID DATA: did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    #made to join a room

class GetRoom(APIView):
    serializer_class=serializerRoom
    lookup_url_kwargs='code'
    def get(self, request, format='none'):
        code = request.GET.get(self.lookup_url_kwargs)#GET gets the url and .get gets the added part to the url
        if code !=None:
            room=Room.objects.filter(code=code)
            if len(room)>0:
                data = serializerRoom(room[0]).data
                data["isHost"]= self.request.session.session_key == room[0].host
                #takes true if the room found has the same session key as where we got the request from
                return Response(data, status = status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid URL: Code was not found in your request'}, status=status.HTTP_400_BAD_REQUEST)
    #made to see if a room exists or not





class CreateRoomView(APIView):#inhereting apiview lets us overwrite predefiend methods such as GET/POST/PUT
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            #if user has no old sessions create a new one
        
        serializer = self.serializer_class(data=request.data)#takes json data from the request
        if serializer.is_valid() and serializer.data.get('votes_to_skip')>=1:
            guest_can_pause=serializer.data.get('guest_can_pause')#updates the keys to the new room in the new session
            votes_to_skip=serializer.data.get('votes_to_skip')
            host=self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room=queryset[0]
                room.guest_can_pause=guest_can_pause
                room.votes_to_skip=votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                self.request.session['room_code']=room.code
                return Response(serializerRoom(room).data, status=status.HTTP_200_OK)
            else:
                room=Room(host=host,votes_to_skip=votes_to_skip,guest_can_pause=guest_can_pause)
                room.save()
                self.request.session['room_code']=room.code
                return Response(serializerRoom(room).data, status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    #made to create a room

class UserInRoom(APIView):#checks if a user is in a room or not and return the code room else it returns null
    def get(self , request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data={
            'code':self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code=self.request.session.pop('room_code')
            host_id=self.request.session.session_key
            queryset = Room.objects.filter(host=host_id)
            if len(queryset)>0:
                room=queryset[0]
                room.delete()
        return Response({'Message':'success'}, status = status.HTTP_200_OK)

