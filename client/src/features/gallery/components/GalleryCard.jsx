export default function GalleryCard({ artwork }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <img
        src={artwork.image}
        alt={artwork.title}
        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold text-white">
          {artwork.title}
        </h3>

        <p className="mt-2 text-amber-400">
          {artwork.category}
        </p>

      </div>

    </div>
  );
}