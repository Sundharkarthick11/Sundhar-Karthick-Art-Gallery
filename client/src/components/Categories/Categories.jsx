const categories = [
  "Pencil Drawings",
  "Charcoal Art",
  "Creative Art",
  "Sketches",
  "Digital Art",
  "Portraits",
];

export default function Categories() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          Art <span className="text-amber-400">Categories</span>
        </h2>

        <p className="text-center text-slate-400 mt-4">
          Browse artworks by your favorite style.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 p-8 text-center"
            >
              <h3 className="text-xl font-semibold">
                {category}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}