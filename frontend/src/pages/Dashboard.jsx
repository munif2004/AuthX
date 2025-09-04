import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
        setUser(res.data.user); // assuming your backend sends user info
      } catch (err) {
        setMessage(err.response?.data?.message || err.message);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="max-w-3xl w-full bg-gray-800/60 rounded-2xl shadow-xl p-8 backdrop-blur-md border border-gray-700">
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-4 text-center text-indigo-400">
          {message || "Welcome to your Dashboard"}
        </h1>

        {/* User Info */}
        {user ? (
          <div className="space-y-3 text-gray-300 text-lg">
            <p>
              <span className="font-semibold text-indigo-300">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-indigo-300">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading user data...</p>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold shadow-md"
          >
            Logout
          </button>

          <button
            onClick={() => alert("Feature coming soon! 🚀")}
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-md"
          >
            New Feature
          </button>
        </div>
      </div>
    </div>
  );
}
