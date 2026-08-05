import { useState } from "react";

import GallerySearch from "./GallerySearch";
import GalleryFilter from "./GalleryFilter";
import GalleryGrid from "./GalleryGrid";

import galleryData from "../data/galleryData";

export default function GallerySection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArtworks = galleryData.filter((artwork) => {
    const matchesCategory =
      selectedCategory === "All" ||
      artwork.category === selectedCategory;

    const matchesSearch = artwork.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <GallerySearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <GalleryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <GalleryGrid artworks={filteredArtworks} />
    </>
  );
}