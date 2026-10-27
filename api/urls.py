from django.urls import path
from .views import LeaveRoom, RoomView, CreateRoomView, UserInRoom, GetRoom, JoinRoom

urlpatterns = [
    path('', RoomView.as_view()),#when we go to the api url, it will call the RoomView class as a view(rendered) and return the json response of all the rooms that are created in the database
    path('create-room',CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view()),
    path('join-room',JoinRoom.as_view()),
    path('userinroom',UserInRoom.as_view()),
    path('leave-room',LeaveRoom.as_view()),
]
#UPDATE1
#we created a room class inside models then we went to serializers to make our class paramters returnable as a json
#then we took it to views as an api view to print out all of the rooms and their attributes
#and we ended up in urls to passs the room class as a url so we can render it and see it


#UPDATE 2
#we created the the create room page that has a UI and is connected to the database , which we we press the button create room 
#it take the data from the ui entered by the user puts it inside a json and sends a post request to views.py in api in there
#the function create a room is calls its post request to create a room or update it if it exists searching by the key session,
#after that it take that data and navigates to the room throughout the code 


#UPDATE 3
#we created a join room path where we can join a room usign the code , also updated that every user has the code in his session so we can track
#we room was he in and is he still there or not , the join room sends a post request that checks if the code is valid or not 
#if the code is valid and the response is OK we navigate to that url else we uppdate the error and display it

#UPDATE 4
#we set up the homepage so you can click to join a room or create one
#also added the feature if you are in a room and you closed the tab and returned
#the backend checks iff your session has a room code if it does , it redirects you to that room
#else you stay in the home page

#UPDATE 5
#we set up the room page by adding the room info and a leave button, now if you press leave you are rediredted to the homepage
#also the room code is cleared from the room and the parent which is homepage by a callback function
#i also added so try catch so we can catch errors if the request fails or the network of the user goes down