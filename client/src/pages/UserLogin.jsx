import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // EMAIL / PASSWORD LOGIN
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Login failed. Please try again."
        );
        return;
      }

      // Store customer authentication
      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/account");
    } catch (error) {
      console.error("Login Error:", error);
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  const handleGoogleResponse = async (response) => {
    try {
      setError("");
      setLoading(true);

      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
          }),
        }
      );

      const data = await result.json();

      if (!result.ok || !data.success) {
        setError(
          data.message ||
            "Google login failed. Please try again."
        );
        return;
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/account");
    } catch (error) {
      console.error("Google Login Error:", error);

      setError(
        "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD GOOGLE IDENTITY SERVICES
  // ==========================================

  useEffect(() => {
    const initializeGoogle = () => {
      if (
        !window.google ||
        !googleButtonRef.current
      ) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id:
          import.meta.env.VITE_GOOGLE_CLIENT_ID,

        callback: handleGoogleResponse,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 360,
          text: "continue_with",
          shape: "rectangular",
        }
      );
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    const existingScript =
      document.getElementById(
        "google-identity-script"
      );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        initializeGoogle
      );

      return () => {
        existingScript.removeEventListener(
          "load",
          initializeGoogle
        );
      };
    }

    const script =
      document.createElement("script");

    script.id = "google-identity-script";
    script.src =
      "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);


  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md">

        {/* Header */}

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-amber-400 text-sm">
            Sundhar Karthick Art Gallery
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-400">
            Sign in to access your account and saved artworks.
          </p>

        </div>


        {/* Login Card */}

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          {/* Login Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
              />

            </div>


            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-16 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-amber-400"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg py-3 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-slate-700"
                  : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:scale-[1.01]"
              }`}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>


          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-700" />

            <span className="text-sm text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-700" />

          </div>


          {/* Google Button */}

          <div className="flex justify-center">

            <div
              ref={googleButtonRef}
              className="min-h-[44px]"
            />

          </div>


          {/* Signup */}

          <p className="mt-8 text-center text-sm text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-amber-400 hover:text-amber-300"
            >
              Create Account
            </Link>

          </p>

        </div>


        {/* Back Home */}

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-slate-500 transition hover:text-amber-400"
          >
            ← Back to Gallery
          </Link>

        </div>

      </div>

    </div>
  );
}