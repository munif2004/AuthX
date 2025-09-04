import { useState } from "react";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function ResetPassword({ switchForm, FORMS }) {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ token, newPassword: password });
      toast.success("Password reset successful!");
      switchForm(FORMS.LOGIN);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="text"
        placeholder="Reset Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mb-2">
        Reset Password
      </button>
    </form>
  );
}
