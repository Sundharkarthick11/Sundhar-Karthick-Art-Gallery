import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "Order Portrait",
      path: "/order",
    },
    {
      name: "Track My Order",
      path: "/track-order",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");

    navigate("/");
    closeMenu();

    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400 whitespace-nowrap"
        >
          Sundhar Karthick Art Gallery
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-7">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm lg:text-base transition ${
                location.pathname === link.path
                  ? "text-amber-400"
                  : "text-slate-200 hover:text-amber-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <Link
              to="/login"
              className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/saved-artworks"
                className="text-slate-200 hover:text-amber-400"
              >
                ❤️ Saved
              </Link>

              <Link
                to="/account"
                className="text-slate-200 hover:text-amber-400"
              >
                Account
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center rounded-lg border border-slate-700 px-3 py-2 text-2xl text-white hover:border-amber-400 hover:text-amber-400 transition"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}

      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">

          <div className="px-4 py-4 space-y-1">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block rounded-lg px-4 py-3 text-base transition ${
                  location.pathname === link.path
                    ? "bg-slate-900 text-amber-400"
                    : "text-slate-200 hover:bg-slate-900 hover:text-amber-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-lg bg-amber-500 px-4 py-3 text-white"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/saved-artworks"
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400"
                >
                  ❤️ Saved Artworks
                </Link>

                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400"
                >
                  My Account
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg border border-red-500 px-4 py-3 text-left text-red-400"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}