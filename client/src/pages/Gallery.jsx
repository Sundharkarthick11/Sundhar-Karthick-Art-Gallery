import GallerySection from "../features/gallery/components/GallerySection";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold">
          Our <span className="text-amber-400">Gallery</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Browse handcrafted portraits, paintings and sketches.
        </p>
      </section>

      <GallerySection />
    </div>
  );
}