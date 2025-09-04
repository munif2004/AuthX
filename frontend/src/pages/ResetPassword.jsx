import { useState } from "react";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  // ✅ define form state
  const [form, setForm] = useState({ password: "" });

  // ✅ extract token from URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({
        token,
        newPassword: form.password, // ✅ using state properly
      });
      toast.success(res.data.message);
   
    
    // ✅ Navigate immediately
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="text"
          name="token"
          placeholder="Reset Token"
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
