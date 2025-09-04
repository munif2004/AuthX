import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await forgotPassword({ email });
    toast.success("Redirecting to reset password...");
    
    // ✅ redirect using resetLink from backend
    window.location.href = res.data.resetLink;
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-3 w-full"/>
        <button type="submit" className="bg-yellow-500 text-white p-2 w-full rounded">Send Reset Link</button>
      </form>
    </div>
  );
}
