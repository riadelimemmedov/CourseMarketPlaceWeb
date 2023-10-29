#

#!Tortoise models
from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator

#!Python modules and functions
from slugify import slugify


# *Note
class Note(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=225)
    slug = fields.CharField(max_length=100, null=True)
    content = fields.TextField()
    # author = fields.ForeignKeyField("models.Users", related_name="note")
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}, {self.author_id} on {self.created_at}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        return super(Note, self).save(*args, **kwargs)

    class Meta:
        table = "Note"


# Pydantic model instance
Note_Pydantic = pydantic_model_creator(Note, name="Note", exclude=["modified_at"])
NoteIn_Pydantic = pydantic_model_creator(
    Note, name="NoteIn", exclude_readonly=True, exclude=["slug"]
)
