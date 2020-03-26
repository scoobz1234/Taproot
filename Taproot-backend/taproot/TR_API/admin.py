from django.contrib import admin

from .models import *

############### INLINES ###################
class DemographicInline(admin.StackedInline):
    fieldsets = (
        ('Family', {
            'fields': (('has_spouse','spouse_name'),
            ('has_siblings','sibling_count','sibling_birth_order'),
            ('has_children','children_count','children_names'))
        }),
        ('Living Conditions', {
            'fields': (('raised_city','raised_state'),
            ('lived_city','lived_state'))
        }),
        ('Resident Information', {
            'fields': (('resident'),
            ('english_first_language'),)
        })
    )
    model = Demographic
    extra = 1

class AdmitInline(admin.StackedInline):
    fieldsets = (
        ('Location', {'fields': (('facility','room_number'),)}),
        ('Admission', {'fields': (('admit_date',))}),
        ('Discharge', {'fields': (('discharge_date','discharged_to'),)})
    )
    model = Admit
    extra = 1

class DiagnosesInline(admin.StackedInline):
    fieldsets = (
        ('Dementia', {'fields': (('severity_of_dementia','length_of_memories'),)}),
        ('Vision', {'fields': (('vision_diagnoses','eyes_affected'),)}),
        ('Medical', {'fields': ('medical_diagnoses',)}),
        ('Mental', {'fields': ('mental_health_diagnoses',)}),
        ('Hearing', {'fields': ('hearing_diagnoses',)}),
        ('Dental', {'fields':('dental_diagnoses',)})
    )
    model = Diagnoses
    extra = 1

class FavoritesInline(admin.StackedInline):
    fieldsets = (
        ('Favorites', {
            'fields': (('food','snack'),
            ('drink','favorite_hobby'),
            ('favorite_music'))}),
        ('Interests/Hobbies', {
            'fields': ('interests',)}),
        ('Other', {
            'fields': ('memory',)})
    )

    model = Favorites
    extra = 1

class HistoryInline(admin.StackedInline):
    fields = ('history_of_injuries', 'history_of_ailments')

    model = History
    extra = 1

class MedicationsInline(admin.StackedInline):
    fieldsets = (
        ('Details', {'fields': (('medication_name','date_prescribed'),('dosage','frequency'),('administration'))}),
        ('Other', {'fields': ('prns_given_last_month','is_medication_discounted')})
    )
    model = Medications
    extra = 1

class NeedsInline(admin.StackedInline):
    fields = ('mobility','adl_care','can_communicate','can_comprehend')
    model = Needs
    extra = 1

############### MODEL ADMINS ###################
@admin.register(Resident)
class ResidentAdmin(admin.ModelAdmin):
    
    inlines = [DemographicInline, AdmitInline, DiagnosesInline, FavoritesInline, HistoryInline, MedicationsInline, NeedsInline]
    list_display = ['last_name','first_name']
    list_filter = ('last_name','first_name')
    fieldsets = (
        ('Demographic', {
            'fields': (('first_name','last_name'),('preferred_name'))
        }),
        ('Other', {
            'fields' : ('gender', 'date_of_birth')
        })
    )

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

admin.site.site_header = "Taproot Admin"
admin.site.site_title = "Taproot Admin"
