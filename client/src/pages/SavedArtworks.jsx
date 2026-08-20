import galleryData from "../features/gallery/data/galleryData";

export default function SavedArtworks() {
  const savedArtworks = JSON.parse(
    localStorage.getItem("savedArtworks") || "[]"
  );

  const savedItems = galleryData.filter((artwork) =>
    savedArtworks.includes(artwork.id)
  );

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-4 text-4xl font-bold text-white">
          ❤️ Saved Artworks
        </h1>

        <p className="mb-10 text-slate-400">
          Your favorite artworks saved for later.
        </p>

        {savedItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No Saved Artworks
            </h2>

            <p className="mt-3 text-slate-400">
              Browse the gallery and save your favorite artworks.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedItems.map((artwork) => (
              <div
                key={artwork.id}
                className="overflow-hidden rounded-2xl bg-slate-900"
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="h-80 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {artwork.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {artwork.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}