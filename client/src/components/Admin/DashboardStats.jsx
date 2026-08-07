import {
  Package,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

const DashboardStats = ({ orders }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Pending" ||
      order.orderStatus === "Pending Review"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  ).length;

  // Total Business Value
  const revenue = orders.reduce(
    (sum, order) => sum + order.estimatedPrice,
    0
  );

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <Package size={30} />,
      color: "bg-blue-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <Clock3 size={30} />,
      color: "bg-orange-500",
    },
    {
      title: "Completed Orders",
      value: completedOrders,
      icon: <CheckCircle2 size={30} />,
      color: "bg-green-600",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      icon: <IndianRupee size={30} />,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} p-4 rounded-xl text-white`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;