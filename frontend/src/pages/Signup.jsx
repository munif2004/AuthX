import { useState } from "react";
import { signup } from "../services/authService";
import { toast } from "react-toastify";

export default function Signup({ switchForm, FORMS }) {
  const [form, setForm] = useState({ email: "", phone: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      toast.success(res.data.message + " OTP: " + res.data.otp);
      switchForm(FORMS.VERIFY_OTP);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 mb-3 w-full"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 mb-3 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 mb-3 w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mb-2">
        Signup
      </button>

      <p className="text-sm mt-2">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => switchForm(FORMS.LOGIN)}>
          Login
        </span>
      </p>
    </form>
  );
}
