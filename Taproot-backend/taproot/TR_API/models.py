from django.db import models
from django.contrib.auth.models import User

# DROPDOWN SELECTION ARRAYS #
gender = [('M' , 'Male'),('F', 'Female')]
severity = [('Mild', 'Mild'),('Moderate', 'Moderate'),('Severe', 'Severe')]
eyes = [('None', 'None'),('Left', 'Left'),('Right', 'Right'),('Both', 'Both')]
choice = [('1', 'Yes'),('0', 'No'),('2','Sometimes')]
adl = [('None', 'None'),('Partial-Care','Partial-Care'),('Total-Care','Total-Care')]
mobility = [('None', 'None'),('Unsteady', 'Unsteady'),('Needs Assistance', 'Needs Assistance'),('Wheelchair', 'Wheelchair'),('Cane/Walker', 'Cane/Walker')]
towards = [('None','None'),('Staff','Staff'),('Family','Family'),('Nurse','Nurse'),('Doctor','Doctor'),('Caregivers','Caregivers'),('All','All'),('Other','Other')]
frequency = [('None','None'),('1 to 3 times per day','1 to 3 times per day'),('More than 3 times per day','More than 3 times per day'),
('A few times per week','A few times per week'),('A few times per month','A few times per month'),('Everytime','Everytime'),('Other','Other')]
time_of_the_day = [('Morning','Morning'),('Afternoon','Afternoon'),('Night','Night'),('All','All')]


# ADMIT TABLE #
class Admit(models.Model):
    # Put your table fields here, CharFields must have max_length input...
    # If you want it to be not required, need to put null and blank to true...
    # ForeignKey's must have reference to the Model, and then set on_delete method...
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

# AILMENTS TABLE #
class Ailment(models.Model):
    ailment = models.CharField(max_length=512)

    def __str__(self):
        return self.ailment

    class Meta:
        db_table = "ailments"
        verbose_name = 'Ailment'
        verbose_name_plural = 'Ailments'

# BEHAVIORS TABLE #
class Behavior(models.Model):
    behavior_name = models.CharField(max_length=128)
    behavior_details = models.CharField(max_length=512)

    def __str__(self):
        return self.behavior_name    
    
    class Meta:
        db_table = "behaviors"
        verbose_name = 'Behavior'
        verbose_name_plural = 'Behaviors'

# STATES TABLE #
class States(models.Model):
    abbreviation = models.CharField(max_length=2)
    full_name = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name

    

    class Meta:
        db_table = "states"
        verbose_name = 'Sate'
        verbose_name_plural = 'States'

# CAREGIVERS TABLE #
class Caregiver(models.Model):
    facility = models.ForeignKey('Facility', on_delete=models.PROTECT)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=1, choices=gender)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = "caregiver"
        verbose_name = 'Caregiver'
        verbose_name_plural = 'Caregivers'

# DEMENTIA SEVERITY TABLE #
class Dementia_Severity(models.Model):
    severity = models.CharField(max_length=128)
        
    class Meta:
        db_table = "dementia_severity"

# DEMOGRAPHIC TABLE #
class Demographic(models.Model):
    #TODO add language they do speak..
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    raised_city = models.CharField(max_length=128, verbose_name='City raised in', blank=True, null=True)
    raised_state = models.ForeignKey('States', on_delete=models.PROTECT, related_name="rs", blank=True, null=True)
    lived_city = models.CharField(max_length=128, verbose_name='City lived in', blank=True, null=True)
    lived_state = models.ForeignKey('States', on_delete=models.PROTECT, blank=True, null=True)
    has_spouse = models.CharField(max_length=1, choices=choice, default=0)
    spouse_name = models.CharField(max_length=128, verbose_name='Spouses name', blank=True, null=True)
    english_first_language = models.CharField(max_length=1, choices=choice, default=0)
    has_siblings = models.CharField(max_length=1, choices=choice, default=0)
    sibling_count = models.IntegerField(verbose_name='How many siblings does the resident have?', blank=True, null=True)
    sibling_birth_order = models.CharField(max_length=128, blank=True, null=True)
    #TODO change to resident Birth order...
    has_children = models.CharField(max_length=1, choices=choice, default=0)
    children_count = models.IntegerField(blank=True, null=True)
    children_names = models.CharField(max_length=512, blank=True, null=True)

    # This def is for when your updating a resident profile... if there is no PID then
    # this is the one and only record. so we return #1 if there is a PID then we return the PID itself
    #TODO This won't actually work because the PID will just tell us some arbitrary number.. need to figure out how to
    # address the count that refers to resident..
    def __str__(self):
        if (self.pid == None):
            return '#1'
        else:
            return self.pid

    class Meta:
        db_table = "demographic"

# DENTAL DIAGNOSES TABLE #
class Dental_Diagnoses(models.Model):
    dental_problem = models.CharField(max_length=128)

    def __str__(self):
        return self.dental_problem

    class Meta:
        db_table = "dental_diagnoses"
        verbose_name = 'Dental Diagnoses'
        verbose_name_plural = 'Dental Diagnoses'

# DIAGNOSES TABLE #
class Diagnoses(models.Model):
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medical_diagnoses = models.ManyToManyField('Medical_Diagnoses', blank=True)
    mental_health_diagnoses = models.ManyToManyField('Mental_Health_Diagnoses', blank=True)
    hearing_diagnoses = models.ManyToManyField('Hearing_Diagnoses',  blank=True)
    dental_diagnoses = models.ManyToManyField('Dental_Diagnoses', blank=True)
    severity_of_dementia = models.CharField(max_length=10, choices=severity, default='Mild')
    length_of_memories = models.CharField(max_length=512, blank=True, null=True)
    vision_diagnoses = models.ManyToManyField('Vision_Diagnoses', blank=True)
    eyes_affected = models.CharField(max_length=6, choices=eyes, default='None')
    #TODO add list to length of memories..
    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = "diagnoses"
        verbose_name = 'Diagnoses'
        verbose_name_plural = 'Diagnoses'

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
        verbose_name = 'Encounter'
        verbose_name_plural = 'Encounters'

# FACILITY TABLE #
class Facility(models.Model):
    
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

    def __str__(self):
        return self.resident.last_name + ', ' + self.resident.first_name

    class Meta:
        db_table = "favorites"
        verbose_name = 'Favorite'
        verbose_name_plural = 'Favorites'

# HEARING DIAGNOSES TABLE #
class Hearing_Diagnoses(models.Model):
    hearing_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.hearing_problem

    class Meta:
        db_table = "hearing_diagnoses"
        verbose_name = 'Hearing Diagnoses'
        verbose_name_plural = 'Hearing Diagnoses'

# HISTORY TABLE #
class History(models.Model):
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

# INJURIES TABLE #
class Injuries(models.Model):
    injury = models.CharField(max_length=512)
    
    def __str__(self):
        return self.injury

    class Meta:
        db_table = "injuries"
        verbose_name = 'Injury'
        verbose_name_plural = 'Injuries'

# INTERVENTIONS TABLE #
class Interventions(models.Model):
    intervention_name = models.CharField(max_length=512)
    intervention_details = models.TextField(max_length=512)
        
    def __str__(self):
        return self.intervention_name

    class Meta:
        db_table = "interventions"
        verbose_name = 'Intervention'
        verbose_name_plural = 'Interventions'

# MEDICAL DIAGNOSES TABLE #
class Medical_Diagnoses(models.Model):
    medical_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.medical_problem

    class Meta:
        db_table = "medical_diagnoses"
        verbose_name = 'Medical Diagnoses'
        verbose_name_plural = 'Medical Diagnoses'

# MEDICATIONS TABLE #
class Medications(models.Model):
    pid = models.IntegerField(null=True, blank=True)
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    medication_name = models.CharField(max_length=128)
    date_prescribed = models.DateField()
    dosage = models.CharField(max_length=45)
    frequency = models.CharField(max_length=128)
    administration = models.CharField(max_length=512)
    prns_given_last_month = models.CharField(max_length=512)
    is_medication_discounted = models.CharField(max_length=1, choices=choice, default=0) #TODO fix this to discontinued...
    #TODO list for administration prn routine...
    def __str__(self):
        return self.medication_name + ', ' + self.resident.last_name

    class Meta:
        db_table = "medications"
        verbose_name = 'Medication'
        verbose_name_plural = 'Medications'

# MENTAL HEALTH DIAGNOSES TABLE #
class Mental_Health_Diagnoses(models.Model):
    mental_health_problem = models.CharField(max_length=512)
    
    def __str__(self):
        return self.mental_health_problem

    class Meta:
        db_table = "mental_health_diagnoses"
        verbose_name = 'Mental Health Diagnoses'
        verbose_name_plural = 'Mental Health Diagnoses'

# NEEDS TABLE #
class Needs(models.Model):
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    mobility = models.CharField(max_length=16, choices=mobility, default='None')
    adl_care = models.CharField(max_length=10, choices=adl, default='None')
    can_communicate = models.CharField(max_length=1, choices=choice, default=0)
    can_comprehend = models.CharField(max_length=1, choices=choice, default=0, verbose_name="Can understand your requests?")
    
    def __str__(self):
        return self.resident.last_name

    class Meta:
        db_table = "needs"
        verbose_name = 'Need'
        verbose_name_plural = 'Needs'

# RESIDENTS TABLE #
class Resident(models.Model):
    pid = models.IntegerField(null=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    preferred_name = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=2, choices=gender)
    #last_update_date = models.DateField()
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.last_name.lower() +', '+ self.first_name.lower()

    class Meta:
        db_table = "residents"
        verbose_name = 'Resident'
        verbose_name_plural = 'Residents'

# RESISTANT ACTIONS TABLE #
class Resistant_Actions(models.Model):
    resident = models.ForeignKey('Resident', on_delete=models.PROTECT)
    intervention = models.ManyToManyField('Interventions', blank=True)
    behavior = models.ForeignKey('Behavior', on_delete=models.PROTECT)
    towards = models.CharField(max_length=128, choices=towards, default='None')
    frequency = models.CharField(max_length=128, choices=frequency, default='None')
    time_of_day_occurs = models.CharField(max_length=128, choices=time_of_the_day)
    
    class Meta:
        db_table = "resistant_actions"
        verbose_name = 'Reactive Behavior'
        verbose_name_plural = 'Reactive Behaviors'

# VISION DIAGNOSES #
class Vision_Diagnoses(models.Model):
    vision_problem = models.CharField(max_length=512)

    def __str__(self):
        return self.vision_problem
    
    class Meta:
        db_table = "vision_diagnoses" 
        verbose_name = 'Vision Diagnoses'
        verbose_name_plural = 'Vision Diagnoses' 