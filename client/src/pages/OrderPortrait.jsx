import { useState } from "react";
export default function OrderPortrait() {
  const [previewImage, setPreviewImage] = useState(null);
  const [artworkType, setArtworkType] = useState("");
const [paperSize, setPaperSize] = useState("");
const [peopleCount, setPeopleCount] = useState("1");
const pricing = {
  "Pencil Drawing": {
    A5: 500,
    A4: 900,
    A3: 1500,
    A2: 2500,
  },

  "Color Pencil Art": {
    A5: 800,
    A4: 1400,
    A3: 2200,
    A2: 3500,
  },

  "Charcoal Sketch": {
    A5: 700,
    A4: 1200,
    A3: 2000,
    A2: 3200,
  },

  "Acrylic Painting": {
    A5: 1000,
    A4: 1800,
    A3: 3000,
    A2: 4800,
  },

  "Digital Art": {
    A5: 600,
    A4: 1000,
    A3: 1700,
    A2: 2600,
  },
};
const basePrice =
  artworkType && paperSize
    ? pricing[artworkType][paperSize]
    : 0;

const extraPersonCharges = {
  "Pencil Drawing": 300,
  "Color Pencil Art": 500,
  "Charcoal Sketch": 400,
  "Acrylic Painting": 800,
  "Digital Art": 400,
};

const extraCharge =
  extraPersonCharges[artworkType] || 0;

const extraPeople =
  peopleCount > 1
    ? (Number(peopleCount) - 1) * extraCharge
    : 0;

const totalPrice = basePrice + extraPeople;
const advanceAmount = Math.round(totalPrice * 0.5);
const balanceAmount = totalPrice - advanceAmount;
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Order Your
            <span className="text-amber-400"> Portrait</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Turn your favorite memories into timeless handcrafted artwork.
            Fill in the details below and let's create something beautiful together.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Left Side - Form Placeholder */}
          <div className="rounded-2xl bg-slate-900 p-8 shadow-xl">
            <h2 className="text-3xl font-bold">
              Place Your Order
            </h2>

            <p className="mt-4 text-slate-400">
  Complete the form below to request your personalized artwork.
  We'll review your details and contact you with the final quotation.
</p>

<form
  className="mt-8 space-y-6"
  onSubmit={(e) => {
    e.preventDefault();
    alert("Order submitted successfully!");
  }}
>

  {/* Full Name */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Full Name
    </label>

    <input
      type="text"
      placeholder="Enter your full name"
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
    />
  </div>

  {/* Email */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Email Address
    </label>

    <input
      type="email"
      placeholder="Enter your email"
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Phone Number
    </label>

    <input
      type="tel"
      placeholder="Enter your phone number"
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
    />
  </div>
  {/* Artwork Details */}
<div className="border-t border-slate-700 pt-6">
  <h3 className="mb-5 text-xl font-semibold text-amber-400">
    🎨 Artwork Details
  </h3>

  {/* Artwork Type */}
  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium">
      Artwork Type
    </label>

    <select
  value={artworkType}
  onChange={(e) => setArtworkType(e.target.value)}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="">Select Artwork Type</option>
  <option value="Pencil Drawing">Pencil Drawing</option>
  <option value="Color Pencil Art">Color Pencil Art</option>
  <option value="Charcoal Sketch">Charcoal Sketch</option>
  <option value="Acrylic Painting">Acrylic Painting</option>
  <option value="Digital Art">Digital Art</option>
</select>
  </div>

  {/* Paper Size */}
  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium">
      Paper Size
    </label>

    <select
  value={paperSize}
  onChange={(e) => setPaperSize(e.target.value)}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="">Select Paper Size</option>
  <option value="A5">A5</option>
  <option value="A4">A4</option>
  <option value="A3">A3</option>
  <option value="A2">A2</option>
</select>
  </div>

  {/* Number of People */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Number of People
    </label>

    <select
  value={peopleCount}
  onChange={(e) => setPeopleCount(e.target.value)}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="1">1 Person</option>
  <option value="2">2 People</option>
  <option value="3">3 People</option>
  <option value="4">4 People</option>
  <option value="5">5+ People</option>
</select>
  </div>
</div>
{/* Reference Image */}
<div className="border-t border-slate-700 pt-6">
  <h3 className="mb-5 text-xl font-semibold text-amber-400">
    📤 Reference Image
  </h3>

  <label className="mb-2 block text-sm font-medium">
    Upload Reference Photo
  </label>

  <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-white hover:file:bg-amber-600"
/>
{previewImage && (
  <div className="mt-6">
    <img
      src={previewImage}
      alt="Reference Preview"
      className="h-64 w-full rounded-xl border border-slate-700 object-cover"
    />
  </div>
)}

  <p className="mt-2 text-sm text-slate-400">
    Upload a clear, high-quality image for the best artwork results.
  </p>
</div>

{/* Additional Notes */}
<div className="border-t border-slate-700 pt-6">
  <h3 className="mb-5 text-xl font-semibold text-amber-400">
    📝 Additional Notes
  </h3>

  <label className="mb-2 block text-sm font-medium">
    Special Instructions
  </label>

  <textarea
    rows="5"
    placeholder="Mention background preferences, colors, delivery requests, or any other special instructions..."
    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
  ></textarea>
</div>

{/* Terms & Conditions */}
<div className="border-t border-slate-700 pt-6">
  <label className="flex items-start gap-3 text-sm text-slate-300">
    <input
      type="checkbox"
      className="mt-1 h-5 w-5 accent-amber-500"
    />

    <span>
      I have read and agree to the pricing policy, advance payment
      requirements, and estimated delivery timeline.
    </span>
  </label>
</div>
{/* Estimated Price */}
<div className="rounded-xl border border-amber-500/30 bg-slate-800 p-6">
  <h3 className="text-xl font-semibold text-amber-400">
    💰 Estimated Price
  </h3>

  {basePrice === 0 ? (
    <p className="mt-3 text-slate-400">
      Select an artwork type and paper size to view the estimated price.
    </p>
  ) : (
    <>
      <div className="mt-5 space-y-4">

  <div className="flex justify-between text-slate-300">
    <span>Artwork Type</span>
    <span className="font-medium">
      {artworkType || "-"}
    </span>
  </div>

  <div className="flex justify-between text-slate-300">
    <span>Paper Size</span>
    <span className="font-medium">
      {paperSize || "-"}
    </span>
  </div>

  <div className="flex justify-between text-slate-300">
    <span>People</span>
    <span className="font-medium">
      {peopleCount}
    </span>
  </div>

  <hr className="border-slate-700" />

  <div className="flex justify-between text-slate-300">
    <span>Base Price</span>
    <span>₹{basePrice}</span>
  </div>

  <div className="flex justify-between text-slate-300">
    <span>
      Extra People
      {Number(peopleCount) > 1 &&
        ` (${Number(peopleCount) - 1} × ₹${extraCharge})`}
    </span>

    <span>₹{extraPeople}</span>
  </div>

  <hr className="border-slate-700" />

  <div className="flex justify-between text-2xl font-bold text-amber-400">
  <span>Estimated Total</span>
  <span>₹{totalPrice}</span>
</div>

<hr className="border-slate-700" />

<div className="flex justify-between text-green-400 font-semibold">
  <span>Advance Payment (50%)</span>
  <span>₹{advanceAmount}</span>
</div>

<div className="flex justify-between text-slate-300">
  <span>Balance Payment</span>
  <span>₹{balanceAmount}</span>
</div>
</div>

<p className="mt-5 rounded-lg bg-slate-900 p-4 text-sm text-slate-400">
  * This is an approximate estimate. The final quotation will be confirmed
  after reviewing your reference image, artwork complexity, and any custom
  requirements.
</p>
    </>
  )}
</div>

{/* Submit Button */}
<button
  type="submit"
  className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
>
  Submit Order Request
</button>

</form>
            {/* Form fields will be added in the next step */}
          </div>

          {/* Right Side - Pricing Guide */}
          <div className="rounded-2xl bg-slate-900 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-amber-400">
              Portrait Pricing Guide
            </h2>

            <p className="mt-3 text-slate-400">
              Choose your preferred artwork style and size. Final pricing will
              be confirmed after reviewing your reference image.
            </p>

            {/* Pencil Drawing */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white">
                ✏️ Pencil Drawing
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
                <p>A5</p><p>₹500</p>
                <p>A4</p><p>₹900</p>
                <p>A3</p><p>₹1,500</p>
                <p>A2</p><p>₹2,500</p>
              </div>
            </div>

            {/* Color Pencil Art */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white">
                🎨 Color Pencil Art
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
                <p>A5</p><p>₹800</p>
                <p>A4</p><p>₹1,400</p>
                <p>A3</p><p>₹2,200</p>
                <p>A2</p><p>₹3,500</p>
              </div>
            </div>

            {/* Acrylic Painting */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white">
                🖌️ Acrylic Painting
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
                <p>A5</p><p>₹1,000</p>
                <p>A4</p><p>₹1,800</p>
                <p>A3</p><p>₹3,000</p>
                <p>A2</p><p>₹4,800</p>
              </div>
            </div>

            {/* Important Information */}
            <div className="mt-10 rounded-xl border border-amber-500/30 bg-slate-800 p-5">
              <h3 className="text-lg font-semibold text-amber-400">
                📌 Important Information
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  👤 Prices listed are for a <strong>single-person portrait</strong>.
                </li>

                <li>
                  👨‍👩‍👧 Additional charges apply for{" "}
                  <strong>multiple people</strong> in the same artwork.
                </li>

                <li>
                  🐶 Pets, vehicles, or detailed backgrounds may require
                  additional charges.
                </li>

                
                <li>
    💰 A <strong>50% advance payment</strong> is required to confirm your order.
  </li>

  <li>
    💳 The remaining <strong>50% payment</strong> must be completed before shipping or delivery.
  </li>

                <li>
                  📷 Upload a clear, high-resolution reference image for the
                  best results.
                </li>

                <li>
                  ⏳ Estimated completion time: <strong>5–10 working days</strong>.
                </li>

                <li>
                  💬 The final quotation will be shared after reviewing your
                  reference image.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}