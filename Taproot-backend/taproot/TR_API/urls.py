""" URLS for taproot """
from django.urls import path
from django.urls import include
from rest_framework import routers
from TR_API import views

router = routers.DefaultRouter()
router.register(r'residents', views.ResidentViewSet)
router.register(r'caregivers', views.CaregiverViewSet)
router.register(r'demographics', views.DemographicViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
