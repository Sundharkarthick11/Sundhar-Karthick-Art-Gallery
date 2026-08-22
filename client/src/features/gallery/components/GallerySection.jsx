import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GallerySearch from "./GallerySearch";
import GalleryFilter from "./GalleryFilter";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
console.log(import.meta.env.VITE_API_URL);

const galleryCategories = [
  "All",
  "Pencil Drawings",
  "Portraits",
  "Family Portraits",
  "Charcoal Art",
  "Paintings",
  "Digital Art",
  "Creative Art",
  "Pixel Art",
];

export default function GallerySection() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const [savedArtworks, setSavedArtworks] = useState([]);

  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // ==========================================
  // FETCH ARTWORKS FROM MONGODB
  // ==========================================

 useEffect(() => {
  fetchArtworks();
  fetchSavedArtworks();
}, []);

  const fetchArtworks = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/artworks`
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
const fetchSavedArtworks = async () => {
  try {
    const token =
      localStorage.getItem("userToken");

    if (!token) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/saved-artworks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
  setSavedArtworks(
    [...new Set(
      data.artworks.map(
        (art) => art._id.toString()
      )
    )]
  );
}
  } catch (error) {
    console.error(error);
  }
};

  // ==========================================
  // SAVE ARTWORKS
  // ==========================================

 

  const toggleSave = async (
  artworkId
) => {
  const token =
  localStorage.getItem("userToken");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/saved-artworks/${artworkId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data =
  await response.json();

console.log(
  "Saved artworks from API:",
  data.savedArtworks
);

if (data.success) {
  setSavedArtworks(
    data.artworks.map(
      (art) => String(art._id)
    )
  );
}
  } catch (error) {
    console.error(error);
  }
};

  const handleSavedClick = () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      navigate("/login");
      return;
    }

    setShowSavedOnly((prev) => !prev);
  };

  // ==========================================
  // FILTER ARTWORKS
  // ==========================================

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory =
      selectedCategory === "All" ||
      artwork.category === selectedCategory;

    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      artwork.title?.toLowerCase().includes(search) ||
      artwork.category?.toLowerCase().includes(search);

    const matchesSaved =
      !showSavedOnly ||
      savedArtworks.includes(artwork._id);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesSaved
    );
  });

  const getCategoryArtworks = (category) => {
    return filteredArtworks.filter(
      (artwork) => artwork.category === category
    );
  };
  if (loading) {
  return (
    <div className="py-20 text-center text-white">
      Loading artworks...
    </div>
  );
}

  const hasResults = filteredArtworks.length > 0;

  return (
    <>
      {/* Search + Saved Button */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1">
            <GallerySearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <button
            type="button"
            onClick={handleSavedClick}
            className={`rounded-full border px-6 py-3 font-medium transition ${
              showSavedOnly
                ? "bg-red-500 border-red-500 text-white"
                : "bg-slate-900 border-slate-700 text-white hover:border-red-400 hover:text-red-400"
            }`}
          >
            ♥ Saved Artworks
            {savedArtworks.length > 0 &&
              ` (${savedArtworks.length})`}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      {!showSavedOnly && (
        <GalleryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {selectedCategory === "All" && !showSavedOnly ? (
          <div className="space-y-20">
            {galleryCategories.map((category) => {
              const artworks = getCategoryArtworks(category);

              if (artworks.length === 0) return null;

              return (
                <section key={category}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white">
                      {category}
                    </h2>

                    <div className="mt-4 h-px bg-slate-800" />
                  </div>

                  <GalleryGrid
                    artworks={artworks}
                    onViewDetails={setSelectedArtwork}
                    savedArtworks={savedArtworks}
                    onToggleSave={toggleSave}
                  />
                </section>
              );
            })}
          </div>
        ) : (
          <GalleryGrid
            artworks={filteredArtworks}
            onViewDetails={setSelectedArtwork}
            savedArtworks={savedArtworks}
            onToggleSave={toggleSave}
          />
        )}

        {!hasResults && (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-400">
              No artworks found.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <GalleryModal
        artwork={selectedArtwork}
        artworks={filteredArtworks}
        onClose={() => setSelectedArtwork(null)}
        onChangeArtwork={setSelectedArtwork}
      />
    </>
  );
}