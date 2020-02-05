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
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
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
        db_table = "TBL_BEHAVIOR"


class Encounter(models.Model):
    event = models.AutoField(primary_key=True)
    patient = models.ForeignKey(User, on_delete=models.PROTECT)
    caregiver = models.ForeignKey(User, on_delete=models.PROTECT)
    behavior = models.ForeignKey('Behavior', on_delete=models.PROTECT)
    intervention = models.ForeignKey('Intervention', on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    outcome = models.BooleanField() # TODO: pass/fail? or need a third option?
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
        db_table = "TBL_INTERVENTION"