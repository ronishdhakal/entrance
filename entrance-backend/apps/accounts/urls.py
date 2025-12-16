from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    LoginView,
    MeView,
    ForgotPasswordView,
    VerifyResetOTPView,
    ResetPasswordView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # 🔐 Forgot password
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("verify-reset-otp/", VerifyResetOTPView.as_view(), name="verify_reset_otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
]
