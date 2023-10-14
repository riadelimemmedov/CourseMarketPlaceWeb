
#!Tortoise models
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


#!Python modules and functions
from slugify import slugify


#*Cart
class Cart(models.Model):
    id = fields.IntField(pk=True)
    cart_id = fields.CharField(max_length=250,null=True)
    date_added = fields.DatetimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.cart_id} --- {self.date_added}"
    class Meta:
        ordering = ['-date_added']
        table = 'Cart'


#*CartItem
class CartItem(models.Model):
    profile = fields.ForeignKeyField('models.Profile',related_name='profile_cart_item',on_delete=fields.CASCADE,null=True)
    course = fields.ForeignKeyField('models.Course',related_name='course_cart_item',on_delete=fields.CASCADE)
    cart = fields.ForeignKeyField('models.Cart',related_name='cart_data',on_delete=fields.CASCADE,null=True)
    quantity = fields.IntField(default=0)
    is_active = fields.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.course} --- {self.cart}"
    
    def sub_total(self):
        return self.course.price*self.quantity
    
    class Meta:
        table = 'CartItem'

# Pydantic model instance
CartInSchema = pydantic_model_creator(Cart,name='CartIn',exclude_readonly=True)
CartOutSchema = pydantic_model_creator(Cart,name='Cart')
CartItemInSchema = pydantic_model_creator(CartItem,name='CartItemIn',exclude=['profile_id','course_id','cart_id'],exclude_readonly=True)
CartItemOutSchema = pydantic_model_creator(CartItem,name='CartItem',exclude=['profile.password','profile.created_at','profile.modified_at'])