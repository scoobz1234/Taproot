from rest_framework import serializers
from .models import Resident, Caregiver, Demographic


class ResidentSerializer(serializers.HyperlinkedModelSerializer):
    pid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Resident
        fields = ['id','pid','first_name','last_name','preferred_name','date_of_birth','gender','active']

class CaregiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Caregiver
        fields = '__all__'

class DemographicSerializer(serializers.HyperlinkedModelSerializer):
    residents = ResidentSerializer(many=True,read_only=True)
    class Meta:
        model = Demographic
        fields = ['id','pid','raised_city','raised_state','lived_city','lived_state','has_spouse','spouse_name','english_first_language','has_siblings','sibling_birth_order','has_children','children_count','children_names']