import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Artist Image Placeholder */}
        <div className="flex justify-center">
  <img
    src="/artist.jpeg"
    alt="Sundhar Karthick"
    className="h-[300px] w-[240px] object-cover rounded-3xl border border-slate-700 shadow-xl"
  />
</div>

        {/* About Content */}
        <div>

          <p className="text-amber-400 uppercase tracking-[0.25em]">
            About The Artist
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Sundhar Karthick
          </h2>

          <p className="mt-8 text-slate-300 leading-8">
            Every portrait tells a story.
            Every sketch preserves a memory.

            I specialize in handcrafted portraits,
            graphite art, charcoal art, pixel art,
            and custom artworks created with
            precision, patience, and passion.
          </p>

          <p className="mt-6 text-slate-400">
            My goal is to transform your precious
            moments into timeless pieces of art that
            will be cherished forever.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-10 bg-amber-500 hover:bg-amber-600 transition px-8 py-3 rounded-xl text-white"
          >
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}