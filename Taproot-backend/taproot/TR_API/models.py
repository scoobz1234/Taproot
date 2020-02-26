from django.db import models
from django.contrib.auth.models import User

# class Example(models.Model):
#     column_name = models.CharField(max_length=10)

#     def __eq__(self, other):
#         return self.pk == other

#     def __ne__(self, other):
#         return self.pk != other

#     def __gt__(self, other):
#         return self.pk > other

#     def __lt__(self, other):
#         return self.pk < other

#     def __hash__(self):
#         return hash(self.pk)

#     class Meta:
#         db_table = "TBL_EXAMPLE"

class Behavior(models.Model):
    name = models.CharField(max_length=50)
    info = models.TextField(null=True)
    interventions = models.ManyToManyField('Intervention')

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_BEHAVIOR"


class Caregiver(models.Model):
    GENDER = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    facility = models.ManyToManyField('Facility')  # TODO: behavior, privacy
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    active = models.BooleanField(default=True)

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_CAREGIVER"


class Encounter(models.Model):
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT, null=True)
    caregiver = models.ForeignKey(User, on_delete=models.PROTECT)
    behavior = models.ForeignKey('Behavior', on_delete=models.PROTECT)
    intervention = models.ForeignKey('Intervention', on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    outcome = models.BooleanField() # TODO: pass/fail? or need a third option?
    behavior_rating = models.IntegerField()
    notes = models.TextField()

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_ENCOUNTER"


class Facility(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    address_ext = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zipcode = models.IntegerField()
    phone = models.CharField(max_length=20)

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_FACILITY"


class Feedback(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    category = models.ForeignKey('FeedbackCategory', on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_FEEDBACK"


class FeedbackCategory(models.Model):
    category = models.CharField(max_length=30)

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_FEEDBACK_CATEGORY"


class Intervention(models.Model):
    name = models.CharField(max_length=50)
    info = models.TextField()

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_INTERVENTION"


class Resident(models.Model):   # TODO
    GENDER = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)  # TODO: behavior, privacy
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER)
    active = models.BooleanField(default=True)

    def __eq__(self, other):
        return self.pk == other

    def __ne__(self, other):
        return self.pk != other

    def __gt__(self, other):
        return self.pk > other

    def __lt__(self, other):
        return self.pk < other

    def __hash__(self):
        return hash(self.pk)

    class Meta:
        db_table = "TBL_RESIDENT"
