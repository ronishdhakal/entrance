from django.contrib import admin
from .models import Section, Topic, SubTopic, Question, Option


class OptionInline(admin.TabularInline):
    model = Option
    extra = 4


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "program",
        "section",
        "topic",
        "sub_topic",
        "marks",
        "is_active",
        "created_at",
    )
    list_filter = ("program", "section", "topic", "is_active")
    search_fields = ("question_text",)
    inlines = [OptionInline]


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "program", "title", "order")
    list_filter = ("program",)
    ordering = ("program", "order")


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("id", "section", "title")
    list_filter = ("section",)


@admin.register(SubTopic)
class SubTopicAdmin(admin.ModelAdmin):
    list_display = ("id", "topic", "title")
    list_filter = ("topic",)
