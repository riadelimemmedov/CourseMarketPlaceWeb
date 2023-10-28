
#!Tortoise models
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


#!Python modules and functions
from slugify import slugify


#*Category
class Category(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100,null=True,unique=True)
    slug = fields.CharField(max_length=100,null=True,unique=True)
    
    def __str__(self):
        return f"{self.name}"
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Category, self).save(*args, **kwargs)
    class Meta:
        table = 'Category'
    

#*Wsl
class Wsl(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=200)

    def __str__(self):
        return f"{self.id}"
    class Meta:
        table = 'Wsl'


#*Course
class Course(models.Model):
    COURSE_TYPE = [
        ('Next JS','Next JS'),
        ('Gatsby JS','Gatsby JS'),
        ('Unity','Unity'),
        ('Phaser 3','Phaser 3'),
        ('Electron JS','Electron JS'),
        ('Vue,React,Angular','Vue,React,Angular'),
        ('Nuxt JS','Nuxt JS'),
        ('Firebase','Firebase'),
    ]
    id = fields.IntField(pk=True)
    course_type = fields.CharField(max_length=50,choices=COURSE_TYPE,null=True)
    title = fields.CharField(max_length=100,unique=True)
    description = fields.TextField()
    cover_image = fields.CharField(max_length=200)#S3
    price = fields.FloatField(default=0)
    author = fields.ForeignKeyField('models.Profile',related_name='author_course')
    category = fields.ForeignKeyField('models.Category',related_name='category_course') 
    course_link = fields.CharField(max_length=200,unique=True)#S3
    slug = fields.CharField(max_length=100,null=True,unique=True)
    #wsl = fields.ForeignKeyField('models.Wsl',related_name='wsl_course')
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
    
    def __str__(self):
            return f"{self.course_type}, {self.title} on {self.created_at}"
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        return super(Course, self).save(*args, **kwargs)
    class Meta:
        ordering = ['-created_at']
        table = 'Course'