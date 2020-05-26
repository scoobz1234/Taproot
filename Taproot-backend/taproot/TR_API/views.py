""" Taproot's Views """
"""Created By Stephen R Ouellette 2020"""
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import ResidentSerializer
from .serializers import CaregiverSerializer
from .serializers import DemographicSerializer
from .serializers import BehaviorSerializer
from .serializers import InterventionSerializer
from .serializers import Resistant_ActionsSerializer
from .serializers import FacilitySerializer
from .serializers import AdmitSerializer
from .serializers import EncountersSerializer
from .serializers import UserSerializer
from .models import Resident, Caregiver, Demographic, Facility, Admit
from .models import Behavior, Interventions, Resistant_Actions, Encounters


@method_decorator(csrf_exempt, name='dispatch')
class ResidentViewSet(viewsets.ModelViewSet):
    """ Resident View Set """
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer

@method_decorator(csrf_exempt, name='dispatch')
class CaregiverViewSet(viewsets.ModelViewSet):
    """ Caregiver View Set """
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer

@method_decorator(csrf_exempt, name='dispatch')
class DemographicViewSet(viewsets.ModelViewSet):
    """ Demographic View Set """
    queryset = Demographic.objects.all()
    serializer_class = DemographicSerializer

@method_decorator(csrf_exempt, name='dispatch')
class BehaviorViewSet(viewsets.ModelViewSet):
    """ Behavior View Set """
    queryset = Behavior.objects.all()
    serializer_class = BehaviorSerializer

@method_decorator(csrf_exempt, name='dispatch')
class InterventionViewSet(viewsets.ModelViewSet):
    """ Intervention View Set """
    queryset = Interventions.objects.all()
    serializer_class = InterventionSerializer

@method_decorator(csrf_exempt, name='dispatch')
class Resistant_ActionsViewSet(viewsets.ModelViewSet):
    """ Reactive Behavior View Set """
    queryset = Resistant_Actions.objects.all()
    serializer_class = Resistant_ActionsSerializer

@method_decorator(csrf_exempt, name='dispatch')
class FacilityViewSet(viewsets.ModelViewSet):
    """ Reactive Behavior View Set """
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

@method_decorator(csrf_exempt, name='dispatch')
class AdmitViewSet(viewsets.ModelViewSet):
    """ Reactive Behavior View Set """
    queryset = Admit.objects.all()
    serializer_class = AdmitSerializer

@method_decorator(csrf_exempt, name='dispatch')
class EncountersViewSet(viewsets.ModelViewSet):
    """ Reactive Behavior View Set """
    queryset = Encounters.objects.all()
    serializer_class = EncountersSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    """ Users View Set """
    queryset = User.objects.all()
    serializer_class = UserSerializer
