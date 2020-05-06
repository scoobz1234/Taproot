""" The custom forms section of the admin site. """
""" Created By Stephen R Ouellette 2020 """
from django import forms
from .models import Interventions

CHOICES = [('None', 'None'), ('Favorite_Food', 'Favorite_Food'),
           ('Favorite_Drink', 'Favorite_Drink'),
           ('Favorite_Movie', 'Favorite_Movie')]

class InterventionForm(forms.ModelForm):
    """ Intervention Form """
    resident_name = forms.CharField()
    verb = forms.CharField()
    subject = forms.ChoiceField(required=True, choices=CHOICES)
    subject_detail = forms.CharField()

    class Meta:
        fields = '__all__'
        model = Interventions
