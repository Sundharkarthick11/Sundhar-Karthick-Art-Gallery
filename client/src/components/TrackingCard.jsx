import TrackingTimeline from "./TrackingTimeline";

const TrackingCard = ({ order }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold text-amber-400">
            {order.artworkType}
          </h2>

          <p className="text-gray-400 mt-1">
            Order ID: {order.orderId || order._id}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-white font-semibold
            ${
              order.paymentStatus === "Paid"
                ? "bg-green-600"
                : "bg-yellow-500"
            }`}
        >
          {order.paymentStatus}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>
          <p><strong>Paper Size:</strong> {order.paperSize}</p>

          <p><strong>People:</strong> {order.peopleCount}</p>

          <p><strong>Total Price:</strong> ₹{order.estimatedPrice}</p>

          <p><strong>Advance:</strong> ₹{order.advanceAmount}</p>

          <p><strong>Balance:</strong> ₹{order.balanceAmount}</p>
        </div>

        <TrackingTimeline status={order.orderStatus} />

      </div>

      {order.completedImageUrl && (
        <div className="mt-8">

          <img
            src={order.completedImageUrl}
            alt="Completed Portrait"
            className="w-full max-w-sm rounded-xl border border-green-500"
          />

          <a
            href={order.completedImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
          >
            Download Portrait
          </a>

        </div>
      )}

    </div>
  );
};

export default TrackingCard;