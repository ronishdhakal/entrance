from rest_framework import serializers
from .models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'id',
            'title',
            'abbreviation',
            'slug',
            'description',
            'external_link',
            'is_active',
        )
