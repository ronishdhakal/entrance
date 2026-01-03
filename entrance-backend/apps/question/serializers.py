from rest_framework import serializers
from .models import Section, Topic, SubTopic, Question, Option


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class SubTopicSerializer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = SubTopic
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return {
            "program": {"id": obj.topic.section.program.id, "name": obj.topic.section.program.abbreviation},
            "section": {"id": obj.topic.section.id, "title": obj.topic.section.title},
            "topic": {"id": obj.topic.id, "title": obj.topic.title}
        }


class SubTopicHierarchySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTopic
        fields = ["id", "title"]


class TopicHierarchySerializer(serializers.ModelSerializer):
    subtopics = SubTopicHierarchySerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ["id", "title", "subtopics"]


class SectionHierarchySerializer(serializers.ModelSerializer):
    topics = TopicHierarchySerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ["id", "title", "order", "topics"]


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "option_text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = "__all__"

    def validate(self, data):
        program = data["program"]
        section = data["section"]
        topic = data.get("topic")
        sub_topic = data.get("sub_topic")

        if section.program_id != program.id:
            raise serializers.ValidationError(
                "Selected section does not belong to the selected program."
            )

        if topic and topic.section_id != section.id:
            raise serializers.ValidationError(
                "Selected topic does not belong to the selected section."
            )

        if sub_topic:
            if not topic:
                raise serializers.ValidationError(
                    "SubTopic cannot be selected without Topic."
                )
            if sub_topic.topic_id != topic.id:
                raise serializers.ValidationError(
                    "Selected SubTopic does not belong to selected Topic."
                )

        return data

    def create(self, validated_data):
        options_data = validated_data.pop("options")
        question = Question.objects.create(**validated_data)

        for option in options_data:
            Option.objects.create(question=question, **option)

        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop("options", None)
        
        # Update question fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Handle options if provided
        if options_data is not None:
            instance.options.all().delete()
            for option in options_data:
                Option.objects.create(question=instance, **option)
        
        return instance
