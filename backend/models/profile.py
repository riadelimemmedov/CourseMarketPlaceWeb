
#!Tortoise orm
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


#!Helper function
from utils.helpers import generate_random_user_code


#*Profile
class Profile(models.Model):
    ROLE_TYPE = [
        ('ADMIN','Admin'),
        ('TEACHER','Teacher'),
        ('USER','User')
    ]
    
    id = fields.IntField(pk=True)
    first_name = fields.CharField(max_length=50,unique=True)#
    last_name  = fields.CharField(max_length=50,unique=True)#
    username = fields.CharField(max_length=50,unique=True,null=True)
    email = fields.CharField(max_length=100,unique=True)#
    profile_image = fields.CharField(max_length=200)#S3
    metamask_address = fields.CharField(max_length=200,unique=True)
    user_role = fields.CharField(max_length=50,null=True,choices=ROLE_TYPE,default=ROLE_TYPE[2][0])
    password = fields.CharField(max_length=128, null=True)
    city = fields.CharField(blank=True,max_length=20,null=True)
    date_joined = fields.DatetimeField(null=True,auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True,null=True)
    
    def __str__(self):
        return f"{self.first_name} - {self.last_name}"
    
    def full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name or ''} {self.last_name or ''}".strip()
        return self.username
    
    class Meta:
        ordering = ['-date_joined']
        table = 'Profile'
    
#Pydantic shmecas
Profile_Pydantic = pydantic_model_creator(Profile,name='Profile',exclude=['password'])
ProfileIn_Pydantic = pydantic_model_creator(Profile,name='ProfileIn',exclude_readonly=True)




