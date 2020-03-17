from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
# from .serializers import GroupSerializer
# from .serializers import UserSerializer
from .serializers import BehaviorSerializer
from .serializers import CaregiverSerializer
from .serializers import EncounterSerializer
from .serializers import EncounterUploadSerializer
from .serializers import FacilitySerializer
from .serializers import InterventionSerializer
from .serializers import ResidentSerializer
from .serializers import ResidentBehaviorSerializer
# from .serializers import *
from .models import *


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer


@method_decorator(csrf_exempt, name='dispatch')
class BehaviorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Behavior.objects.all()
    serializer_class = BehaviorSerializer


@method_decorator(csrf_exempt, name='dispatch')
class CaregiverViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer


@method_decorator(csrf_exempt, name='dispatch')
class EncounterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Encounter.objects.all()
    serializer_class = EncounterSerializer


@method_decorator(csrf_exempt, name='dispatch')
class EncounterUploadViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Encounter.objects.all()
    serializer_class = EncounterUploadSerializer


@method_decorator(csrf_exempt, name='dispatch')
class FacilityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


@method_decorator(csrf_exempt, name='dispatch')
class InterventionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows interventions to be viewed or edited.
    """
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ResidentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ResidentBehaviorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = ResidentBehavior.objects.all()
    serializer_class = ResidentBehaviorSerializer
