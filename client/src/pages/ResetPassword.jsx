import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Password reset successful."
        );

        navigate("/login");
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
          Reset Password
        </h1>

        <p className="text-slate-400 mt-2">
          Enter your new password.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full mt-6 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full mt-4 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          required
        />

        <button
          type="submit"
          className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}