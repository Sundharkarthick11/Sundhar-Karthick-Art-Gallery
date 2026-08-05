import GalleryCard from "./GalleryCard";

export default function GalleryGrid({
  artworks,
  onViewDetails,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <GalleryCard
  key={artwork.id}
  artwork={artwork}
  onViewDetails={onViewDetails}
/>
        ))}
      </div>
    </div>
  );
}