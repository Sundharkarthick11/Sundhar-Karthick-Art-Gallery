import { useEffect, useMemo, useState } from "react";
import DashboardStats from "../components/Admin/DashboardStats";
import OrderCard from "../components/Admin/OrderCard";
import OrderDetailsModal from "../components/Admin/OrderDetailsModal";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  return (
    <div className="min-h-screen bg-[#111827] text-white p-8">

      <h1 className="text-4xl font-bold text-amber-400">
        Sundhar Karthick Art Gallery
      </h1>

      <p className="text-gray-400 mt-2">
        Admin Dashboard
      </p>

      <div className="mt-8">
        <input
          type="text"
          placeholder="🔍 Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white border border-gray-700 outline-none focus:border-amber-400"
        />
      </div>

      <DashboardStats orders={orders} />

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