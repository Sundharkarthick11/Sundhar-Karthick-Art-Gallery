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

  const [totalUsers, setTotalUsers] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTotalUsers(data.totalUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminEmail");
  navigate("/harthick23");
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
            onClick={() => navigate("/harthick23/users")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold"
          >
            Users Analytics
          </button>

          <button
            onClick={() => navigate("/harthick23/artworks")}
            className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg text-black font-semibold"
          >
            Manage Artworks
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
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

      {/* Dashboard Stats */}
      <DashboardStats
        orders={orders}
        totalUsers={totalUsers}
      />

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

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* Modal */}
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