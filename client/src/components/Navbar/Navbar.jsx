import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-amber-400"
        >
          Sundhar Karthick
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/" className="hover:text-amber-400 transition">
            Home
          </Link>

          <Link to="/gallery" className="hover:text-amber-400 transition">
            Gallery
          </Link>

          <Link to="/order" className="hover:text-amber-400 transition">
            Order Portrait
          </Link>

          <Link to="/contact" className="hover:text-amber-400 transition">
            Contact
          </Link>

        </div>

      </div>
    </nav>
  );
}