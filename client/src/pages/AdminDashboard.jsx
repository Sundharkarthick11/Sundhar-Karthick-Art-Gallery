import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardStats from "../components/Admin/DashboardStats";
import OrderCard from "../components/Admin/OrderCard";
import OrderDetailsModal from "../components/Admin/OrderDetailsModal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);

const [totalPages, setTotalPages] =
  useState(1);

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

  setTotalPages(
    data.totalPages || 1
  );
}else {
      console.log(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
const fetchStats = async () => {
  try {
    const token =
      localStorage.getItem("adminToken");

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
    navigate("/admin/login");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const monthlyData = Object.entries(
  orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);

    const month =
      `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

    acc[month] = (acc[month] || 0) + 1;

    return acc;
  }, {})
).map(([month, orders]) => ({
  month,
  orders,
}));

const categoryData = orders.reduce(
  (acc, order) => {
    const type =
      order.artworkType || "Unknown";

    acc[type] = (acc[type] || 0) + 1;

    return acc;
  },
  {}
);

const maxCategoryCount =
  Math.max(
    ...Object.values(categoryData),
    1
  );

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
      <DashboardStats
  orders={orders}
  totalUsers={totalUsers}
/>
<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* Monthly Orders Analysis */}
  <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/80 p-6">
  <h2 className="text-xl font-bold text-white mb-5">
    📊 Monthly Orders Chart
  </h2>

  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
  dataKey="month"
  angle={-30}
  textAnchor="end"
  height={70}
/>

        <YAxis />

        <Tooltip />

        <Bar
  dataKey="orders"
  fill="#f59e0b"
  radius={[6, 6, 0, 0]}
/>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

  {/* Artwork Category Analysis */}
  <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-6">
    <h2 className="text-xl font-bold text-white mb-5">
      🎨 Artwork Category Analysis
    </h2>

    {Object.entries(categoryData).map(([type, count]) => (
      <div key={type} className="mb-4">
        <div className="flex justify-between mb-1">
          <span>{type}</span>
          <span>{count}</span>
        </div>

        <div className="h-3 bg-slate-700 rounded">
          <div
            className="h-3 bg-emerald-500 rounded"
            sstyle={{
  width: `${
    (count / maxCategoryCount) * 100
  }%`,
}}
          />
        </div>
      </div>
    ))}
  </div>

</div>

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

      <div className="mt-10 flex items-center justify-center gap-4">

  <button
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
    className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() =>
      setPage(page + 1)
    }
    className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-50"
  >
    Next
  </button>

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