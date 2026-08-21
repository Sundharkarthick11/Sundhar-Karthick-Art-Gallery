import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedArtworks() {
  const navigate = useNavigate();

  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedArtworks();
  }, []);

  const fetchSavedArtworks = async () => {
    try {
      const token =
        localStorage.getItem("userToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/saved-artworks`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      if (data.success) {
  console.log(data.artworks);
  setSavedItems(data.artworks);
}
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading saved artworks...
      </div>
    );
  }

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
                key={artwork._id}
                className="overflow-hidden rounded-2xl bg-slate-900"
              >
                <img
                  src={artwork.imageUrl}
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