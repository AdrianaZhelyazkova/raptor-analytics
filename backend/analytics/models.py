from django.db import models

class Machine(models.Model):
    name = models.CharField(max_length=255)
    os = models.CharField(max_length=255)
    product_type = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class Event(models.Model):
    name = models.CharField(max_length=255)
    starting_point = models.CharField(max_length=255)
    final_point = models.CharField(max_length=255)
    duration = models.FloatField()
    machine = models.ForeignKey(Machine, related_name='events', null=True, blank=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.name
