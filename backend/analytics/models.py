from django.db import models

class Machine(models.Model):
    OS_CHOICES = [
        ('RHEL8', 'RHEL8'),
        ('WRL7', 'WRL7'),
    ]
    PRODUCT_TYPE_CHOICES = [
        ('Type 1', 'Type 1'),
        ('Type 2', 'Type 2'),
        ('Type 3', 'Type 3'),
    ]
    
    name = models.CharField(max_length=255)
    os = models.CharField(max_length=255, choices=OS_CHOICES)
    product_type = models.CharField(max_length=255, choices=PRODUCT_TYPE_CHOICES)

    def __str__(self):
        return self.name
    

class Event(models.Model):
    NAME_CHOICES = [
        ('Installation', 'Backout'),
        ('Backout', 'Backout'),
    ]
    
    name = models.CharField(max_length=255, choices=NAME_CHOICES)
    starting_point = models.CharField(max_length=255)
    final_point = models.CharField(max_length=255)
    duration = models.FloatField()
    machine = models.ForeignKey(Machine, related_name='events', null=True, blank=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.name
