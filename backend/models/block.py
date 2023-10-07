
#!Tortoise models
from tortoise import fields, models



#*Block
class Block(models.Model):
    id = fields.IntField(pk=True)
    block_number = fields.IntField(default=0)    