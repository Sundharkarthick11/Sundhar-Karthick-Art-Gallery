import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function GalleryCard({
  artwork,
  onViewDetails,
  isSaved,
  onToggleSave,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg"
    >
      {/* Artwork Image */}
      <div className="relative overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x800?text=Artwork";
          }}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Save Artwork Button */}
        <button
          type="button"
          onClick={() => onToggleSave(artwork._id)}
          aria-label={
            isSaved
              ? "Remove from saved artworks"
              : "Save artwork"
          }
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition hover:scale-110"
        >
          <Heart
            size={22}
            className={
              isSaved
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />
        </button>
      </div>

      {/* Artwork Details */}
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {artwork.title}
        </h3>

        

        

        <button
          onClick={() => onViewDetails(artwork)}
          className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-medium text-white transition hover:scale-[1.02]"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}