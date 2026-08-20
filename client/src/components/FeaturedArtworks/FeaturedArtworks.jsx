const artworks = [
  {
    id: 1,
    title: "Graphite Art",
  },
  {
    id: 2,
    title: "Charcoal Art",
  },
  {
    id: 3,
    title: "Pixel Art",
  },
];

export default function FeaturedArtworks() {
  return (
    <section className="bg-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          Featured{" "}
          <span className="text-amber-400">
            Artworks
          </span>
        </h2>

        <p className="text-slate-400 text-center mt-4">
          A glimpse of handcrafted artworks created with passion.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 transition duration-300"
            >

              {/* Artwork Image */}
              <div className="h-64 bg-slate-800 flex items-center justify-center text-slate-500">
                Artwork Image
              </div>

              {/* Artwork Name */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {art.title}
                </h3>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}