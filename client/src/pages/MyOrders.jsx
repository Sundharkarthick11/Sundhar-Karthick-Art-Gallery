import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-slate-400">
          Track all your portrait orders.
        </p>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

            <div className="text-6xl">
              📦
            </div>

            <h2 className="mt-4 text-2xl font-semibold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-slate-400">
              Your portrait orders will appear here.
            </p>

          </div>
        ) : (
          <div className="mt-10 space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="text-xl font-semibold">
                  {order.customerName}
                </h3>

                <p className="mt-2 text-slate-400">
                  {order.portraitType}
                </p>

                <p className="mt-2">
                  Status:
                  <span className="ml-2 text-amber-400">
                    {order.status || "Pending"}
                  </span>
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}