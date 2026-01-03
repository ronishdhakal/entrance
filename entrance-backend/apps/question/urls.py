from django.urls import path
from .views import (
    section_list_create,
    section_detail,
    topic_list_create,
    topic_detail,
    subtopic_list_create,
    subtopic_detail,
    question_list_create,
    question_detail,
    program_hierarchy,  # Added new view
)

urlpatterns = [
    path("hierarchy/<int:program_id>/", program_hierarchy),
    
    path("sections/", section_list_create),
    path("sections/<int:id>/", section_detail),
    path("topics/", topic_list_create),
    path("topics/<int:id>/", topic_detail),
    path("subtopics/", subtopic_list_create),
    path("subtopics/<int:id>/", subtopic_detail),
    path("questions/", question_list_create),
    path("questions/<int:id>/", question_detail),
]
