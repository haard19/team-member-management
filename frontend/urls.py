from django.urls import path
from .views import index

urlpatterns = [
    path('list', index),
    path('add', index),
    path('edit', index),
]
