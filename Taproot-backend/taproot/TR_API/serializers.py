""" Serializers.py """
"""These are the serializers that the app interacts with"""
"""Created By Stephen R Ouellette 2020"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Resident, Facility, Caregiver, Demographic, Encounters
from .models import Behavior, Interventions, Resistant_Actions, Admit
from .models import GENDER

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')

class FacilitySerializer(serializers.ModelSerializer):
    """ Facility Serializer """
    class Meta:
        model = Facility
        fields = ['id','facility_name', 'street', 'street_cont', 
                  'city', 'state_code', 'zipcode', 'phone']

class AdmitSerializer(serializers.ModelSerializer):
    """ Admit Serializer """
    class Meta:
        model = Admit
        fields = ['id','pid','resident','facility','room_number','admit_date','discharge_date','discharged_to']

class ResidentSerializer(serializers.ModelSerializer):
    """ Resident model serializer"""
    pid = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Resident
        fields = ['id', 'pid','first_name', 'last_name', 'preferred_name',
                  'date_of_birth', 'gender', 'active']


class CaregiverSerializer(serializers.ModelSerializer):
    """ Caregiver Serializer """
    class Meta:
        model = Caregiver
        fields = ['id','facility','first_name','last_name','gender','user']

class DemographicSerializer(serializers.ModelSerializer):
    """ Demographic Serializer"""
    class Meta:
        model = Demographic
        fields = ['id', 'pid','resident', 'raised_city', 'raised_state',
                  'lived_city', 'lived_state', 'has_spouse',
                  'spouse_name', 'english_first_language', 'has_siblings',
                  'sibling_birth_order', 'has_children', 'children_count',
                  'children_names']

class BehaviorSerializer(serializers.ModelSerializer):
    """ Behavior Serializer """
    class Meta:
        model = Behavior
        fields = ['id','behavior_name','behavior_details']

class InterventionSerializer(serializers.ModelSerializer):
    """ Intervention Serializer """
    class Meta:
        model = Interventions
        fields = ['id','resident', 'behavior', 'intervention_name','intervention_details','active']

class Resistant_ActionsSerializer(serializers.ModelSerializer):
    """ Reactive Behavior Serializer """
    class Meta:
        model = Resistant_Actions
        fields = ['id','resident','intervention','behavior','towards','frequency','time_of_day_occurs']

class EncountersSerializer(serializers.ModelSerializer):
    """ Encounters Serializer """
    class Meta:
        model = Encounters
        fields = ['id','resident','resistant_action','intervention','caregiver','encounter_date','outcome','rating','notes']