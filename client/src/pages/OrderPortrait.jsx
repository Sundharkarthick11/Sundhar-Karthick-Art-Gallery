import axios from "axios";
import { useState } from "react";
export default function OrderPortrait() {
  const [notification, setNotification] = useState("");
  const [isConnectingPayment, setIsConnectingPayment] = useState(false);
  
  
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [artworkType, setArtworkType] = useState("");
const [paperSize, setPaperSize] = useState("");
const [peopleCount, setPeopleCount] = useState("1");
const [deliveryMethod, setDeliveryMethod] = useState("");
const [deliveryAddress, setDeliveryAddress] = useState("");
const [isSubmitted, setIsSubmitted] = useState(false);
const [formData, setFormData] = useState({
  customerName: "",
  email: "",
  phone: "",
  notes: "",
});
const [errors, setErrors] = useState({});
const [acceptedTerms, setAcceptedTerms] = useState(false);
const handleChange = (e) => {
  const { name, value } = e.target;

  // Full Name
  if (name === "customerName") {
    if (!/^[A-Za-z ]*$/.test(value)) return;
  }

  // Phone
  if (name === "phone") {
    if (!/^\d*$/.test(value)) return;

    if (value.length > 10) return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
const validateForm = () => {
  const newErrors = {};

  // ===========================
  // Full Name
  // ===========================
  if (!formData.customerName.trim()) {
    newErrors.customerName = "Please enter your full name.";
  } else if (formData.customerName.trim().length < 3) {
    newErrors.customerName =
      "Name should be at least 3 characters long.";
  } else if (!/^[A-Za-z ]+$/.test(formData.customerName)) {
    newErrors.customerName =
      "Name should contain only letters and spaces.";
  }

  // ===========================
  // Email
  // ===========================
  if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    formData.email
  )
) {
  newErrors.email = "Enter a valid email address";
}

  // ===========================
  // Phone Number
  // ===========================
  if (!formData.phone.trim()) {
    newErrors.phone = "Please enter your phone number.";
  } else if (!/^\d+$/.test(formData.phone)) {
    newErrors.phone =
      "Phone number should contain only digits.";
  } else if (formData.phone.length !== 10) {
    newErrors.phone =
      "Phone number must be exactly 10 digits.";
  } else if (!/^[6-9]/.test(formData.phone)) {
    newErrors.phone =
      "Phone number must start with 6, 7, 8, or 9.";
  }

  // ===========================
  // Artwork Type
  // ===========================
  if (!artworkType) {
    newErrors.artworkType =
      "Please select an artwork type.";
  }

  // ===========================
  // Paper Size
  // ===========================
  if (!paperSize) {
    newErrors.paperSize =
      "Please select a paper size.";
  }

  // ===========================
  // Number of People
  // ===========================
  if (!peopleCount) {
    newErrors.peopleCount =
      "Please select the number of people.";
  }
  if (!deliveryMethod) {
  newErrors.deliveryMethod =
    "Please select a delivery method.";
}
if (deliveryMethod === "Post / Courier" && !deliveryAddress.trim()) {
  newErrors.deliveryAddress =
    "Please enter your delivery address.";
}

  // ===========================
  // Reference Image
  // ===========================
  if (!previewImage) {
    newErrors.image =
      "Please upload a reference image.";
  }

  // ===========================
  // Terms & Conditions
  // ===========================
  if (!acceptedTerms) {
    newErrors.terms =
      "Please accept the Terms & Conditions to continue.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }
  
  let imageUrl = "";
  let publicId = "";
  console.log("Step 1 - Uploading image...");

try {
  const imageData = new FormData();

  imageData.append("file", selectedFile);
  imageData.append(
    "upload_preset",
    "sundhar_gallery_orders"
  );

  const upload = await axios.post(
    "https://api.cloudinary.com/v1_1/cjep3tky/image/upload",
    imageData
  );

  imageUrl = upload.data.secure_url;
  publicId = upload.data.public_id; 
  console.log("Cloudinary Public ID:", publicId);
  console.log("Step 2 - Image uploaded");
  setIsConnectingPayment(true);
  console.log("Step 3 - Creating Razorpay Order...");
  const paymentResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: advanceAmount,
    }),
  }
);

const paymentData = await paymentResponse.json();
console.log("Step 4 - Razorpay Order Created", paymentData);
if (!paymentData.success) {
  setIsConnectingPayment(false);
  alert("Unable to create payment.");
  return;
}


const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  amount: paymentData.order.amount,

  currency: paymentData.order.currency,

  name: "Sundhar Karthick Art Gallery",

  description: "Portrait Booking Advance",

  image: "/logo.png", // optional

  order_id: paymentData.order.id,

  handler: async function (response) {

  console.log("Payment Success:", response);

  
  // Payment verification 
  const verifyResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/payment/verify`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_order_id: paymentData.order.id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    }),
  }
);

const verifyData = await verifyResponse.json();

if (!verifyData.success) {
  alert("Payment verification failed.");

  return;
}

  const orderData = {
  customerName: formData.customerName,
  email: formData.email,
  phone: formData.phone,

  artworkType,
  paperSize,
  peopleCount: Number(peopleCount),

  deliveryMethod,
  deliveryCharge,
deliveryAddress:
  deliveryMethod === "Post / Courier"
    ? deliveryAddress.trim()
    : "",

  estimatedPrice: totalPrice,
  advanceAmount,
  balanceAmount,

  imageUrl,
  notes: formData.notes,

  paymentStatus: "Paid",
  paymentId: response.razorpay_payment_id,
  orderStatus: "Pending",
};

  try {

    const token = localStorage.getItem("token");

const saveResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/orders`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  }
);

    const data = await saveResponse.json();

    if (data.success) {

      setNotification("Payment Successful!");

setTimeout(() => {
  setNotification("");
}, 3000);

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        notes: "",
      });

      setArtworkType("");
      setPaperSize("");
      setPeopleCount("1");
      setDeliveryMethod("");
      setDeliveryAddress("");
      setPreviewImage(null);
      setSelectedFile(null);
      setAcceptedTerms(false);
      setErrors({});
      setIsSubmitted(true);

    } else {

      alert("Failed to save order.");

    }

  } catch (error) {

    setIsConnectingPayment(false);
    console.error(error);

    alert("Server Error.");

  }

},
  modal: {
  ondismiss: async function () {
    setIsConnectingPayment(false);
    console.log("Payment cancelled.");

    await fetch(`${import.meta.env.VITE_API_URL}/api/cloudinary/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicId,
      }),
    });

    setNotification("Payment cancelled.");

setTimeout(() => {
  setNotification("");
}, 3000);
  },
},

  prefill: {
    name: formData.customerName,
    email: formData.email,
    contact: formData.phone,
  },

  theme: {
    color: "#f59e0b",
  },
};
console.log("Step 5 - Opening Razorpay...");
setIsConnectingPayment(false);
const razorpay = new window.Razorpay(options);

razorpay.open();


return;


} catch (err) {
  console.error(err);
  setIsConnectingPayment(false);

  alert("Failed to upload image.");

  return;
}

};


const pricing = {
  "Graphite Art": {
    A5: 350,
    A4: 500,
    A3: 800,
    A2: 1000,
  },

  "Charcoal Art": {
    A5: 300,
    A4: 450,
    A3: 750,
    A2: 950,
  },

  "Pixel Art": {
    A5: 550,
    A4: 700,
    A3: 1000,
    A2: 1200,
  },
};

const basePrice =
  artworkType && paperSize
    ? pricing[artworkType]?.[paperSize] || 0
    : 0;

// Extra charge for each additional person
const extraPersonCharges = {
  "Graphite Art": 150,
  "Charcoal Art": 100,
  "Pixel Art": 200,
};

const extraCharge =
  extraPersonCharges[artworkType] || 0;

const extraPeople =
  Number(peopleCount) > 1
    ? (Number(peopleCount) - 1) * extraCharge
    : 0;

// Delivery charge
const deliveryCharge =
  deliveryMethod === "Post / Courier" ? 50 : 0;

// Final total
const totalPrice =
  basePrice + extraPeople + deliveryCharge;

// 40% advance
const advanceAmount =
  Math.round(totalPrice * 0.40);

// 60% balance
const balanceAmount =
  totalPrice - advanceAmount;
  
  return (

    <div className="min-h-screen bg-slate-950 text-white">
      {isConnectingPayment && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="rounded-xl bg-slate-900 px-8 py-6 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400"></div>

      <p className="mt-4 text-white font-medium">
        Connecting to Razorpay...
      </p>
    </div>
  </div>
)}
      {notification && (
  <div className="fixed top-5 right-5 z-50 rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-white shadow-lg">
    {notification}
  </div>
)}
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
  onSubmit={handleSubmit}
>

  {/* Full Name */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Full Name
    </label>
<input
  type="text"
  name="customerName"
  value={formData.customerName}
  onChange={handleChange}
  placeholder="Enter your full name"
  className={`w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none ${
    errors.customerName
      ? "border border-red-500"
      : "border border-slate-700 focus:border-amber-400"
  }`}
/>

{errors.customerName && (
  <p className="mt-1 text-sm text-red-500">
    {errors.customerName}
  </p>
)}
  </div>

  {/* Email */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Email Address
    </label>

    <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className={`w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none ${
    errors.email
      ? "border border-red-500"
      : "border border-slate-700 focus:border-amber-400"
  }`}
/>

{errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}
  </div>

  {/* Phone */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Phone Number
    </label>

    <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Enter your phone number"
  className={`w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none ${
    errors.phone
      ? "border border-red-500"
      : "border border-slate-700 focus:border-amber-400"
  }`}
/>

{errors.phone && (
  <p className="mt-1 text-sm text-red-500">
    {errors.phone}
  </p>
)}
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
  onChange={(e) => {
    setArtworkType(e.target.value);

    setErrors((prev) => ({
      ...prev,
      artworkType: "",
    }));
  }}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="">Select Artwork Type</option>

  <option value="Graphite Art">
    Graphite Art
  </option>

  <option value="Charcoal Art">
    Charcoal Art
  </option>

  <option value="Pixel Art">
    Pixel Art
  </option>
</select>
{errors.artworkType && (
  <p className="mt-1 text-sm text-red-500">
    {errors.artworkType}
  </p>
)}
  </div>

  {/* Paper Size */}
  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium">
      Paper Size
    </label>

    <select
  value={paperSize}
  onChange={(e) => {
  setPaperSize(e.target.value);

  setErrors((prev) => ({
    ...prev,
    paperSize: "",
  }));
}}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="">Select Paper Size</option>
  <option value="A5">A5</option>
  <option value="A4">A4</option>
  <option value="A3">A3</option>
  <option value="A2">A2</option>
</select>
{errors.paperSize && (
  <p className="mt-1 text-sm text-red-500">
    {errors.paperSize}
  </p>
)}
  </div>

  {/* Number of People */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Number of People
    </label>

    <select
  value={peopleCount}
  onChange={(e) => {
  setPeopleCount(e.target.value);

  setErrors((prev) => ({
    ...prev,
    peopleCount: "",
  }));
}}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  <option value="1">1 Person</option>
  <option value="2">2 People</option>
  <option value="3">3 People</option>
  <option value="4">4 People</option>
  <option value="5">5+ People</option>
</select>
{errors.peopleCount && (
  <p className="mt-1 text-sm text-red-500">
    {errors.peopleCount}
  </p>
)}
  </div>
  {/* Delivery Method */}
{/* Delivery Method */}
<div className="mt-6">
  <label className="mb-2 block text-sm font-medium">
    Delivery Method
  </label>

  <select
    value={deliveryMethod}
    onChange={(e) => {
      const value = e.target.value;

      setDeliveryMethod(value);

    if (value !== "Post / Courier") {
      setDeliveryAddress("");
    }

    setErrors((prev) => ({
      ...prev,
      deliveryMethod: "",
      deliveryAddress: "",
      }));
    }}
    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
  >
    <option value="">Select Delivery Method</option>

    <option value="In-Hand / Pickup">
      In-Hand / Pickup — Free
    </option>

    <option value="Post / Courier">
      Post / Courier — ₹50
    </option>
  </select>

  {errors.deliveryMethod && (
    <p className="mt-1 text-sm text-red-500">
      {errors.deliveryMethod}
    </p>
  )}
</div>
{deliveryMethod === "Post / Courier" && (
  <div className="mt-6">
    <label className="mb-2 block text-sm font-medium text-white">
      Delivery Address
    </label>

    <textarea
      value={deliveryAddress}
      onChange={(e) => {
        setDeliveryAddress(e.target.value);

        setErrors((prev) => ({
          ...prev,
          deliveryAddress: "",
        }));
      }}
      placeholder="Enter your complete delivery address"
      rows={4}
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400"
    />

    {errors.deliveryAddress && (
      <p className="mt-1 text-sm text-red-500">
        {errors.deliveryAddress}
      </p>
    )}

    <p className="mt-2 text-xs text-slate-400">
      Please provide your complete address including door number,
      street, area, city, state and PIN code.
    </p>
  </div>
)}
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

  if (!file) return;

  // Allow only image files
  if (!file.type.startsWith("image/")) {
    setErrors((prev) => ({
      ...prev,
      image: "Please upload a valid image.",
    }));
    return;
  }

  setSelectedFile(file);

  setPreviewImage(URL.createObjectURL(file));

  setErrors((prev) => ({
    ...prev,
    image: "",
  }));
}}
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-white hover:file:bg-amber-600"
/>
{errors.image && (
  <p className="mt-2 text-sm text-red-500">
    {errors.image}
  </p>
)}
{previewImage && (
  <div className="mt-6">
    <img
      src={previewImage}
      alt="Reference Preview"
      loading="lazy"
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
    📝 Additional Notes <span className="text-slate-400 text-sm ml-1">
    (Optional)
  </span>
  </h3>

  <label className="mb-2 block text-sm font-medium">
    Special Instructions
  </label>

  <textarea
  rows="5"
  name="notes"
  value={formData.notes}
  onChange={handleChange}
  placeholder="Mention background preferences, colors, delivery requests, or any other special instructions..."
  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
/>
</div>

{/* Terms & Conditions */}
<div className="border-t border-slate-700 pt-6">
  <label className="flex items-start gap-3 text-sm text-slate-300">
    <input
  type="checkbox"
  checked={acceptedTerms}
  onChange={(e) => {
  setAcceptedTerms(e.target.checked);

  setErrors((prev) => ({
    ...prev,
    terms: "",
  }));
}}
  className="mt-1 h-5 w-5 accent-amber-500"
/>

    <span>
      I have read and agree to the pricing policy, advance payment
      requirements, and estimated delivery timeline.
    </span>
  </label>
  {errors.terms && (
  <p className="mt-2 text-sm text-red-500">
    {errors.terms}
  </p>
)}
</div>
{/* Estimated Price */}
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

        {/* Artwork Type */}
        <div className="flex justify-between text-slate-300">
          <span>Artwork Type</span>

          <span className="font-medium text-white">
            {artworkType || "-"}
          </span>
        </div>

        {/* Paper Size */}
        <div className="flex justify-between text-slate-300">
          <span>Paper Size</span>

          <span className="font-medium text-white">
            {paperSize || "-"}
          </span>
        </div>

        {/* Number of People */}
        <div className="flex justify-between text-slate-300">
          <span>People</span>

          <span className="font-medium text-white">
            {peopleCount}
          </span>
        </div>

        {/* Delivery Method */}
        <div className="flex justify-between text-slate-300">
          <span>Delivery</span>

          <span className="font-medium text-white">
            {deliveryMethod || "-"}
          </span>
        </div>

        <hr className="border-slate-700" />

        {/* Base Price */}
        <div className="flex justify-between text-slate-300">
          <span>Base Price</span>

          <span className="font-medium">
            ₹{basePrice}
          </span>
        </div>

        {/* Extra People */}
        <div className="flex justify-between text-slate-300">
          <span>
            Extra People

            {Number(peopleCount) > 1 && (
              <span className="text-sm text-slate-400">
                {" "}
                ({Number(peopleCount) - 1} × ₹{extraCharge})
              </span>
            )}
          </span>

          <span className="font-medium">
            ₹{extraPeople}
          </span>
        </div>

        {/* Delivery Charge */}
        <div className="flex justify-between text-slate-300">
          <span>Delivery Charge</span>

          <span className="font-medium">
            {deliveryCharge > 0
              ? `₹${deliveryCharge}`
              : "Free"}
          </span>
        </div>

        <hr className="border-slate-700" />

        {/* Total */}
        <div className="flex justify-between items-center text-2xl font-bold text-amber-400">
          <span>Estimated Total</span>

          <span>
            ₹{totalPrice}
          </span>
        </div>

        <hr className="border-slate-700" />

        {/* Advance */}
        <div className="flex justify-between text-green-400 font-semibold">
          <span>Advance Payment (40%)</span>

          <span>
            ₹{advanceAmount}
          </span>
        </div>

        {/* Balance */}
        <div className="flex justify-between text-slate-300">
          <span>Balance Payment (60%)</span>

          <span>
            ₹{balanceAmount}
          </span>
        </div>

      </div>

      {/* Note */}
      <p className="mt-5 rounded-lg bg-slate-900 p-4 text-sm text-slate-400">
        * This is an approximate estimate. The final quotation will be
        confirmed after reviewing your reference image, artwork complexity,
        and any custom requirements.
      </p>
    </>
  )}
</div>

{/* Submit Button */}
<button
  type="submit"
  disabled={isSubmitted}
  className={`w-full rounded-lg py-4 text-lg font-semibold text-white transition duration-300 ${
    isSubmitted
      ? "bg-green-600 cursor-not-allowed"
      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-[1.02]"
  }`}
>
  {isSubmitted
    ? "✓ Order Submitted Successfully"
    : "Submit Order Request"}
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
    Choose your preferred artwork style and size. Final pricing will be
    confirmed after reviewing your reference image.
  </p>

  {/* Graphite Art */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-white">
      ✏️ Graphite Art
    </h3>

    <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
      <p>A5</p>
      <p>₹350</p>

      <p>A4</p>
      <p>₹500</p>

      <p>A3</p>
      <p>₹800</p>

      <p>A2</p>
      <p>₹1,000</p>
    </div>
  </div>

  {/* Charcoal Art */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-white">
      🎨 Charcoal Art
    </h3>

    <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
      <p>A5</p>
      <p>₹300</p>

      <p>A4</p>
      <p>₹450</p>

      <p>A3</p>
      <p>₹750</p>

      <p>A2</p>
      <p>₹950</p>
    </div>
  </div>

  {/* Pixel Art */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-white">
      🖌️ Pixel Art
    </h3>

    <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
      <p>A5</p>
      <p>₹550</p>

      <p>A4</p>
      <p>₹700</p>

      <p>A3</p>
      <p>₹1,000</p>

      <p>A2</p>
      <p>₹1,200</p>
    </div>
  </div>

  {/* Important Information */}
  <div className="mt-10 rounded-xl border border-amber-500/30 bg-slate-800 p-5">

    <h3 className="text-lg font-semibold text-amber-400">
      📌 Important Information
    </h3>

    <ul className="mt-4 space-y-3 text-sm text-slate-300">

      <li>
        👤 Prices listed are for a{" "}
        <strong>single-person portrait</strong>.
      </li>

      <li>
        ✏️ <strong>Graphite Art:</strong> ₹150 for each
        additional person.
      </li>

      <li>
        🎨 <strong>Charcoal Art:</strong> ₹100 for each
        additional person.
      </li>

      <li>
        🖌️ <strong>Pixel Art:</strong> ₹200 for each
        additional person.
      </li>

      <li>
        🚚 <strong>Post / Courier:</strong> Additional ₹50
        delivery charge.
      </li>

      <li>
        🤝 <strong>In-Hand / Pickup:</strong> No delivery
        charge.
      </li>

      <li>
        💰 A <strong>40% advance payment</strong> is required
        to confirm your order.The remaining amount can be paid after delivery.
      </li>


      <li>
        📷 Upload a clear, high-resolution reference image for
        the best results.
      </li>

      <li>
        ⏳ Estimated completion time:{" "}
        <strong>5–10 working days</strong>.
      </li>

      <li>
        💬 The final quotation will be shared after reviewing
        your reference image.
      </li>

    </ul>
  </div>

</div>

        </div>
      </div>
    </div>
  );
}