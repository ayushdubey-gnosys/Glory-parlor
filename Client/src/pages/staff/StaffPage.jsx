import React, { useState } from "react";

import {
  useStaff,
} from "../../services/staff/useStaffQuery";

import {
  useCalculateIncentive,
} from "../../services/staff/useStaffMutation";

const StaffPage = () => {
  const { data, isLoading } = useStaff();

  const {
    mutate,
    data: incentiveData,
  } = useCalculateIncentive();

  const [selectedStaff, setSelectedStaff] =
    useState("");

  const [productSalesCount, setProductSalesCount] =
    useState("");

  const [serviceSalesAmount, setServiceSalesAmount] =
    useState("");

  const handleCalculate = () => {
    mutate({
      staffId: selectedStaff,
      productSalesCount:
        Number(productSalesCount),

      serviceSalesAmount:
        Number(serviceSalesAmount),
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">
        Staff Management
      </h1>

      {/* STAFF TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden mb-10">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Salary
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((staff) => (
              <tr
                key={staff._id}
                className="border-t"
              >
                <td className="p-4">
                  {staff.name}
                </td>

                <td className="p-4">
                  {staff.role}
                </td>

                <td className="p-4">
                  {staff.phone}
                </td>

                <td className="p-4">
                  ₹{staff.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INCENTIVE CALCULATOR */}

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-bold mb-5">
          Incentive Calculator
        </h2>

        <div className="flex flex-col gap-4">
          <select
            value={selectedStaff}
            onChange={(e) =>
              setSelectedStaff(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              Select Staff
            </option>

            {data?.map((staff) => (
              <option
                key={staff._id}
                value={staff._id}
              >
                {staff.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Product Sales Count"
            value={productSalesCount}
            onChange={(e) =>
              setProductSalesCount(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Service Sales Amount"
            value={serviceSalesAmount}
            onChange={(e) =>
              setServiceSalesAmount(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <button
            onClick={handleCalculate}
            className="bg-black text-white py-3 rounded-lg"
          >
            Calculate Incentive
          </button>
        </div>

        {incentiveData && (
          <div className="mt-6 border-t pt-5">
            <h3 className="text-xl font-bold mb-4">
              Incentive Result
            </h3>

            <div className="space-y-2">
              <p>
                Staff:
                {" "}
                {incentiveData.staff}
              </p>

              <p>
                Role:
                {" "}
                {incentiveData.role}
              </p>

              <p>
                Product Commission:
                {" "}
                ₹
                {incentiveData.productCommission}
              </p>

              <p>
                Service Commission:
                {" "}
                ₹
                {incentiveData.serviceCommission}
              </p>

              <p>
                Percentage:
                {" "}
                {
                  incentiveData.serviceCommissionPercentage
                }
              </p>

              <p className="text-2xl font-bold text-green-600">
                Total Incentive:
                {" "}
                ₹
                {incentiveData.totalIncentive}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPage;