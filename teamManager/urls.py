from django.urls import path
from .views import MemberView, AddMemberView, DeleteMemberView

urlpatterns = [
    path('add/', AddMemberView.as_view()),
    path('list/', MemberView.as_view()),
    path('list/<int:id>', MemberView.as_view()),
    path('delete/', DeleteMemberView.as_view()),
]