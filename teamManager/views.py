from django.shortcuts import render
from .models import Member
from .serializers import MemberSerializer, AddMemberSerializer
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response 
from django.views.decorators.csrf import csrf_exempt

class MemberView(generics.ListAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        memid = self.kwargs.get('id') 
        print(self.kwargs)
        if not memid:
            return Member.objects.all()
        return Member.objects.filter(pk=memid)
    

class AddMemberView(APIView):
    serializer_class= AddMemberSerializer
    
    @csrf_exempt
    def post(self, request):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()
        id = None
        if 'id' in request.data:
            id = request.data['id']
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print(serializer.data)
            firstname = serializer.data.get('firstname')
            lastname = serializer.data.get('lastname')
            phone = serializer.data.get('phone')
            email = serializer.data.get('email')
            role = serializer.data.get('role')

            if id:
                if Member.objects.filter(pk=id).exists():
                    member = Member.objects.get(pk=id)
                    member.firstname = firstname
                    member.lastname = lastname
                    member.phone = phone
                    member.email = email
                    member.role = role
                    member.save()
            else:
                member = Member(firstname=firstname, lastname=lastname, email=email, phone=phone, role=role)
                member.save()

            return Response(MemberSerializer(member).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

class DeleteMemberView(APIView):
    def post(self, request):
        try:
            id = request.data['id']
            member = Member.objects.get(pk=id)
            member.delete()
            return Response(MemberSerializer(member).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)