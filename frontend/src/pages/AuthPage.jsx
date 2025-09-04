import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyOtp from "./Verifyotp";

const FORMS = {
  LOGIN: "login",
  SIGNUP: "signup",
  FORGOT: "forgot",
  RESET: "reset",
  VERIFY_OTP: "verifyOtp",
};

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState(FORMS.LOGIN);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {activeForm === FORMS.LOGIN && <Login switchForm={setActiveForm} FORMS={FORMS} />}
        {activeForm === FORMS.SIGNUP && <Signup switchForm={setActiveForm} FORMS={FORMS} />}
        {activeForm === FORMS.FORGOT && <ForgotPassword switchForm={setActiveForm} FORMS={FORMS} />}
        {activeForm === FORMS.RESET && <ResetPassword switchForm={setActiveForm} FORMS={FORMS} />}
        {activeForm === FORMS.VERIFY_OTP && <VerifyOtp switchForm={setActiveForm} FORMS={FORMS} />}
      </div>
    </div>
  );
}
