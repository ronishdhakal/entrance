from django.contrib import admin
from .models import MockTest, Section, Question, Option


class OptionInline(admin.TabularInline):
    model = Option
    extra = 4


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


class SectionInline(admin.TabularInline):
    model = Section
    extra = 1


@admin.register(MockTest)
class MockTestAdmin(admin.ModelAdmin):
    list_display = ('title', 'program', 'duration', 'is_published')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SectionInline]


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'mock_test', 'order', 'is_optional')
    ordering = ('mock_test', 'order')
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('section', 'order', 'marks')
    ordering = ('section', 'order')
    inlines = [OptionInline]
