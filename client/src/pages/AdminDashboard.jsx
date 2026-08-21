import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardStats from "../components/Admin/DashboardStats";
import OrderCard from "../components/Admin/OrderCard";
import OrderDetailsModal from "../components/Admin/OrderDetailsModal";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setOrders(data.orders);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-amber-400">
            Sundhar Karthick Art Gallery
          </h1>

          <p className="text-gray-400 mt-2">
            Admin Dashboard
          </p>
        </div>

        <div className="flex gap-3">

  <button
    onClick={() => navigate("/admin/artworks")}
    className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg text-black font-semibold transition"
  >
    Manage Artworks
  </button>

  <button
    onClick={logout}
    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold transition"
  >
    Logout
  </button>

</div>

      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="🔍 Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white border border-gray-700 outline-none focus:border-amber-400"
        />
      </div>

      {/* Dashboard Statistics */}
      <DashboardStats orders={orders} />

      {/* Orders */}
      <div className="mt-10 space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              fetchOrders={fetchOrders}
              onView={() => setSelectedOrder(order)}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-10">
            No orders found.
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
};

export default AdminDashboard;