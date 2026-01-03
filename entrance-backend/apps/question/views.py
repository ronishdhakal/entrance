from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Section, Topic, SubTopic, Question, Option
from .serializers import (
    SectionSerializer,
    TopicSerializer,
    SubTopicSerializer,
    QuestionSerializer,
    SectionHierarchySerializer,  # Added new serializer
)


@api_view(["GET"])
def program_hierarchy(request, program_id):
    """
    Returns the nested structure of a program for the admin folder view.
    """
    sections = Section.objects.filter(program_id=program_id).prefetch_related(
        'topics__subtopics'
    )
    serializer = SectionHierarchySerializer(sections, many=True)
    return Response(serializer.data)


# ===========================
# SECTION ENDPOINTS
# ===========================

@api_view(["GET", "POST"])
def section_list_create(request):
    if request.method == "GET":
        program_id = request.GET.get("program")
        qs = Section.objects.all()
        if program_id:
            qs = qs.filter(program_id=program_id)
        return Response(SectionSerializer(qs, many=True).data)

    serializer = SectionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def section_detail(request, id):
    try:
        section = Section.objects.get(id=id)
    except Section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(SectionSerializer(section).data)

    if request.method == "PUT":
        serializer = SectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ===========================
# TOPIC ENDPOINTS
# ===========================

@api_view(["GET", "POST"])
def topic_list_create(request):
    if request.method == "GET":
        section_id = request.GET.get("section")
        qs = Topic.objects.all()
        if section_id:
            qs = qs.filter(section_id=section_id)
        return Response(TopicSerializer(qs, many=True).data)

    serializer = TopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def topic_detail(request, id):
    try:
        topic = Topic.objects.get(id=id)
    except Topic.DoesNotExist:
        return Response({"error": "Topic not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(TopicSerializer(topic).data)

    if request.method == "PUT":
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ===========================
# SUBTOPIC ENDPOINTS
# ===========================

@api_view(["GET", "POST"])
def subtopic_list_create(request):
    if request.method == "GET":
        topic_id = request.GET.get("topic")
        qs = SubTopic.objects.all()
        if topic_id:
            qs = qs.filter(topic_id=topic_id)
        return Response(SubTopicSerializer(qs, many=True).data)

    serializer = SubTopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def subtopic_detail(request, id):
    try:
        subtopic = SubTopic.objects.get(id=id)
    except SubTopic.DoesNotExist:
        return Response({"error": "SubTopic not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(SubTopicSerializer(subtopic).data)

    if request.method == "PUT":
        serializer = SubTopicSerializer(subtopic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        subtopic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ===========================
# QUESTION ENDPOINTS
# ===========================

@api_view(["GET", "POST"])
def question_list_create(request):
    if request.method == "GET":
        qs = Question.objects.all()

        program = request.GET.get("program")
        section = request.GET.get("section")
        topic = request.GET.get("topic")
        sub_topic = request.GET.get("sub_topic")

        if program:
            qs = qs.filter(program_id=program)
        if section:
            qs = qs.filter(section_id=section)
        if topic:
            qs = qs.filter(topic_id=topic)
        if sub_topic:
            qs = qs.filter(sub_topic_id=sub_topic)

        return Response(QuestionSerializer(qs, many=True).data)

    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def question_detail(request, id):
    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(QuestionSerializer(question).data)

    if request.method == "PUT":
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
