from django.contrib.auth.models import User, Group
from rest_framework import viewsets
# from .serializers import GroupSerializer
# from .serializers import UserSerializer
from .serializers import BehaviorSerializer
from .serializers import CaregiverSerializer
from .serializers import EncounterSerializer
from .serializers import FacilitySerializer
from .serializers import InterventionSerializer
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


class BehaviorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Behavior.objects.all()
    serializer_class = BehaviorSerializer


class CaregiverViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer


class EncounterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Encounter.objects.all()
    serializer_class = EncounterSerializer


class FacilityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows behaviors to be viewed or edited.
    """
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


class InterventionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows interventions to be viewed or edited.
    """
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer
