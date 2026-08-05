export default function GallerySearch() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <input
        type="text"
        placeholder="Search artworks..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none"
      />
    </div>
  );
}