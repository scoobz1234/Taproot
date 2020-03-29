from django.contrib import admin
from django.forms import TextInput, Textarea

from .models import *

############## INLINES ###################
class DemographicInline(admin.StackedInline):
    fieldsets = (
        (None, {
            'fields': (('has_spouse','spouse_name'),
            ('has_siblings','sibling_count','sibling_birth_order'),
            ('has_children','children_count','children_names'))
        }),
        (None, {
            'fields': (('raised_city','raised_state'),
            ('lived_city','lived_state'))
        }),
        (None, {
            'fields': (('resident'),
            ('english_first_language'),)
        })
    )    
    model = Demographic
    extra = 1

    class Media:
        js = ('admin/js/hide_unhide.js',)

class AdmitInline(admin.StackedInline):
    fieldsets = (
        (None, {'fields': (('facility','room_number'),)}),
        (None, {'fields': (('admit_date',))}),
        (None, {'fields': (('discharge_date','discharged_to'),)})
    )
    model = Admit
    extra = 1

class DiagnosesInline(admin.StackedInline):
    filter_horizontal = ('vision_diagnoses','medical_diagnoses',
        'mental_health_diagnoses','hearing_diagnoses','dental_diagnoses')
    fieldsets = (
        (None, {'fields': (('severity_of_dementia','length_of_memories'),)}),
        (None, {'fields': (('vision_diagnoses','eyes_affected'),)}),
        (None, {'fields': ('medical_diagnoses',)}),
        (None, {'fields': ('mental_health_diagnoses',)}),
        (None, {'fields': ('hearing_diagnoses',)}),
        (None, {'fields':('dental_diagnoses',)})
    )
    model = Diagnoses
    extra = 1

class FavoritesInline(admin.StackedInline):
    fieldsets = (
        (None, {'fields': (('food','snack'),('drink','favorite_hobby'),('favorite_music'))}),
        (None, {'fields': ('interests',)}),
        (None, {'fields': ('memory',)})
    )

    model = Favorites
    extra = 1

class HistoryInline(admin.StackedInline):
    filter_horizontal = ('history_of_injuries', 'history_of_ailments')
    fields = ('history_of_injuries', 'history_of_ailments')

    model = History
    extra = 1

class MedicationsInline(admin.StackedInline):
    fieldsets = (
        (None, {'fields': (('medication_name','date_prescribed'),('dosage','frequency'),('administration'))}),
        (None, {'fields': ('prns_given_last_month','is_medication_discounted')})
    )
    model = Medications
    extra = 1

class NeedsInline(admin.StackedInline):
    fields = ('mobility','adl_care','can_communicate','can_comprehend')
    model = Needs
    extra = 1

class Resistant_ActionsInline(admin.StackedInline):
    filter_horizontal = ('intervention',)
    fields = ('behavior','towards','frequency','time_of_day_occurs','intervention')
    model = Resistant_Actions
    extra = 1

############### MODEL ADMINS ###################

@admin.register(Resident)
class ResidentAdmin(admin.ModelAdmin):
    
    inlines = [DemographicInline, AdmitInline, DiagnosesInline, FavoritesInline, HistoryInline, MedicationsInline, NeedsInline, Resistant_ActionsInline]
    list_display = ['last_name','first_name','date_of_birth','gender']
    list_filter = ('last_name',)
    fields  = ('first_name','last_name'),('preferred_name',),('gender', 'date_of_birth')


# in the register line, you must put the model, and the admin model...
admin.site.register(Caregiver)
admin.site.register(Facility)
admin.site.register(Admit)
admin.site.register(Ailment)
admin.site.register(Behavior)
admin.site.register(Dental_Diagnoses)
admin.site.register(Encounters)
admin.site.register(Hearing_Diagnoses)
admin.site.register(History)
admin.site.register(Injuries)
admin.site.register(Interventions)
admin.site.register(Medical_Diagnoses)
admin.site.register(Medications)
admin.site.register(Mental_Health_Diagnoses)
admin.site.register(Resistant_Actions)
admin.site.register(Vision_Diagnoses)
admin.site.register(States)

# SETTINGS FOR PAGES #
admin.site.site_header = "Taproot Admin"
admin.site.site_title = "Taproot Admin"
