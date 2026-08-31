import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/users/all`,
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
    }
  };

  const monthlyData = Object.entries(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);

      const month = `${date.toLocaleString("default", {
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
      const type = order.artworkType || "Unknown";

      acc[type] = (acc[type] || 0) + 1;

      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-400">
          Users & Analytics
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="bg-slate-700 px-4 py-2 rounded-lg"
        >
          Back Dashboard
        </button>
      </div>

      {/* Monthly Orders Chart */}
      <div className="rounded-xl bg-slate-800 p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-5">
          📊 Monthly Orders Chart
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
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

      {/* Category Analysis */}
      <div className="mt-8 rounded-xl bg-slate-800 p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-5">
          🎨 Category Analysis
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryData).map(([type, count]) => (
            <div
              key={type}
              className="bg-slate-700 rounded-lg p-4"
            >
              <p className="text-slate-300 text-sm">
                {type}
              </p>

              <p className="text-2xl font-bold text-amber-400 mt-2">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Users */}
      <div className="mt-8 rounded-xl bg-slate-800 p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-5">
          👥 Registered Users ({users.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-700"
                >
                  <td className="py-3">
                    {user.name}
                  </td>

                  <td className="py-3">
                    {user.email}
                  </td>

                  <td className="py-3">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;