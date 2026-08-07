import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-amber-400"
        >
          Sundhar Karthick
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-amber-400 font-semibold"
                : "text-gray-300 hover:text-amber-400 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive
                ? "text-amber-400 font-semibold"
                : "text-gray-300 hover:text-amber-400 transition"
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive
                ? "text-amber-400 font-semibold"
                : "text-gray-300 hover:text-amber-400 transition"
            }
          >
            Order Portrait
          </NavLink>

          <NavLink
            to="/track-order"
            className={({ isActive }) =>
              isActive
                ? "text-amber-400 font-semibold"
                : "text-gray-300 hover:text-amber-400 transition"
            }
          >
            Track My Order
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-amber-400 font-semibold"
                : "text-gray-300 hover:text-amber-400 transition"
            }
          >
            Contact
          </NavLink>

        </div>

      </div>
    </nav>
  );
}