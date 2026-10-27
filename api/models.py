from django.db import models
import string 
import random
def gen_code():
    len=6
    while True:
        code=''.join(random.choices(string.ascii_uppercase, k=len))
        #random.choices() returns a list of randomly picked elements from the given arguments:
        #repeats k times and then .join  joins them to make the room code
        if Room.objects.filter(code=code).count()==0:#query the database to search if the code is unique or not
            break
    return code

class Room(models.Model):

    code=models.CharField(max_length=8, default=gen_code, unique=True)#registers the room code in the db; max length is 8 characters nd necessary, default is empty string, unique means no two rooms can have the same code
    host=models.CharField(max_length=15, unique=True)#register the host in the db; max length is 15 characters and necessary, unique means no two rooms can have the same host
    guest_can_pause=models.BooleanField(null=False, default=False)
    votes_to_skip=models.IntegerField(null=False, default=1)
    created_at=models.DateTimeField(auto_now_add=True)#returns the time the room was created and stores it in the database


    #we have to makemigrations and migrate to create the database tables for the Room model(python manage.py makemigrations and python manage.py migrate)