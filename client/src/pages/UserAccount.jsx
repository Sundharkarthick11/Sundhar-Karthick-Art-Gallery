import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function UserAccount() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  console.log("USER DATA:", user);

  
  
  const handleChangePassword = async () => {
  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    alert("Please fill all fields.");
    return;
  }
console.log("New:", newPassword);
console.log("Confirm:", confirmPassword);

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const token =
      localStorage.getItem("userToken");
    

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Password updated successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
  const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");
const [showCurrentPassword, setShowCurrentPassword] =
  useState(false);

const [showNewPassword, setShowNewPassword] =
  useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <p className="uppercase tracking-[0.25em] text-amber-400 text-sm">
              My Account
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-slate-400">
              {user.email}
            </p>
          </div>

          

        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Profile */}

          {/* Profile */}
<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col items-center justify-center text-center">

 {(user.profileImage || user.photoURL) ? (
  <img
    src={user.profileImage || user.photoURL}
    alt={user.name}
    className="h-20 w-20 rounded-full object-cover"
  />
) : (
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-white">
    {user.name?.charAt(0).toUpperCase()}
  </div>
)}

  <h2 className="mt-4 text-xl font-semibold">
    {user.name}
  </h2>

  <p className="mt-2 text-slate-400 break-all">
    {user.email}
  </p>

</div>
          {/* Saved Artworks */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="text-4xl">
              ❤️
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              Saved Artworks
            </h2>

           <p className="mt-2 text-slate-400">
  View your saved artwork collection
</p>

            <button
              onClick={() => navigate("/saved-artworks")}
              className="mt-5 text-amber-400 hover:text-amber-300"
            >
              View Saved Artworks →
            </button>

          </div>

          {/* Orders */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="text-4xl">
              📦
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              My Orders
            </h2>

            <p className="mt-2 text-slate-400">
              Track your portrait orders.
            </p>

           <button
  onClick={() => navigate("/my-orders")}
  className="mt-5 text-amber-400 hover:text-amber-300"
>
  View Orders →
</button>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-400">
            Explore artwork collections and order custom portraits.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/gallery")}
              className="rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              Explore Gallery
            </button>

            <button
  onClick={() => navigate("/order")}
  className="rounded-lg border border-slate-700 px-6 py-3 text-white transition hover:border-amber-400"
>
  Order Portrait
</button>

          </div>

        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

  <h2 className="text-2xl font-bold">
    Change Password
  </h2>

  <p className="mt-2 text-slate-400">
    Update your account password securely.
  </p>

<div className="mt-6 space-y-4">

  {/* Current Password */}
  <div className="relative">
    <input
      type={showCurrentPassword ? "text" : "password"}
      placeholder="Current Password"
      value={currentPassword}
      onChange={(e) =>
        setCurrentPassword(e.target.value)
      }
      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
    />

    <button
  type="button"
  onClick={() =>
    setShowCurrentPassword(
      !showCurrentPassword
    )
  }
  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400"
>
  {showCurrentPassword ? (
    <FaEyeSlash size={18} />
  ) : (
    <FaEye size={18} />
  )}
</button>
  </div>

  {/* New Password */}
  <div className="relative">
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(e.target.value)
    }
    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
  />

  <button
    type="button"
    onClick={() =>
      setShowNewPassword(!showNewPassword)
    }
    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400"
  >
    {showNewPassword ? (
      <FaEyeSlash size={18} />
    ) : (
      <FaEye size={18} />
    )}
  </button>
</div>

  {/* Confirm Password */}
 <div className="relative">
  <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(e.target.value)
    }
    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400"
  >
    {showConfirmPassword ? (
      <FaEyeSlash size={18} />
    ) : (
      <FaEye size={18} />
    )}
  </button>
</div>

  <button
    onClick={handleChangePassword}
    className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600"
  >
    Update Password
  </button>

</div>
  </div>

      </div>
    </div>
  );
}