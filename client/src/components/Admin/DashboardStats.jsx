const DashboardStats = ({ orders }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus !== "Completed"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.estimatedPrice || 0),
    0
  );

  const totalAdvance = orders.reduce(
    (sum, order) => sum + Number(order.advanceAmount || 0),
    0
  );

  const totalBalance = orders.reduce(
    (sum, order) => sum + Number(order.balanceAmount || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-blue-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: completedOrders,
      color: "bg-green-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      color: "bg-purple-600",
    },
    {
      title: "Advance",
      value: `₹${totalAdvance}`,
      color: "bg-amber-500",
    },
    {
      title: "Balance",
      value: `₹${totalBalance}`,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`${item.color} rounded-xl p-5 shadow-lg text-center`}
        >
          <h3 className="text-sm text-white opacity-90">
            {item.title}
          </h3>

          <p className="text-3xl font-bold text-white mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;