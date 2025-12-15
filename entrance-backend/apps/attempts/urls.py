from django.urls import path
from .views import (
    StartAttemptView,
    SubmitAnswerView,
    SubmitExamView,
    AttemptQuestionsView,
    AttemptHistoryView,
    AttemptResultView,
)

urlpatterns = [
    path('start/', StartAttemptView.as_view(), name='start-attempt'),
    path('history/', AttemptHistoryView.as_view()),               # 👈

    path('<int:attempt_id>/questions/', AttemptQuestionsView.as_view()),  
    path('<int:attempt_id>/answer/', SubmitAnswerView.as_view(), name='submit-answer'),
    path('<int:attempt_id>/submit/', SubmitExamView.as_view(), name='submit-exam'),
    path('<int:attempt_id>/result/', AttemptResultView.as_view()), # 👈

]
