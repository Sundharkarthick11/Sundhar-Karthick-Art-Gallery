import { useState } from "react";
import TrackingCard from "../components/TrackingCard";

const TrackOrder = () => {
  const [searchType, setSearchType] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState([]);

  const trackOrder = async () => {
    if (!searchValue.trim()) {
      alert("Please enter a value.");
      return;
    }

    try {
      const url =
        searchType === "email"
          ? `http://localhost:5000/api/orders/track/${searchValue}`
          : `http://localhost:5000/api/orders/track/order/${searchValue}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        if (searchType === "email") {
          setOrders(data.orders);
        } else {
          setOrders([data.order]);
        }
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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Search Box */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center text-amber-400">
            Track My Order
          </h1>

          <p className="text-gray-400 text-center mt-3">
            Search using your Email or Order ID
          </p>

          <div className="flex gap-8 justify-center mt-8">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="email"
                checked={searchType === "email"}
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearchValue("");
                  setOrders([]);
                }}
              />
              Search by Email
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="orderId"
                checked={searchType === "orderId"}
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearchValue("");
                  setOrders([]);
                }}
              />
              Search by Order ID
            </label>

          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">

            <input
              type="text"
              placeholder={
                searchType === "email"
                  ? "Enter your Email"
                  : "Enter your Order ID"
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-amber-400"
            />

            <button
              onClick={trackOrder}
              className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Track Order
            </button>

          </div>

        </div>

        {/* Results */}

        <div className="mt-10 space-y-8">

          {orders.length > 0 ? (
            orders.map((order) => (
              <TrackingCard
                key={order._id}
                order={order}
              />
            ))
          ) : (
            <div className="text-center text-gray-400">
              No orders to display.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default TrackOrder;