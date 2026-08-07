const TrackingTimeline = ({ status }) => {
  const steps = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center mb-4">

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${
              index <= currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>

          <div className="ml-4">
            <p
              className={`font-semibold ${
                index <= currentStep
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;