import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-6 max-w-4xl">

        <h1 className="text-5xl md:text-7xl font-bold mt-6">
          Turning Memories into{" "}
          <span className="text-amber-400">
            Timeless Art.
          </span>
        </h1>

        <p className="mt-6 text-slate-300">
          Custom portraits, charcoal, graphite, pixel art,
          and handcrafted artwork made with passion.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {/* Explore Gallery */}
          <button
            onClick={() => navigate("/gallery")}
            className="bg-amber-500 px-6 py-3 rounded-xl hover:bg-amber-600 transition"
          >
            Explore Gallery
          </button>

          {/* Order Portrait */}
          <button
            onClick={() => navigate("/order")}
            className="border border-amber-400 px-6 py-3 rounded-xl hover:bg-amber-400 hover:text-slate-950 transition"
          >
            Order Portrait
          </button>

        </div>
      </div>
    </section>
  );
}