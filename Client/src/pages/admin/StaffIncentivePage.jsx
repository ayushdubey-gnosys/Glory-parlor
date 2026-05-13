import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Award,
  Loader2,
  IndianRupee,
  User,
  Briefcase,
} from "lucide-react";

import { getStaff } from "../../services/staff/staffApi";
import useCalculateIncentive from "../../hooks/useCalculateIncentive";
import StatCard from "../../components/ui/StatCard";

const StaffIncentivePage = () => {
  const [form, setForm] = useState({
    staffId: "",
    productSalesCount: 0,
    serviceSalesAmount: 0,
  });

  const {
    data: staffList,
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery({
    queryKey: ["staff-list"],
    queryFn: getStaff,
    staleTime: 1000 * 60 * 2,
  });

  const {
    mutate,
    isLoading,
    data,
    isError,
  } = useCalculateIncentive();

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name.includes("Count") ||
        name.includes("Amount")
          ? Number(value)
          : value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.staffId) return;

    mutate({
      staffId: form.staffId,
      productSalesCount: Number(
        form.productSalesCount
      ),
      serviceSalesAmount: Number(
        form.serviceSalesAmount
      ),
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <Award className="text-white" size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Staff Incentive Calculator
            </h2>

            <p className="text-gray-600 mt-1">
              Calculate staff commissions and
              incentives instantly.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM CARD */}
        <div className="lg:col-span-1 bg-white shadow-lg border border-gray-200 p-6 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* STAFF */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Staff
              </label>

              <select
                name="staffId"
                value={form.staffId}
                onChange={handleChange}
                className="mt-2 w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">
                  -- Select staff --
                </option>

                {staffLoading && (
                  <option>Loading...</option>
                )}

                {staffError && (
                  <option>
                    Error loading staff
                  </option>
                )}

                {staffList?.map((staff) => (
                  <option
                    key={staff._id || staff.id}
                    value={staff._id || staff.id}
                  >
                    {staff.name} — {staff.role}
                  </option>
                ))}
              </select>
            </div>

            {/* PRODUCT SALES */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Sales Count
              </label>

              <input
                type="number"
                name="productSalesCount"
                value={form.productSalesCount}
                onChange={handleChange}
                min={0}
                placeholder="Enter product sales"
                className="mt-2 w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* SERVICE SALES */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Sales Amount
              </label>

              <input
                type="number"
                name="serviceSalesAmount"
                value={form.serviceSalesAmount}
                onChange={handleChange}
                min={0}
                placeholder="Enter service sales amount"
                className="mt-2 w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-3 rounded-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Award size={18} />
                  Calculate Incentive
                </>
              )}
            </button>
          </form>

          {/* HELP TEXT */}
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
            <p className="text-sm text-gray-700">
              Fill the sales details and click
              calculate to generate the staff
              incentive breakdown.
            </p>
          </div>
        </div>

        {/* RESULT SECTION */}
        <div className="lg:col-span-2 space-y-6 bg-white shadow-lg border border-gray-200 p-6 rounded-2xl">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 text-red-800  md:grid-cols-3 gap-4">
            <StatCard
              title="Product Sales"
              value={
                data?.incentiveDetails
                  ?.productSalesCount ?? "—"
              }
            />

            <StatCard
              title="Product Commission"
              value={
                data?.incentiveDetails
                  ?.productCommission
                  ? `₹${data.incentiveDetails.productCommission}`
                  : "—"
              }
            />

            <StatCard
              title="Service Commission"
              value={
                data?.incentiveDetails
                  ?.serviceCommission
                  ? `₹${data.incentiveDetails.serviceCommission}`
                  : "—"
              }
            />
          </div>

          {/* ERROR */}
          {isError && (
            <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-2xl">
              Error calculating incentive.
            </div>
          )}

          {/* EMPTY */}
          {!data && (
            <div className="bg-white shadow-lg border border-gray-200 p-8 rounded-2xl">
              <div className="flex flex-col items-center justify-center text-center">
                <Award
                  size={50}
                  className="text-yellow-500 mb-4"
                />

                <h3 className="text-xl font-semibold text-gray-900">
                  No Incentive Calculated
                </h3>

                <p className="text-gray-500 mt-2">
                  Enter sales details to view
                  incentive summary.
                </p>
              </div>
            </div>
          )}

          {/* RESULT CARD */}
          {data && (
            <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Incentive Summary
              </h3>

              {/* TOP INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* STAFF INFO */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <User
                      size={18}
                      className="text-yellow-600"
                    />

                    <h4 className="font-semibold text-gray-900">
                      Staff Details
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Staff Name
                      </p>

                      <p className="font-semibold text-gray-900">
                        {data.staff?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Role
                      </p>

                      <p className="font-semibold text-gray-900">
                        {data.staff?.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase
                      size={18}
                      className="text-yellow-600"
                    />

                    <h4 className="font-semibold text-gray-900">
                      Product Details
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Product Sales Count
                      </p>

                      <p className="font-semibold text-gray-900">
                        {
                          data.incentiveDetails
                            .productSalesCount
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Product Commission
                      </p>

                      <p className="font-semibold text-green-600">
                        ₹
                        {
                          data.incentiveDetails
                            .productCommission
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SERVICE DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <p className="text-sm text-gray-500">
                    Service Sales Amount
                  </p>

                  <p className="font-bold text-gray-900 mt-2">
                    ₹
                    {
                      data.incentiveDetails
                        .serviceSalesAmount
                    }
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <p className="text-sm text-gray-500">
                    Commission Percentage
                  </p>

                  <p className="font-bold text-yellow-600 mt-2">
                    {
                      data.incentiveDetails
                        .serviceCommissionPercentage
                    }
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <p className="text-sm text-gray-500">
                    Service Commission
                  </p>

                  <p className="font-bold text-green-600 mt-2">
                    ₹
                    {
                      data.incentiveDetails
                        .serviceCommission
                    }
                  </p>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-sm text-white/80">
                    Total Incentive
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-1">
                    ₹
                    {
                      data.incentiveDetails
                        .totalIncentive
                    }
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <IndianRupee
                    size={32}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffIncentivePage;