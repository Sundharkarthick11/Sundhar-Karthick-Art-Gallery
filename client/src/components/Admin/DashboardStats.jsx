const DashboardStats = ({ orders }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus !== "Completed"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  ).length;

  const revenue = orders.reduce(
    (total, order) =>
      total + Number(order.estimatedPrice || 0),
    0
  );

  const advance = orders.reduce(
    (total, order) =>
      total + Number(order.advanceAmount || 0),
    0
  );

  const balance = orders.reduce(
    (total, order) =>
      total + Number(order.balanceAmount || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
    },
    {
      title: "Pending",
      value: pendingOrders,
    },
    {
      title: "Completed",
      value: completedOrders,
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
    },
    {
      title: "Advance",
      value: `₹${advance}`,
    },
    {
      title: "Balance",
      value: `₹${balance}`,
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-slate-700 bg-slate-800/80 p-5 shadow-sm transition hover:border-slate-600"
        >
          <p className="text-sm font-medium text-slate-400">
            {stat.title}
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;