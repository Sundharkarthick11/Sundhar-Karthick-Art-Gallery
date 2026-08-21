import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      setLoading(false);

      if (data.success) {
        localStorage.setItem("adminToken", data.token);

        alert("Login Successful!");

        navigate("/admin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <form
        onSubmit={login}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-10"
      >
        <h1 className="text-4xl font-bold text-center text-amber-400">
          Admin Login
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Sundhar Karthick Art Gallery
        </p>

        {/* Email */}
        <div className="mt-8">
          <label className="block text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-amber-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mt-6">
          <label className="block text-gray-300 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-amber-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;