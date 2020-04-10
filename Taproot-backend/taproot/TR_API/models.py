"""Taproot models for the database and API website"""
from django.db import models
from django.contrib.auth.models import User

# DROPDOWN SELECTION ARRAYS #
GENDER = [('M', 'Male'), ('F', 'Female')]
SEVERITY = [('Mild', 'Mild'), ('Moderate', 'Moderate'), ('Severe', 'Severe')]
EYES = [('None', 'None'), ('Left', 'Left'), ('Right', 'Right'), ('Both', 'Both')]
CHOICE = [('1', 'Yes'), ('0', 'No'), ('2', 'Sometimes')]
ADL = [('None', 'None'), ('Partial-Care', 'Partial-Care'), ('Total-Care', 'Total-Care')]
MOBILITY = [('None', 'None'), ('Unsteady', 'Unsteady'), ('Needs Assistance', 'Needs Assistance'),
            ('Wheelchair', 'Wheelchair'), ('Cane/Walker', 'Cane/Walker')]
TOWARDS = [('None', 'None'), ('Staff', 'Staff'), ('Family', 'Family'), ('Nurse', 'Nurse'),
           ('Doctor', 'Doctor'), ('Caregivers', 'Caregivers'), ('All', 'All'), ('Other', 'Other')]
FREQUENCY = [('None', 'None'), ('1 to 3 times per day', '1 to 3 times per day'),
             ('More than 3 times per day', 'More than 3 times per day'),
             ('A few times per week', 'A few times per week'),
             ('A few times per month', 'A few times per month'),
             ('Everytime', 'Everytime'), ('Other', 'Other')]
TIME_OF_THE_DAY = [('Morning', 'Morning'), ('Afternoon', 'Afternoon'),
                   ('Night', 'Night'), ('All', 'All')]
ADMINISTRATION = [('None', 'None'), ('Routine', 'Routine'), ('PRN', 'PRN')]
MEMORY_LENGTH = [('None', 'None'), ('1 to 5 mins', '1 to 5 mins'),
                 ('10 to 15 mins', '10 to 15 mins'), ('15 to 30 mins', '15 to 30 mins'),
                 ('30 to 60 mins', '30 to 60 mins'), ('Other', 'Other')]
LANGUAGE = [('English', 'English'), ('French', 'French'), ('Spanish', 'Spanish'),
            ('German', 'German'), ('Chinese', 'Chinese'), ('Arabic', 'Arabic'),
            ('Russian', 'Russian'), ('Japanese', 'Japanese'), ('Hindu', 'Hindu'),
            ('Malay', 'Malay'), ('Bengali', 'Bengali'), ('Portuguese', 'Portuguese')]


# ADMIT TABLE #
class Admit(models.Model):
    """ Put your table fields here, CharFields must have max_length input...
    If you want it to be not required, need to put null and blank to true...
    ForeignKey's must have reference to the Model, and then set on_delete method... """
    pid = models.CharField(max_length=128, null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)
    room_number = models.CharField(max_length=128)
    admit_date = models.DateField()
    discharge_date = models.DateField(null=True, blank=True)
    discharged_to = models.CharField(max_length=512, null=True, blank=True)

    # this def statement sets the value you see when you click on a page
    # without this you would see Admit Object(1), Admit Object(2) and so on...
    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = 'admit' # What table this class represents/connects to...
        verbose_name = 'Admission' # Changes how you see the table name on the admin page...
        verbose_name_plural = 'Admissions' # Changes how you see the plural name of the table...

class Ailment(models.Model):
    """Ailment Table"""
    ailment = models.CharField(max_length=512)

    def __str__(self):
        return self.ailment

    class Meta:
        db_table = "ailments"
        verbose_name = 'Ailment'
        verbose_name_plural = 'Ailments'

class Behavior(models.Model):
    """Behavior Table"""
    behavior_name = models.CharField(max_length=128)
    behavior_details = models.CharField(max_length=512)

    def __str__(self):
        return self.behavior_name

    class Meta:
        db_table = "behaviors"
        verbose_name = 'Behavior'
        verbose_name_plural = 'Behaviors'

class States(models.Model):
    """ States Table """
    abbreviation = models.CharField(max_length=2)
    full_name = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name

    class Meta:
        db_table = "states"
        verbose_name = 'State'
        verbose_name_plural = 'States'

class Caregiver(models.Model):
    """ Caregiver Tables """
    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=1, choices=GENDER)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = "caregiver"
        verbose_name = 'Caregiver'
        verbose_name_plural = 'Caregivers'

class Dementia_Severity(models.Model):
    """ Dementia Severity Table """
    severity = models.CharField(max_length=128)

    class Meta:
        db_table = "dementia_severity"

class Demographic(models.Model):
    """ Demographic Table """
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    raised_city = models.CharField(max_length=128, verbose_name='City raised in',
                                   blank=True, null=True)
    raised_state = models.ForeignKey('States', on_delete=models.PROTECT, related_name="rs",
                                     blank=True, null=True)
    lived_city = models.CharField(max_length=128, verbose_name='City lived in',
                                  blank=True, null=True)
    lived_state = models.ForeignKey('States', on_delete=models.PROTECT, blank=True, null=True)
    has_spouse = models.CharField(max_length=1, choices=CHOICE, default=0)
    spouse_name = models.CharField(max_length=128, verbose_name='Spouses name',
                                   blank=True, null=True)
    english_first_language = models.CharField(max_length=1, choices=CHOICE, default=0)
    language_spoken = models.CharField(max_length=128, choices=LANGUAGE, default='English')
    has_siblings = models.CharField(max_length=1, choices=CHOICE, default=0)
    sibling_count = models.IntegerField(verbose_name='How many siblings does the resident have?',
                                        blank=True, null=True)
    sibling_birth_order = models.CharField(max_length=128, verbose_name='Resident birth order',
                                           blank=True, null=True,)
    has_children = models.CharField(max_length=1, choices=CHOICE, default=0)
    children_count = models.IntegerField(blank=True, null=True)
    children_names = models.CharField(max_length=512, blank=True, null=True)

    """ This def is for when your updating a resident profile...
        if there is no PID then this is the one and only record.
        so we return #1 if there is a PID then we return the PID itself """
    def __str__(self):
        return '#1' if self.pid is None else self.pid

    class Meta:
        db_table = "demographic"

class Dental_Diagnoses(models.Model):
    """ Dental Diagnoses Table """
    dental_problem = models.CharField(max_length=128)

    def __str__(self):
        return self.dental_problem

    class Meta:
        db_table = "dental_diagnoses"
        verbose_name = 'Dental Diagnoses'
        verbose_name_plural = 'Dental Diagnoses'

class Diagnoses(models.Model):
    """ Diagnoses Table """
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medical_diagnoses = models.ManyToManyField('Medical_Diagnoses', blank=True)
    mental_health_diagnoses = models.ManyToManyField('Mental_Health_Diagnoses', blank=True)
    hearing_diagnoses = models.ManyToManyField('Hearing_Diagnoses', blank=True)
    dental_diagnoses = models.ManyToManyField('Dental_Diagnoses', blank=True)
    severity_of_dementia = models.CharField(max_length=10, choices=SEVERITY, default='Mild')
    length_of_memories = models.CharField(max_length=512, choices=MEMORY_LENGTH, default='None',
                                          blank=True, null=True)
    vision_diagnoses = models.ManyToManyField('Vision_Diagnoses', blank=True)
    eyes_affected = models.CharField(max_length=6, choices=EYES, default='None')
    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = "diagnoses"
        verbose_name = 'Diagnoses'
        verbose_name_plural = 'Diagnoses'

class Encounters(models.Model):
    """ Encounters Table """
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    resistant_action = models.ForeignKey('Reactive_Behaviors', on_delete=models.PROTECT)
    intervention = models.ForeignKey('Interventions', on_delete=models.PROTECT)
    caregiver = models.ForeignKey('Caregiver', on_delete=models.PROTECT)
    rating = models.FloatField(max_length=3)
    notes = models.TextField(max_length=512)

    class Meta:
        db_table = "encounters"
        verbose_name = 'Encounter'
        verbose_name_plural = 'Encounters'

class Facility(models.Model):
    """ Facitlity Table """
    facility_name = models.CharField(max_length=512)
    street = models.CharField(max_length=512)
    street_cont = models.TextField(max_length=512, null=True, blank=True)
    city = models.CharField(max_length=128)
    state_code = models.ForeignKey('States', on_delete=models.PROTECT)
    zipcode = models.CharField(max_length=128)
    phone = models.CharField(max_length=128)

    def __str__(self):
        return self.facility_name + ', ' + self.city

    class Meta:
        db_table = "facility"
        verbose_name = 'Facility'
        verbose_name_plural = 'Facilities'

class Favorites(models.Model):
    """ Favorites Table """
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    favorite_music = models.CharField(max_length=512, null=True, blank=True)
    favorite_hobby = models.CharField(max_length=128, null=True, blank=True)
    favorite_movie = models.CharField(max_length=128, null=True, blank=True)
    favorite_tv_show = models.CharField(max_length=128, null=True, blank=True)
    upset_by = models.CharField(max_length=512, null=True, blank=True)
    likes_animals = models.CharField(max_length=1, choices=CHOICE, default='No',
                                     null=True, blank=True)
    personality = models.CharField(max_length=128, null=True, blank=True,
                                   verbose_name='Did they grow up being modest/shy?')
    insecurities = models.CharField(max_length=128, null=True, blank=True,
                                    verbose_name='Were they overly concerned with how they looked?')
    profession = models.CharField(max_length=128, null=True, blank=True)
    food = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Food')
    snack = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Snack')
    drink = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Drink')
    interests = models.TextField(max_length=512, null=True, blank=True)
    memory = models.TextField(max_length=512, null=True, blank=True, verbose_name='Favorite Memory')
    relax_action = models.TextField(max_length=512, null=True, blank=True,
                                    verbose_name='What did they used to enjoy or do to relax?')
    other = models.TextField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = "favorites"
        verbose_name = 'Favorite'
        verbose_name_plural = 'Favorites'

class Hearing_Diagnoses(models.Model):
    """ Hearing Diagnoses """
    hearing_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.hearing_problem

    class Meta:
        db_table = "hearing_diagnoses"
        verbose_name = 'Hearing Diagnoses'
        verbose_name_plural = 'Hearing Diagnoses'

class History(models.Model):
    """ History Table """
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    history_of_injuries = models.ManyToManyField('Injuries', blank=True)
    history_of_ailments = models.ManyToManyField('Ailment', blank=True)

    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = "history"
        verbose_name = 'History'
        verbose_name_plural = 'Histories'

class Injuries(models.Model):
    """ Inuries Table """
    injury = models.CharField(max_length=512)

    def __str__(self):
        return self.injury

    class Meta:
        db_table = "injuries"
        verbose_name = 'Injury'
        verbose_name_plural = 'Injuries'

class Interventions(models.Model):
    """ Interventions Table """
    intervention_name = models.CharField(max_length=512)
    intervention_details = models.TextField(max_length=512)

    def __str__(self):
        return self.intervention_name

    class Meta:
        db_table = "interventions"
        verbose_name = 'Intervention'
        verbose_name_plural = 'Interventions'

class Medical_Diagnoses(models.Model):
    """ Medical Diagnoses Table """
    medical_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.medical_problem

    class Meta:
        db_table = "medical_diagnoses"
        verbose_name = 'Medical Diagnoses'
        verbose_name_plural = 'Medical Diagnoses'

class Medications(models.Model):
    """ Medications Table """
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medication_name = models.CharField(max_length=128)
    date_prescribed = models.DateField()
    dosage = models.CharField(max_length=45)
    frequency = models.CharField(max_length=128)
    administration = models.CharField(max_length=512, choices=ADMINISTRATION, default='None')
    prns_given_last_month = models.CharField(max_length=512)
    is_medication_discontinued = models.CharField(max_length=1, choices=CHOICE, default=0)
    def __str__(self):
        return self.medication_name + ', ' + self.resident.last_name

    class Meta:
        db_table = "medications"
        verbose_name = 'Medication'
        verbose_name_plural = 'Medications'

class Mental_Health_Diagnoses(models.Model):
    """ Mental Health Diagnoses Table """
    mental_health_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.mental_health_problem

    class Meta:
        db_table = "mental_health_diagnoses"
        verbose_name = 'Mental Health Diagnoses'
        verbose_name_plural = 'Mental Health Diagnoses'

class Needs(models.Model):
    """ Needs Table """
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    mobility = models.CharField(max_length=16, choices=MOBILITY, default='None')
    adl_care = models.CharField(max_length=10, choices=ADL, default='None')
    can_communicate = models.CharField(max_length=1, choices=CHOICE, default=0)
    can_comprehend = models.CharField(max_length=1, choices=CHOICE, default=0,
                                      verbose_name="Can understand your requests?")

    def __str__(self):
        return self.resident.last_name

    class Meta:
        db_table = "needs"
        verbose_name = 'Need'
        verbose_name_plural = 'Needs'

class Resident(models.Model):
    """ Resident Table """
    pid = models.IntegerField(null=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    preferred_name = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=2, choices=GENDER)
    last_update = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.last_name.lower() +', '+ self.first_name.lower()

    class Meta:
        db_table = "residents"
        verbose_name = 'Resident'
        verbose_name_plural = 'Residents'

class Reactive_Behaviors(models.Model):
    """ Resistant Actions Table """
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    intervention = models.ManyToManyField('Interventions', blank=True)
    behavior = models.ForeignKey('Behavior', on_delete=models.PROTECT)
    towards = models.CharField(max_length=128, choices=TOWARDS, default='None')
    frequency = models.CharField(max_length=128, choices=FREQUENCY, default='None')
    time_of_day_occurs = models.CharField(max_length=128, choices=TIME_OF_THE_DAY)

    class Meta:
        db_table = "resistant_actions"
        verbose_name = 'Reactive Behavior'
        verbose_name_plural = 'Reactive Behaviors'

class Vision_Diagnoses(models.Model):
    """ Vision Diagnoses Table """
    vision_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.vision_problem

    class Meta:
        db_table = "vision_diagnoses"
        verbose_name = 'Vision Diagnoses'
        verbose_name_plural = 'Vision Diagnoses'

# TODO calculate age from DOB (today-dob)
# TODO Print one record*****
