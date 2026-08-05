import { Search } from "lucide-react";

export default function GallerySearch({
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none"
        />

      </div>
    </div>
  );
}