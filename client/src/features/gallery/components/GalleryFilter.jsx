const categories = [
  "All",
  "Pencil Drawing",
  "Portrait",
  "Painting",
  "Charcoal Art",
  "Digital Art",
  "Color Pencil",
];

export default function GalleryFilter({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full border transition duration-300 ${
            selectedCategory === category
              ? "bg-amber-500 border-amber-500 text-white"
              : "bg-slate-900 border-slate-700 text-white hover:border-amber-400 hover:text-amber-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}