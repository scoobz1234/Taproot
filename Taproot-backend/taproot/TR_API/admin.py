from django.contrib import admin

from .models import Behavior
from .models import Caregiver
from .models import Encounter
from .models import Facility
from .models import Intervention
from .models import Resident

admin.site.register(Behavior)
admin.site.register(Caregiver)
admin.site.register(Encounter)
admin.site.register(Facility)
admin.site.register(Intervention)
admin.site.register(Resident)
