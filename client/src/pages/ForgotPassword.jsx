import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Password reset email sent.");
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="text-slate-400 mt-2">
          Enter your email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          required
        />

        <button
          type="submit"
          className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}