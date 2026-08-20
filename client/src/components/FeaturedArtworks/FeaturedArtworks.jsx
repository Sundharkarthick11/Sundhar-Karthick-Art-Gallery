import { useEffect, useState } from "react";

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

  const fetchFeaturedArtworks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/artworks/featured"
      );

      const data = await response.json();

      if (data.success) {
        setArtworks(data.artworks);
      }
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="text-center mt-12 text-slate-400">
            Loading artworks...
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center mt-12 text-slate-400">
            No featured artworks available.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {artworks.map((art) => (
              <div
                key={art._id}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 transition duration-300"
              >

                {/* Artwork Image */}
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="h-64 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x800?text=Artwork";
                  }}
                />

                {/* Artwork Details */}
                <div className="p-6">

                  <h3 className="text-xl font-semibold">
                    {art.title}
                  </h3>

                

                  {art.description && (
                    <p className="text-slate-500 mt-3 text-sm line-clamp-3">
                      {art.description}
                    </p>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}