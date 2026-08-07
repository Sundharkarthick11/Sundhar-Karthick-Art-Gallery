import { useState } from "react";
import TrackingTimeline from "../components/TrackingTimeline";
import TrackingCard from "../components/TrackingCard";

const TrackOrder = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);

  const trackOrder = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/track/${email}`
      );

      const data = await response.json();

      if (data.success) {
  setOrders(data.orders);
} else {
  setOrders([]);
  alert(data.message);
}
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center text-amber-400">
          Track Your Order
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Enter your email address to check your portrait status.
        </p>

        <div className="mt-8">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-amber-400"
          />

          <button
            onClick={trackOrder}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg font-semibold transition"
          >
            Track Order
          </button>
        </div>

       {orders.map((order) => (
  <TrackingCard
    key={order._id}
    order={order}
  />
))}
      </div>
    </div>
  );
};

export default TrackOrder;