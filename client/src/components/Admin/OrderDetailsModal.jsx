const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-3xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-amber-400 mb-6">
          Order Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <img
              src={order.imageUrl}
              alt="Reference"
              className="rounded-xl w-full"
            />
          </div>

          <div>

            <p><strong>Name:</strong> {order.customerName}</p>

            <p><strong>Email:</strong> {order.email}</p>

            <p><strong>Phone:</strong> {order.phone}</p>

            <p><strong>Artwork:</strong> {order.artworkType}</p>

            <p><strong>Paper:</strong> {order.paperSize}</p>

            <p><strong>People:</strong> {order.peopleCount}</p>

            <p><strong>Estimated Price:</strong> ₹{order.estimatedPrice}</p>

            <p><strong>Advance:</strong> ₹{order.advanceAmount}</p>

            <p><strong>Balance:</strong> ₹{order.balanceAmount}</p>

            <p><strong>Payment:</strong> {order.paymentStatus}</p>

            <p><strong>Status:</strong> {order.orderStatus}</p>

            <p className="mt-4">
              <strong>Notes:</strong>
            </p>

            <p className="text-gray-300">
              {order.notes || "No notes"}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;