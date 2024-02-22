from django.db import models

class Machine(models.Model):
    name = models.CharField(max_length=255)
    os = models.CharField(max_length=255)
    product_type = models.CharField(max_length=255)
    events = models.ManyToManyField('Event', related_name='machines')

    def __str__(self):
        return self.name
    

class Event(models.Model):
    name = models.CharField(max_length=255)
    starting_point = models.CharField(max_length=255)
    final_point = models.CharField(max_length=255)
    duration = models.FloatField()

    def __str__(self):
        return self.name
