
const OrderCard = ({ order, fetchOrders, onView }) => {
  // ===============================
  // STATUS COLORS
  // ===============================

  const paymentColor =
    order.paymentStatus === "Paid"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : "bg-amber-500/10 text-amber-400 border border-amber-500/20";

  const statusColor =
  order.orderStatus === "Delivered"
    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
    : order.orderStatus === "Completed"
    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    : order.orderStatus === "In Progress"
    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
    : "bg-amber-500/10 text-amber-400 border border-amber-500/20";

  // ===============================
  // DOWNLOAD IMAGE
  // ===============================

  const getDownloadUrl = (url) => {
    if (!url) return "";

    // Cloudinary download attachment
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }

    return url;
  };

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  // ===============================
  // DELETE ORDER
  // ===============================

  const deleteOrder = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order deleted successfully.");
        fetchOrders();
      } else {
        alert(data.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  // ===============================
  // UPLOAD COMPLETED PORTRAIT
  // ===============================

  const uploadPortrait = async () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "image/*";

  input.click();

  input.onchange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const token = localStorage.getItem("adminToken");

      const imageData = new FormData();

      imageData.append("image", file);

      // Upload to Backend
      const uploadResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cloudinary/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageData,
        }
      );

      const uploadData =
        await uploadResponse.json();

      if (!uploadData.success) {
        alert(
          uploadData.message ||
            "Failed to upload image."
        );
        return;
      }

      const completedImageUrl =
        uploadData.imageUrl;

      // Save URL to Order
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/upload`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completedImageUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          "Completed portrait uploaded successfully!"
        );

        fetchOrders();
      } else {
        alert(
          data.message ||
            "Failed to save completed portrait."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };
};

  // ===============================
  // DOWNLOAD HANDLERS
  // ===============================

  const downloadReference = () => {
    if (!order.imageUrl) {
      alert("Reference image is not available.");
      return;
    }

    window.open(
      getDownloadUrl(order.imageUrl),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const downloadCompletedPortrait = () => {
    if (!order.completedImageUrl) {
      alert("Completed portrait is not available.");
      return;
    }

    window.open(
      getDownloadUrl(order.completedImageUrl),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-lg transition hover:border-slate-600">
      <div className="flex flex-col gap-8 xl:flex-row">

        {/* ========================================= */}
        {/* IMAGES */}
        {/* ========================================= */}

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:w-[42%]">

          {/* Customer Reference */}
          <div>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-300">
              Customer Reference
            </p>

            {order.imageUrl ? (
              <img
  src={order.imageUrl}
  alt="Customer Reference"
  loading="lazy"
  onError={(e) => {
    e.target.src =
      "https://placehold.co/600x400?text=Image+Not+Found";
  }}
  className="h-60 w-full rounded-xl border border-slate-600 bg-slate-900 p-2 object-contain"
/>
            ) : (
              <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-900 text-sm text-slate-500">
                No Reference Image
              </div>
            )}

            {/* Reference Buttons */}
            {order.imageUrl && (
              <div className="mt-3 flex gap-2">
                <a
                  href={order.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition hover:bg-slate-600"
                >
                  View
                </a>

                <button
                  type="button"
                  onClick={downloadReference}
                  className="flex-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-500/20"
                >
                  Download
                </button>
              </div>
            )}
          </div>

          {/* Completed Portrait */}
          <div>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-300">
              Completed Portrait
            </p>

            {order.completedImageUrl ? (
              <img
  src={order.completedImageUrl}
  alt="Completed Portrait"
  loading="lazy"
  onError={(e) => {
    e.target.src =
      "https://placehold.co/600x400?text=Image+Not+Found";
  }}
  className="h-60 w-full rounded-xl border border-slate-600 bg-slate-900 p-2 object-contain"
/>
            ) : (
              <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-900 text-sm text-slate-500">
                Not Uploaded Yet
              </div>
            )}

            {/* Completed Portrait Buttons */}
            {order.completedImageUrl && (
              <div className="mt-3 flex gap-2">
                <a
                  href={order.completedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition hover:bg-slate-600"
                >
                  View
                </a>

                <button
                  type="button"
                  onClick={downloadCompletedPortrait}
                  className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* ORDER INFORMATION */}
        {/* ========================================= */}

        <div className="flex-1">

          {/* Customer + Status */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-white">
                {order.customerName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Order ID:{" "}
                <span className="text-slate-300">
                  {order.orderId || "Not Available"}
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {order.email}
              </p>

              <p className="text-sm text-slate-400">
                {order.phone}
              </p>
            </div>

            {/* Status */}
            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${paymentColor}`}
              >
                {order.paymentStatus}
              </span>

              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${statusColor}`}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-700" />

          {/* Artwork Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Artwork
              </p>

              <p className="mt-1 font-medium text-slate-200">
                {order.artworkType}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Paper Size
              </p>

              <p className="mt-1 font-medium text-slate-200">
                {order.paperSize}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                People
              </p>

              <p className="mt-1 font-medium text-slate-200">
                {order.peopleCount}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Estimated Total
              </p>

              <p className="mt-1 font-medium text-slate-200">
                ₹{order.estimatedPrice}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Advance Paid
              </p>

              <p className="mt-1 font-medium text-emerald-400">
                ₹{order.advanceAmount}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Balance
              </p>

              <p className="mt-1 font-medium text-slate-200">
                ₹{order.balanceAmount}
              </p>
            </div>
          </div>

          {/* ========================================= */}
          {/* DELIVERY INFORMATION */}
          {/* ========================================= */}

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Delivery Method
                </p>

                <p className="mt-1 font-medium text-slate-200">
                  {order.deliveryMethod || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Delivery Charge
                </p>

                <p className="mt-1 font-medium text-slate-200">
                  {order.deliveryCharge > 0
                    ? `₹${order.deliveryCharge}`
                    : "Free"}
                </p>
              </div>
            </div>

            {/* Address only for Courier */}
            {order.deliveryMethod === "Post / Courier" &&
              order.deliveryAddress && (
                <div className="mt-4 border-t border-slate-700 pt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Delivery Address
                  </p>

                  <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-300">
                    {order.deliveryAddress}
                  </p>
                </div>
              )}
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Customer Notes
              </p>

              <p className="mt-2 rounded-lg bg-slate-900 p-3 text-sm text-slate-400">
                {order.notes}
              </p>
            </div>
          )}

          {/* ========================================= */}
          {/* OLD COMPLETED PORTRAIT VIEW BUTTON REMOVED */}
          {/* ========================================= */}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={onView}
              className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-600"
            >
              View Details
            </button>

            <button
              onClick={() => updateStatus("In Progress")}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus("Completed")}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Completed
            </button>
            <button
  onClick={() => updateStatus("Delivered")}
  className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-400 transition hover:bg-purple-500/20"
>
  Delivered
</button>

            <button
              onClick={uploadPortrait}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:bg-amber-500/20"
            >
              Upload Portrait
            </button>

            <button
              onClick={deleteOrder}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
