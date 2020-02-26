from django.urls import path
from django.urls import include
from TR_API import views
from rest_framework import routers

router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)
router.register(r'behaviors', views.BehaviorViewSet)
router.register(r'caregivers', views.CaregiverViewSet)
router.register(r'encounters', views.EncounterViewSet)
router.register(r'facilities', views.FacilityViewSet)
router.register(r'interventions', views.InterventionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
