from django.db import models
from datetime import datetime
# Create your models here.
class User(models.Model):
    username= models.CharField(max_length=50)
    password= models.CharField(max_length=50)
    USERTYPE=[
        ("admin","admin"),
        ("normal","normal")
    ]
    userType=models.CharField(max_length=50,choices=USERTYPE)
    but1=models.PositiveIntegerField(default=0)
    but2=models.PositiveIntegerField(default=0)
    lastDate=models.DateField(default=datetime.today)
    lastTime=models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username