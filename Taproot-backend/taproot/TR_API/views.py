""" Taproot's Views """
from rest_framework import viewsets
from .serializers import ResidentSerializer
from .serializers import CaregiverSerializer
from .serializers import DemographicSerializer
from .models import Resident, Caregiver, Demographic

class ResidentViewSet(viewsets.ModelViewSet):
    """ Resident View Set """
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer

class CaregiverViewSet(viewsets.ModelViewSet):
    """ Caregiver View Set """
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer

class DemographicViewSet(viewsets.ModelViewSet):
    """ Demographic View Set """
    queryset = Demographic.objects.all()
    serializer_class = DemographicSerializer
