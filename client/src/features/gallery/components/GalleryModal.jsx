import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function GalleryModal({
  artwork,
  artworks,
  onClose,
  onChangeArtwork,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  const currentIndex = artworks.findIndex(
    (item) => item.id === artwork.id
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onChangeArtwork(artworks[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < artworks.length - 1) {
      onChangeArtwork(artworks[currentIndex + 1]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-slate-800 p-2 text-white transition hover:bg-slate-700"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="grid md:grid-cols-2">

          {/* Artwork Image */}
          <div className="h-[500px] bg-black">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Artwork Details */}
          <div className="flex flex-col justify-center p-8">

            {/* Artwork Title */}
            <h2 className="text-3xl font-bold text-white">
              {artwork.title}
            </h2>

            {/* Description */}
            <p className="mt-6 leading-8 text-slate-300">
              {artwork.description}
            </p>

            {/* Navigation */}
            <div className="mt-10">

              <div className="flex items-center justify-between gap-4">

                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="rounded-lg border border-slate-600 px-5 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === artworks.length - 1}
                  className="rounded-lg border border-slate-600 px-5 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>

              </div>

              {/* Order Button */}
              <div className="mt-8 flex justify-center">

                <button
                  onClick={() => navigate("/order")}
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3 font-medium text-white transition hover:scale-105"
                >
                  Order Similar Portrait
                </button>

              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}