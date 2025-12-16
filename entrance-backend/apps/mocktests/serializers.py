from rest_framework import serializers
from .models import MockTest, Section, Question, Option


# =========================
# PUBLIC SERIALIZERS (Read-only for students)
# =========================
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = (
            "id",
            "option_text",
            "is_correct",
        )
        read_only_fields = fields


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "question_text",
            "marks",
            "negative_marks",
            "order",
            "options",
        )
        read_only_fields = fields


class SectionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "title",
            "order",
            "total_questions",
            "is_optional",
            "optional_group",
            "questions",
        )
        read_only_fields = fields


class MockTestSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    program_name = serializers.CharField(source='program.name', read_only=True)
    program_abbreviation = serializers.CharField(source='program.abbreviation', read_only=True)

    class Meta:
        model = MockTest
        fields = (
            "id",
            "program",
            "program_name",
            "program_abbreviation",
            "title",
            "slug",
            "duration",
            "instructions",
            "is_published",
            "sections",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


# =========================
# ADMIN SERIALIZERS (Full CRUD for staff)
# =========================
class AdminOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'option_text', 'is_correct')


class AdminQuestionSerializer(serializers.ModelSerializer):
    options = AdminOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'question_text', 'marks', 'negative_marks', 'order', 'options')

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options', None)
        
        # Update question fields
        instance.question_text = validated_data.get('question_text', instance.question_text)
        instance.marks = validated_data.get('marks', instance.marks)
        instance.negative_marks = validated_data.get('negative_marks', instance.negative_marks)
        instance.order = validated_data.get('order', instance.order)
        instance.save()

        # Update options if provided
        if options_data is not None:
            # Delete existing options
            instance.options.all().delete()
            # Create new options
            for option_data in options_data:
                Option.objects.create(question=instance, **option_data)

        return instance


class AdminSectionSerializer(serializers.ModelSerializer):
    questions = AdminQuestionSerializer(many=True)

    class Meta:
        model = Section
        fields = ('id', 'title', 'order', 'total_questions', 'is_optional', 'optional_group', 'questions')

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        section = Section.objects.create(**validated_data)
        for question_data in questions_data:
            options_data = question_data.pop('options', [])
            question = Question.objects.create(section=section, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        return section

    def update(self, instance, validated_data):
        questions_data = validated_data.pop('questions', None)
        
        # Update section fields
        instance.title = validated_data.get('title', instance.title)
        instance.order = validated_data.get('order', instance.order)
        instance.total_questions = validated_data.get('total_questions', instance.total_questions)
        instance.is_optional = validated_data.get('is_optional', instance.is_optional)
        instance.optional_group = validated_data.get('optional_group', instance.optional_group)
        instance.save()

        # Update questions if provided
        if questions_data is not None:
            # Delete existing questions (and their options via CASCADE)
            instance.questions.all().delete()
            # Create new questions
            for question_data in questions_data:
                options_data = question_data.pop('options', [])
                question = Question.objects.create(section=instance, **question_data)
                for option_data in options_data:
                    Option.objects.create(question=question, **option_data)

        return instance


class AdminMockTestSerializer(serializers.ModelSerializer):
    sections = AdminSectionSerializer(many=True)

    class Meta:
        model = MockTest
        fields = ('id', 'program', 'title', 'slug', 'duration', 'instructions', 'is_published', 'sections')

    def create(self, validated_data):
        sections_data = validated_data.pop('sections', [])
        mock_test = MockTest.objects.create(**validated_data)
        
        for section_data in sections_data:
            questions_data = section_data.pop('questions', [])
            section = Section.objects.create(mock_test=mock_test, **section_data)
            
            for question_data in questions_data:
                options_data = question_data.pop('options', [])
                question = Question.objects.create(section=section, **question_data)
                
                for option_data in options_data:
                    Option.objects.create(question=question, **option_data)
        
        return mock_test

    def update(self, instance, validated_data):
        sections_data = validated_data.pop('sections', None)
        
        # Update mock test fields
        instance.program = validated_data.get('program', instance.program)
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.instructions = validated_data.get('instructions', instance.instructions)
        instance.is_published = validated_data.get('is_published', instance.is_published)
        instance.save()

        # Update sections if provided
        if sections_data is not None:
            # Delete existing sections (and their questions/options via CASCADE)
            instance.sections.all().delete()
            # Create new sections
            for section_data in sections_data:
                questions_data = section_data.pop('questions', [])
                section = Section.objects.create(mock_test=instance, **section_data)
                
                for question_data in questions_data:
                    options_data = question_data.pop('options', [])
                    question = Question.objects.create(section=section, **question_data)
                    
                    for option_data in options_data:
                        Option.objects.create(question=question, **option_data)

        return instance
