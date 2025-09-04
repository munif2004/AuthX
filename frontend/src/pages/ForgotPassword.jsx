import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function ForgotPassword({ switchForm, FORMS }) {
  const [email, setEmail] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await forgotPassword({ email }); // capture response
    toast.success(res.data.message);

    // show reset link in console for testing
    console.log("Reset Link:", res.data.resetLink);

    switchForm(FORMS.RESET);
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <button type="submit" className="bg-yellow-500 text-white p-2 w-full rounded mb-2">
        Send Reset Link
      </button>
      <p className="text-sm mt-2">
        Back to login?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => switchForm(FORMS.LOGIN)}>
          Login
        </span>
      </p>
    </form>
  );
}
