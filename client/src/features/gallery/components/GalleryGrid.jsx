import GalleryCard from "./GalleryCard";

export default function GalleryGrid({
  artworks,
  onViewDetails,
  savedArtworks,
  onToggleSave,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => (
        <GalleryCard
          key={artwork._id}
          artwork={artwork}
          onViewDetails={onViewDetails}
          isSaved={savedArtworks.includes(
  String(artwork._id)
)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}