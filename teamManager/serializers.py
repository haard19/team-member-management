from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'firstname', 'lastname', 'phone', 'email', 'role')

class AddMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('firstname', 'lastname', 'phone', 'email', 'role')