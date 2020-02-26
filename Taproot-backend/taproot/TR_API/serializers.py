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
        fields = ['id', 'name', 'info']


class BehaviorSerializer(serializers.HyperlinkedModelSerializer):
    interventions = InterventionSerializer(many=True, read_only=True)
    class Meta:
        model = Behavior
        fields = ['id', 'name', 'info', 'interventions']


class CaregiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Caregiver
        fields = ['id', 'name', 'info']


class EncounterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Encounter
        fields = ['id', 'name', 'info']


class FacilitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Facility
        fields = ['id', 'name', 'info']
