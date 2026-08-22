export default function GalleryCard({ artwork }) {
  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">

      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        loading="lazy"
        className="h-80 w-full object-cover group-hover:scale-105 transition duration-500"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold text-white">
          {artwork.title}
        </h3>

        <p className="text-amber-400 mt-2">
          {artwork.category}
        </p>

      </div>

    </div>
  );
}