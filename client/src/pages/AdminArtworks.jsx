import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "Pencil Drawings",
  "Portraits",
  "Family Portraits",
  "Charcoal Art",
  "Paintings",
  "Digital Art",
  "Creative Art",
  "Pixel Art",
];

export default function AdminArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
  useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pencil Drawings");
  const [featured, setFeatured] = useState(false);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artworks`
      );

      const data = await response.json();

      if (data.success) {
        setArtworks(data.artworks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadArtwork = async () => {
    try {
      if (!title || !image) {
        alert("Title and image required");
        return;
      }

      const formData = new FormData();

      formData.append("file", image);

      formData.append(
        "upload_preset",
        "sundhar_gallery_artworks"
      );

      const folderName = category
        .toLowerCase()
        .replace(/\s+/g, "-");

      formData.append(
        "asset_folder",
        `artworks/${folderName}`
      );

      const upload = await axios.post(
        "https://api.cloudinary.com/v1_1/cjep3tky/image/upload",
        formData
      );

      const imageUrl = upload.data.secure_url;

      const token =
        localStorage.getItem("adminToken");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/artworks/${artwork._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            imageUrl,
            featured,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Artwork uploaded!");

        resetForm();

        fetchArtworks();
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const deleteArtwork = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this artwork?"
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("adminToken");

      const response = await fetch(
        fetch(
  `${import.meta.env.VITE_API_URL}/api/artworks`
),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchArtworks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (artwork) => {
    setEditingId(artwork._id);

    setTitle(artwork.title);
    setDescription(artwork.description);
    setCategory(artwork.category);
    setFeatured(artwork.featured);

    setPreviewUrl(artwork.imageUrl);
  };

  const updateArtwork = async () => {
    try {
      const token =
        localStorage.getItem("adminToken");

      let imageUrl = previewUrl;

      if (image) {
        const formData = new FormData();

        formData.append("file", image);

        formData.append(
  "folder",
  `Sundhar-Karthick-Art-Gallery/artworks/${folderName}`
);

        const upload = await axios.post(
  "https://api.cloudinary.com/v1_1/cjep3tky/image/upload",
          formData
        );

        imageUrl = upload.data.secure_url;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artworks/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            featured,
            imageUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Artwork updated!");

        resetForm();

        fetchArtworks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setTitle("");
    setDescription("");
    setCategory("Pencil Drawings");

    setFeatured(false);

    setImage(null);
    setPreviewUrl("");
  };

  const filteredArtworks = artworks.filter(
  (artwork) => {
    const matchesSearch =
      artwork.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      artwork.category === filterCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

const toggleFeatured = async (
  artwork
) => {
  try {
    const token =
      localStorage.getItem(
        "adminToken"
      );

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/artworks/${artwork._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: artwork.title,
          description:
            artwork.description,
          category:
            artwork.category,
          imageUrl:
            artwork.imageUrl,
          featured:
            !artwork.featured,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      fetchArtworks();
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-amber-400">
          Artwork Management
        </h1>

        <p className="mt-2 text-slate-400">
          Upload and manage gallery artworks
        </p>

        <div className="mt-5 flex gap-4">
  <div className="rounded-xl bg-slate-800 px-5 py-3">
    <p className="text-sm text-slate-400">
      Total Artworks
    </p>

    <p className="text-2xl font-bold text-emerald-400">
      {artworks.length}
    </p>
  </div>

  <div className="rounded-xl bg-slate-800 px-5 py-3">
    <p className="text-sm text-slate-400">
      Featured
    </p>

    <p className="text-2xl font-bold text-amber-400">
      {
        artworks.filter(
          (art) => art.featured
        ).length
      }
    </p>
  </div>
</div>


        <div className="mt-8 grid lg:grid-cols-2 gap-8">

  {/* LEFT SIDE - ADD ARTWORK */}

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

    <h2 className="mb-6 text-3xl font-bold text-emerald-400">
      Add Artwork
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <input
        type="text"
        placeholder="Artwork Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="rounded-lg bg-slate-950 border border-slate-700 p-3"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="rounded-lg bg-slate-950 border border-slate-700 p-3"
      >
        {categories.map((cat) => (
          <option key={cat}>
            {cat}
          </option>
        ))}
      </select>

    </div>

    <textarea
      rows="4"
      placeholder="Description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
      className="mt-5 w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
    />

    <div className="mt-5">

      <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-8 hover:border-emerald-400">

        <div className="text-center">

          <p className="text-lg">
            📷 Choose Artwork Image
          </p>

          {image && (
            <p className="mt-2 text-emerald-400">
              {image.name}
            </p>
          )}

        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files[0];

            setImage(file);

            if (file) {
              setPreviewUrl(
                URL.createObjectURL(file)
              );
            }
          }}
        />

      </label>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-5 h-72 w-full rounded-xl border border-slate-700 object-cover"
        />
      )}

    </div>

    <label className="mt-5 flex items-center gap-3">
      <input
        type="checkbox"
        checked={featured}
        onChange={() =>
          setFeatured(!featured)
        }
      />
      Featured Artwork
    </label>

    <div className="mt-6 flex gap-3">

      {editingId ? (
        <>
          <button
            onClick={updateArtwork}
            className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            Update Artwork
          </button>

          <button
            onClick={resetForm}
            className="flex-1 rounded-lg bg-slate-700 py-3 font-semibold"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={uploadArtwork}
          className="w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-700"
        >
          Upload Artwork
        </button>
      )}

    </div>

  </div>

  {/* RIGHT SIDE - MANAGE ARTWORKS */}

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

    <h2 className="mb-6 text-3xl font-bold text-amber-400">
      Manage Artworks
    </h2>

    <input
      type="text"
      placeholder="Search artwork..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
    />

    <select
      value={filterCategory}
      onChange={(e) =>
        setFilterCategory(e.target.value)
      }
      className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
    >
      <option value="All">
        All Categories
      </option>

      {categories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>

    <div className="mt-6 space-y-4 max-h-[900px] overflow-y-auto pr-2">

      {filteredArtworks.map((artwork) => (

        <div
          key={artwork._id}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
        >

          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="h-56 w-full object-cover"
          />

          <div className="p-5">

            <h3 className="text-xl font-bold">
              {artwork.title}
            </h3>

            <p className="mt-2 text-slate-400">
              {artwork.category}
            </p>

            <button
              onClick={() =>
                toggleFeatured(artwork)
              }
              className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
                artwork.featured
                  ? "bg-amber-500 text-black"
                  : "bg-slate-700 text-white"
              }`}
            >
              {artwork.featured
                ? "⭐ Featured"
                : "☆ Make Featured"}
            </button>

            <div className="mt-5 flex gap-3">

              <button
                onClick={() =>
                  startEdit(artwork)
                }
                className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteArtwork(
                    artwork._id
                  )
                }
                className="flex-1 rounded-lg bg-red-600 py-2 font-semibold"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>

      </div>

    </div>
  );
}