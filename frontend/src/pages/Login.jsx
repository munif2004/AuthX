import { useState } from "react";
import { login } from "../services/authService";
import { toast } from "react-toastify";

export default function Login({ switchForm, FORMS }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token); // store JWT
      window.location.href = "/dashboard"; // redirect to dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
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
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded mb-2">
        Login
      </button>

      <p className="text-sm mt-2">
        No account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => switchForm(FORMS.SIGNUP)}>
          Sign up
        </span>
      </p>
      <p className="text-sm mt-1">
        Forgot password?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => switchForm(FORMS.FORGOT)}>
          Click here
        </span>
      </p>
    </form>
  );
}
