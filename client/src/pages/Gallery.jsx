import GallerySearch from "../features/gallery/components/GallerySearch";
import GalleryGrid from "../features/gallery/components/GalleryGrid";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-950">
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold text-white">
          Our <span className="text-amber-400">Gallery</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Browse handcrafted portraits, paintings and sketches.
        </p>
      </section>

      <GallerySearch />

      <GalleryGrid />
    </div>
  );
}