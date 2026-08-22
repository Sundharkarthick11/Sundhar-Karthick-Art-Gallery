import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-4">
          📦 My Orders
        </h1>

        <p className="text-slate-400 mb-10">
          View and track all your portrait orders.
        </p>

        {orders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl text-white font-semibold">
              No Orders Yet
            </h2>

            <p className="text-slate-400 mt-3">
              Your future orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex justify-between flex-wrap gap-4">

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {order.orderId}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      {order.artworkType}
                    </p>
                  </div>

                  <div>
  <span
    className={`px-4 py-2 rounded-full font-semibold ${
      order.orderStatus === "Delivered"
        ? "bg-purple-500 text-white"
        : order.orderStatus === "Completed"
        ? "bg-green-500 text-white"
        : order.orderStatus === "In Progress"
        ? "bg-blue-500 text-white"
        : "bg-amber-500 text-black"
    }`}
  >
    {order.orderStatus}
  </span>
</div>

                </div>

                <div className="mt-5 text-slate-300 space-y-2">
                  <p>Paper Size: {order.paperSize}</p>
                  <p>People Count: {order.peopleCount}</p>
                  <p>Estimated Price: ₹{order.estimatedPrice}</p>
                </div>

                {order.completedImageUrl && (
                  <div className="mt-6">
                    <img
                      src={order.completedImageUrl}
                      alt="Completed Portrait"
                      loading="lazy"
                      className="rounded-xl max-h-96"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;