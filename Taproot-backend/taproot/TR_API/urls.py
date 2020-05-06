""" URLS for taproot """
"""Created By Stephen R Ouellette 2020"""
from django.urls import path
from django.urls import include
from rest_framework import routers
from TR_API import views

router = routers.DefaultRouter()
router.register(r'residents', views.ResidentViewSet)
router.register(r'caregivers', views.CaregiverViewSet)
router.register(r'demographics', views.DemographicViewSet)
router.register(r'behaviors', views.BehaviorViewSet)
router.register(r'interventions', views.InterventionViewSet)
router.register(r'reactive_behaviors', views.Resistant_ActionsViewSet)
router.register(r'facilities', views.FacilityViewSet)
router.register(r'admit', views.AdmitViewSet)
router.register(r'encounters', views.EncountersViewSet)
router.register(r'users', views.UsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]