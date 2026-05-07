import React from "react";
import { useServices } from "../../services/Services/useServiceQuery";

const ServicesPage = () => {
  const { data, isLoading } = useServices();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Salon Services
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {data?.map((service) => (
          <div
            key={service._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {service.name}
              </h2>

              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                {service.category}
              </span>
            </div>

            <p className="text-gray-500 mt-3">
              {service.description}
            </p>

            <div className="mt-5 space-y-2">
              <p>
                Price:
                {" "}
                <span className="font-semibold">
                  ₹{service.price}
                </span>
              </p>

              <p>
                Duration:
                {" "}
                <span className="font-semibold">
                  {service.duration}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Edit
              </button>

              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;