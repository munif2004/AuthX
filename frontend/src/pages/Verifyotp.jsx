import { useState } from "react";
import { verifyOtp } from "../services/authService";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const [otpData, setOtpData] = useState({ email: "", otp: "" });

  const handleChange = (e) => setOtpData({ ...otpData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp(otpData);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 mb-3 w-full"/>
        <input type="text" name="otp" placeholder="OTP" onChange={handleChange} className="border p-2 mb-3 w-full"/>
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">Verify OTP</button>
      </form>
    </div>
  );
}
