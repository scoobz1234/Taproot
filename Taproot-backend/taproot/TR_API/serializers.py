# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Behavior
from .models import Caregiver
from .models import Encounter
from .models import Facility
from .models import Intervention
# from .models import *


# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['id', 'url', 'name']


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     groups = GroupSerializer(many=True, read_only=True)
#     class Meta:
#         model = User
#         fields = ['id', 'url', 'username', 'password', 'groups']


class InterventionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Intervention
        fields = ['id', 'url', 'name', 'info']


class BehaviorSerializer(serializers.HyperlinkedModelSerializer):
    interventions = InterventionSerializer(many=True, read_only=True)
    class Meta:
        model = Behavior
        fields = ['id', 'url', 'name', 'info']


class FacilitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Facility
        fields = ['id', 'url', 'name', 'city', 'state', 'phone']


class CaregiverSerializer(serializers.HyperlinkedModelSerializer):
    facility = FacilitySerializer(many=True, read_only=True)
    class Meta:
        model = Caregiver
        fields = ['id', 'url', 'first_name', 'last_name', 'dob', 'email', 'phone', 'active', 'facility']


class EncounterSerializer(serializers.HyperlinkedModelSerializer):
    behavior = BehaviorSerializer()
    caregiver = CaregiverSerializer()
    intervention = InterventionSerializer()
    class Meta:
        model = Encounter
        fields = ['id', 'caregiver', 'resident', 'behavior', 'intervention', 'date',
                  'outcome', 'behavior_rating', 'notes']


class EncounterUploadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Encounter
        fields = ['id', 'caregiver', 'behavior', 'intervention',
                  'outcome', 'behavior_rating', 'notes']


class ResidentBehaviorSerializer(serializers.HyperlinkedModelSerializer):
    behavior = BehaviorSerializer()
    interventions = InterventionSerializer()
    class Meta:
        model = ResidentBehavior
        fields = ['id', 'url', 'resident_id', 'behavior', 'interventions']


class ResidentSerializer(serializers.HyperlinkedModelSerializer):
    behaviors = ResidentBehaviorSerializer()
    class Meta:
        model = Resident
        fields = ['id', 'url', 'first_name', 'last_name', 'behaviors',
                  'gender', 'dob', 'facility']