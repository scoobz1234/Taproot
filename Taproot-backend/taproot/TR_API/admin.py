from django.contrib import admin

from .models import Behavior
from .models import Caregiver
from .models import Encounter
from .models import Facility
from .models import Intervention
from .models import Resident

@admin.register(Behavior)
class BehaviorAdmin(admin.ModelAdmin):
    list_display = ['name', 'info']

@admin.register(Caregiver)
class CaregiverAdmin(admin.ModelAdmin):
    list_display = ['last_name', 'first_name', 'phone', 'email']

@admin.register(Encounter)
class EncounterAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'outcome']

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'state', 'phone']

@admin.register(Intervention)
class InterventionAdmin(admin.ModelAdmin):
    list_display = ['name', 'info']

@admin.register(Resident)
class ResidentAdmin(admin.ModelAdmin):
    list_display = ['last_name', 'first_name', 'facility']
