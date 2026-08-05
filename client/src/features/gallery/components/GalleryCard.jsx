import { motion } from "framer-motion";

export default function GalleryCard({
  artwork,
  onViewDetails,
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
      className="group overflow-hidden rounded-2xl bg-slate-900 shadow-lg"
    >
      <div className="overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-white">
          {artwork.title}
        </h3>

        

        <button
  onClick={() => onViewDetails(artwork)}
  className="mt-6 w-full rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 py-2 font-medium text-white transition hover:scale-105"
>
  View Details
</button>
      </div>
    </motion.div>
  );
}