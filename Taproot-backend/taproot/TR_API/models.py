from django.db import models
from django.contrib.auth.models import User

gender = [
    ('M' , 'Male'),
    ('F', 'Female')
]
serverity = [
    ('Mild', 'Mild'),
    ('Moderate', 'Moderate'),
    ('Severe', 'Severe')
]
eyes = [
    ('None', 'None'),
    ('Left', 'Left'),
    ('Right', 'Right'),
    ('Both', 'Both')
]
choice = [
    ('1', 'Yes'),
    ('0', 'No')
]
adl = [
    ('None', 'None'),
    ('Partial-Care','Partial-Care'),
    ('Total-Care','Total-Care')
]
mobility = [
    ('None', 'None'),
    ('Unsteady', 'Unsteady'),
    ('Needs Assistance', 'Needs Assistance'),
    ('Wheelchair', 'Wheelchair'),
    ('Cane/Walker', 'Cane/Walker')
]

# ADMIT TABLE #
class Admit(models.Model):
    pid = models.CharField(max_length=128)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)
    room_number = models.CharField(max_length=128)
    admit_date = models.DateField()
    discharge_date = models.DateField(null=True, blank=True)
    discharged_to = models.CharField(max_length=512, null=True, blank=True)

    class Meta:
        db_table = 'admit'

# AILMENTS TABLE #
class Ailment(models.Model):
    ailment = models.CharField(max_length=512)

    def __str__(self):
        return self.ailment

    class Meta:
        db_table = "ailments"

# BEHAVIORS TABLE #
class Behavior(models.Model):
    behavior_name = models.CharField(max_length=128)
    behavior_details = models.CharField(max_length=512)

    def __str__(self):
        return self.behavior_name    
    
    class Meta:
        db_table = "behaviors"

# CAREGIVERS TABLE #
class Caregiver(models.Model):
    g = gender
    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=1, choices=g)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = "caregiver"

# DEMENTIA SEVERITY TABLE #
class Dementia_Severity(models.Model):
    severity = models.CharField(max_length=128)
        
    class Meta:
        db_table = "dementia_severity"

# DEMOGRAPHIC TABLE #
class Demographic(models.Model):
    c = choice
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    raised_city = models.CharField(max_length=128, verbose_name='City the resident was raised in', blank=True, null=True)
    raised_state = models.CharField(max_length=128, verbose_name='State the resident was raised in', blank=True, null=True)
    lived_city = models.CharField(max_length=128, verbose_name='City the resident lived in', blank=True, null=True)
    lived_state = models.CharField(max_length=128, verbose_name='State the resident lived in', blank=True, null=True)
    has_spouse = models.CharField(max_length=1, choices=c, default=0)
    spouse_name = models.CharField(max_length=128, verbose_name='Spouses name', blank=True, null=True)
    english_first_language = models.CharField(max_length=1, choices=c, default=0)
    has_siblings = models.CharField(max_length=1, choices=c, default=0)
    sibling_count = models.IntegerField(verbose_name='How many siblings does the resident have?', blank=True, null=True)
    sibling_birth_order = models.CharField(max_length=128, blank=True, null=True)
    has_children = models.CharField(max_length=1, choices=c, default=0)
    children_count = models.IntegerField(blank=True, null=True)
    children_names = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        db_table = "demographic"

# DENTAL DIAGNOSES TABLE #
class Dental_Diagnoses(models.Model):
    dental_problem = models.CharField(max_length=128)

    def __str__(self):
        return self.dental_problem

    class Meta:
        db_table = "dental_diagnoses"

# DIAGNOSES TABLE #
class Diagnoses(models.Model):
    s = serverity
    e = eyes
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medical_diagnoses = models.ManyToManyField('Medical_Diagnoses', blank=True)
    mental_health_diagnoses = models.ManyToManyField('Mental_Health_Diagnoses', blank=True)
    hearing_diagnoses = models.ManyToManyField('Hearing_Diagnoses',  blank=True)
    dental_diagnoses = models.ManyToManyField('Dental_Diagnoses', blank=True)
    severity_of_dementia = models.CharField(max_length=6, choices=s, default='Mild')
    length_of_memories = models.CharField(max_length=512, blank=True, null=True)
    vision_diagnoses = models.ManyToManyField('Vision_Diagnoses', blank=True)
    eyes_affected = models.CharField(max_length=6, choices=e, default='None')
        
    class Meta:
        db_table = "diagnoses"

# ENCOUNTERS TABLE #
class Encounters(models.Model):
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    resistant_action = models.ForeignKey('Resistant_Actions', on_delete=models.PROTECT)
    intervention = models.ForeignKey('Interventions', on_delete=models.PROTECT)
    caregiver = models.ForeignKey('Caregiver', on_delete=models.PROTECT)
    rating = models.FloatField(max_length=3)
    notes = models.TextField(max_length=512)
        
    class Meta:
        db_table = "encounters"

# FACILITY TABLE #
class Facility(models.Model):
    facility_name = models.CharField(max_length=512)
    street = models.CharField(max_length=512)
    street_cont = models.TextField(max_length=512, null=True, blank=True)
    city = models.CharField(max_length=128)
    state_code = models.CharField(max_length=128)
    zipcode = models.CharField(max_length=128)
    phone = models.CharField(max_length=128)

    def __str__(self):
        return self.facility_name + ', ' + self.city

    class Meta:
        db_table = "facility"

# FAVORITES TABLE #
class Favorites(models.Model):
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    favorite_music = models.CharField(max_length=512, null=True, blank=True)
    favorite_hobby = models.CharField(max_length=128, null=True, blank=True)
    memory = models.TextField(max_length=512, null=True, blank=True, verbose_name='Favorite Memory')
    food = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Food')
    snack = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Snack')
    drink = models.CharField(max_length=128, null=True, blank=True, verbose_name='Favorite Drink')
    interests = models.TextField(max_length=512, null=True, blank=True)
        
    class Meta:
        db_table = "favorites"

# HEARING DIAGNOSES TABLE #
class Hearing_Diagnoses(models.Model):
    hearing_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.hearing_problem

    class Meta:
        db_table = "hearing_diagnoses"

# HISTORY TABLE #
class History(models.Model):
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    history_of_injuries = models.ManyToManyField('Injuries', blank=True)
    history_of_ailments = models.ManyToManyField('Ailment', blank=True)
        
    class Meta:
        db_table = "history"

# INJURIES TABLE #
class Injuries(models.Model):
    injury = models.CharField(max_length=512)
    
    def __str__(self):
        return self.injury

    class Meta:
        db_table = "injuries"

# INTERVENTIONS TABLE #
class Interventions(models.Model):
    resistant_action = models.ForeignKey('Resistant_Actions', on_delete=models.PROTECT)
    intervention_details = models.CharField(max_length=512)
        
    class Meta:
        db_table = "interventions"

# MEDICAL DIAGNOSES TABLE #
class Medical_Diagnoses(models.Model):
    medical_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.medical_problem

    class Meta:
        db_table = "medical_diagnoses"

# MEDICATIONS TABLE #
class Medications(models.Model):
    c = choice
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medication_name = models.CharField(max_length=128)
    date_prescribed = models.DateField()
    dosage = models.CharField(max_length=128)
    frequency = models.CharField(max_length=128)
    administration = models.CharField(max_length=512)
    prns_given_last_month = models.CharField(max_length=512)
    is_medication_discounted = models.CharField(max_length=1, choices=c, default=0)
        
    class Meta:
        db_table = "medications"

# MENTAL HEALTH DIAGNOSES TABLE #
class Mental_Health_Diagnoses(models.Model):
    mental_health_problem = models.CharField(max_length=512)
    
    def __str__(self):
        return self.mental_health_problem

    class Meta:
        db_table = "mental_health_diagnoses"

# NEEDS TABLE #
class Needs(models.Model):
    c = choice
    a = adl
    m = mobility
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    mobility = models.CharField(max_length=16, choices=m, default='None')
    adl_care = models.CharField(max_length=10, choices=a, default='None')
    can_communicate = models.CharField(max_length=1, choices=c, default=0)
    can_comprehend = models.CharField(max_length=1, choices=c, default=0)
    
    def __str__(self):
        return self.resident

    class Meta:
        db_table = "needs"

# RESIDENTS TABLE #
class Resident(models.Model):
    g = gender
    pid = models.IntegerField(null=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    preferred_name = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=2, choices=g)
    active = models.BooleanField(default=True)
    
    # this defines what values are returned when you link to the resident object
    def __str__(self):
        return self.last_name.lower() +', '+ self.first_name.lower()

    class Meta:
        db_table = "residents"

# RESISTANT ACTIONS TABLE #
class Resistant_Actions(models.Model):
    behavior = models.ForeignKey('Behavior', on_delete=models.PROTECT)
    towards = models.CharField(max_length=128)
    frequency = models.CharField(max_length=128)
    time_of_day_occurs = models.CharField(max_length=128)
    
    class Meta:
        db_table = "resistant_actions"

# VISION DIAGNOSES #
class Vision_Diagnoses(models.Model):
    vision_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.vision_problem
    
    class Meta:
        db_table = "vision_diagnoses"  