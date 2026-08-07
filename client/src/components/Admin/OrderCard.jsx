import axios from "axios";
const OrderCard = ({ order, fetchOrders, onView }) => {
  const paymentColor =
    order.paymentStatus === "Paid"
      ? "bg-green-600"
      : "bg-yellow-500";

  const statusColor =
    order.orderStatus === "Completed"
      ? "bg-green-600"
      : order.orderStatus === "In Progress"
      ? "bg-blue-600"
      : "bg-orange-500";

  const updateStatus = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
        alert("Failed to update order.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const deleteOrder = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${order._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order deleted successfully.");
        fetchOrders();
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  // We'll implement this in the next step
 const uploadPortrait = async () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "image/*";

  input.click();

  input.onchange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const imageData = new FormData();

      imageData.append("file", file);

      imageData.append(
  "upload_preset",
  "sundhar_completed_portraits"
);

      console.log("Uploading completed portrait...");

      const upload = await axios.post(
        "https://api.cloudinary.com/v1_1/cjep3tky/image/upload",
        imageData
      );

      const completedImageUrl = upload.data.secure_url;

      console.log(completedImageUrl);
      const response = await fetch(
  `http://localhost:5000/api/orders/${order._id}/upload`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completedImageUrl,
    }),
  }
);

const data = await response.json();

if (data.success) {
  alert("Completed portrait uploaded successfully!");

  fetchOrders();
} else {
  alert("Failed to save portrait.");
}

    } catch (error) {
      console.error(error);

      alert("Cloudinary Upload Failed");
    }
  };
};

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Customer Reference */}
  <div>
    <p className="text-center text-amber-400 font-semibold mb-2">
      Customer Reference
    </p>

    <img
      src={order.imageUrl}
      alt="Reference"
      className="w-full h-52 object-contain bg-gray-900 rounded-xl border border-green-500 p-2"
    />
  </div>

  {/* Completed Portrait */}
  <div>
    <p className="text-center text-green-400 font-semibold mb-2">
      Completed Portrait
    </p>

    {order.completedImageUrl ? (
      <img
        src={order.completedImageUrl}
        alt="Completed Portrait"
        className="w-full h-52 object-contain bg-gray-900 rounded-xl border border-gray-700 p-2"
      />
    ) : (
      <div className="w-full h-64 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-400">
        Not Uploaded Yet
      </div>
    )}
  </div>

</div>
<div className="mt-6"></div>

        <div className="flex-1">
            
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-amber-400">
                {order.customerName}
              </h2>

              <p className="text-gray-300 mt-1">
                {order.email}
              </p>

              <p className="text-gray-300">
                {order.phone}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={`${paymentColor} px-4 py-1 rounded-full text-sm font-semibold text-white`}
              >
                {order.paymentStatus}
              </span>

              <span
                className={`${statusColor} px-4 py-1 rounded-full text-sm font-semibold text-white`}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <p>
              <strong>🎨 Artwork:</strong> {order.artworkType}
            </p>

            <p>
              <strong>📏 Size:</strong> {order.paperSize}
            </p>

            <p>
              <strong>👥 People:</strong> {order.peopleCount}
            </p>

            <p>
              <strong>💰 Price:</strong> ₹{order.estimatedPrice}
            </p>

            <p>
              <strong>💳 Advance:</strong> ₹{order.advanceAmount}
            </p>

            <p>
              <strong>💵 Balance:</strong> ₹{order.balanceAmount}
            </p>
          </div>

          {order.notes && (
            <p className="mt-5 text-gray-400">
              {order.notes}
            </p>
          )}
          {order.completedImageUrl && (
  <div className="mt-5">
    <a
      href={order.completedImageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold transition inline-block"
    >
      View Completed Portrait
    </a>
  </div>
)}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={onView}
              className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg font-semibold transition"
            >
              View Details
            </button>

            <button
              onClick={() => updateStatus("In Progress")}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus("Completed")}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Completed
            </button>

            <button
              onClick={uploadPortrait}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Upload Portrait
            </button>

            <button
              onClick={deleteOrder}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
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