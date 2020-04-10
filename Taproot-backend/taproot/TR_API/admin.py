""" Admin page, (one page resident input model) """
from django.contrib import admin
from .forms import InterventionForm
from .models import Demographic, Diagnoses, Admit, Favorites, History
from .models import Medications, Resident, Reactive_Behaviors, Needs, Interventions

############## INLINES ###################
class DemographicInline(admin.StackedInline):
    """ Demographic Inline function utilizes Stacked Inline Method """
    fieldsets = (
        (None, {
            'fields': (('has_spouse', 'spouse_name'),
                       ('has_siblings', 'sibling_count', 'sibling_birth_order'),
                       ('has_children', 'children_count', 'children_names'))
        }),
        (None, {
            'fields': (('raised_city', 'raised_state'),
                       ('lived_city', 'lived_state'))
        }),
        (None, {
            'fields': (('resident'),
                       ('english_first_language'),)
        })
    )
    suit_classes = 'suit-tab suit-tab-demographic'
    model = Demographic
    extra = 1

    class Media:
        """ This adds the javascript code to the inline """
        js = ('admin/js/hide_unhide.js',)

class AdmitInline(admin.StackedInline):
    """ Admit Inline function utilizes stacked inline method """
    fieldsets = (
        (None, {'fields': (('facility', 'room_number'),)}),
        (None, {'fields': (('admit_date',))}),
        (None, {'fields': (('discharge_date', 'discharged_to'),)})
    )
    model = Admit
    extra = 1

class DiagnosesInline(admin.StackedInline):
    """ Diagnoses Inline utilizes stacked inline method """
    filter_horizontal = ('vision_diagnoses', 'medical_diagnoses',
                         'mental_health_diagnoses', 'hearing_diagnoses', 'dental_diagnoses')
    fieldsets = (
        (None, {'fields': (('severity_of_dementia', 'length_of_memories'),)}),
        (None, {'fields': (('vision_diagnoses', 'eyes_affected'),)}),
        (None, {'fields': ('medical_diagnoses',)}),
        (None, {'fields': ('mental_health_diagnoses',)}),
        (None, {'fields': ('hearing_diagnoses',)}),
        (None, {'fields':('dental_diagnoses',)})
    )
    model = Diagnoses
    extra = 1

class FavoritesInline(admin.StackedInline):
    """ Favorites Inline uses Stacked Inline method """
    fieldsets = (
        (None, {'fields': (('food', 'snack'),
                           ('drink', 'favorite_hobby'),
                           ('favorite_music'),
                           ('favorite_movie', 'favorite_tv_show'),
                           ('personality', 'insecurities'))}),
        (None, {'fields': ('profession',)}),
        (None, {'fields': ('interests',)}),
        (None, {'fields': ('memory',)}),
        (None, {'fields': ('relax_action',)}),
        (None, {'fields': ('other',)}),
    )

    model = Favorites
    extra = 1

class HistoryInline(admin.StackedInline):
    """ History inline uses stacked inline method """
    filter_horizontal = ('history_of_injuries', 'history_of_ailments')
    fields = ('history_of_injuries', 'history_of_ailments')

    model = History
    extra = 1

class MedicationsInline(admin.StackedInline):
    """ Medications Inline """
    fieldsets = (
        (None, {'fields': (('medication_name', 'date_prescribed'),
                           ('dosage', 'frequency'), ('administration'))}),
        (None, {'fields': ('prns_given_last_month', 'is_medication_discontinued')})
    )
    model = Medications
    extra = 1

class NeedsInline(admin.StackedInline):
    """ Needs Inline uses stacked inline method """
    fields = ('mobility', 'adl_care', 'can_communicate', 'can_comprehend')
    model = Needs
    extra = 1

class ReactiveBehaviorsInline(admin.StackedInline):
    """ Resistant Actions Inline uses Stacked Inline method """
    filter_horizontal = ('intervention',)
    fields = ('behavior', 'towards', 'frequency', 'time_of_day_occurs', 'intervention')
    model = Reactive_Behaviors
    extra = 1

############### MODEL ADMINS ###################

@admin.register(Resident)
class ResidentAdmin(admin.ModelAdmin):
    """ Resident Admin model, uses inlines from above. """
    inlines = [DemographicInline, AdmitInline, DiagnosesInline, FavoritesInline, HistoryInline,
               MedicationsInline, NeedsInline, ReactiveBehaviorsInline]
    list_display = ['last_name', 'first_name', 'date_of_birth', 'gender']
    list_filter = ('last_name',)
    fields = ('first_name', 'last_name'), ('preferred_name',), ('gender', 'date_of_birth')

@admin.register(Interventions)
class InterventionAdmin(admin.ModelAdmin):
    """ Intervention admin model """
    form = InterventionForm
    fields = ('intervention_name', 'resident_name', ('verb', 'subject'),
              'subject_detail', 'intervention_details')
    class Media:
        """ This adds the javascript code to the inline """
        js = ('admin/js/intervention_builder.js',)

# SETTINGS FOR PAGES #
admin.site.site_header = "Taproot Admin"
admin.site.site_title = "Taproot Admin"
