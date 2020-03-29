from django.contrib import admin
from django.urls import path
from django.urls import include

from TR_API import views

urlpatterns = [
    path('', admin.site.urls),
    path('api/', include('TR_API.urls')),
]
