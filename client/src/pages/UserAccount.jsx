import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const savedArtworks = JSON.parse(
    localStorage.getItem("savedArtworks") || "[]"
  );

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

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

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>

        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Profile */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-4">

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-400">
                  {user.email}
                </p>
              </div>

            </div>

          </div>

          {/* Saved Artworks */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="text-4xl">
              ❤️
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              Saved Artworks
            </h2>

            <p className="mt-2 text-4xl font-bold text-amber-400">
              {savedArtworks.length}
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
              onClick={() => navigate("/track-order")}
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
              onClick={() => navigate("/my-orders")}
              className="rounded-lg border border-slate-700 px-6 py-3 text-white transition hover:border-amber-400"
            >
              Order Portrait
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}