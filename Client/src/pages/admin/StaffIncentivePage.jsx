import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Award,
  Loader2,
  IndianRupee,
  User,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Printer,
  RefreshCw,
  TrendingUp,
  ShoppingBag,
  Scissors,
  Users,
  Calculator,
  HelpCircle,
  Plus,
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
        name.includes("Count") || name.includes("Amount")
          ? Number(value) || 0
          : value,
    }));
  };

  // QUICK PRESET BUTTONS
  const addProductSales = (amount) => {
    setForm((prev) => ({
      ...prev,
      productSalesCount: Math.max(0, (Number(prev.productSalesCount) || 0) + amount),
    }));
  };

  const addServiceSales = (amount) => {
    setForm((prev) => ({
      ...prev,
      serviceSalesAmount: Math.max(0, (Number(prev.serviceSalesAmount) || 0) + amount),
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.staffId) {
      toast.warning("Please select a staff member first!");
      return;
    }

    mutate(
      {
        staffId: form.staffId,
        productSalesCount: Number(form.productSalesCount) || 0,
        serviceSalesAmount: Number(form.serviceSalesAmount) || 0,
      },
      {
        onSuccess: () => {
          toast.success("Incentive calculated successfully!");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to calculate incentive");
        },
      }
    );
  };

  // HANDLE RESET
  const handleReset = () => {
    setForm({
      staffId: "",
      productSalesCount: 0,
      serviceSalesAmount: 0,
    });
    toast.info("Calculator reset");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 text-zinc-800 dm">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
              Payroll & HR Suite
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
              Staff Incentive Engine
            </h1>
            <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
              Accurately compute staff commissions and generate instant printable payout slips.
            </p>
          </div>

          {/* HEADER SUMMARY PILLS */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
              <Users size={18} className="text-[#D68B2A]" />
              <div className="text-xs">
                <span className="text-gray-400 font-medium uppercase mr-1">Total Staff:</span>
                <span className="font-bold font-mono text-gray-900 text-sm">{staffList ? staffList.length : 0}</span>
              </div>
            </div>

            <div className="bg-[#D68B2A]/10 border border-[#D68B2A]/30 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <Calculator size={18} className="text-[#D68B2A]" />
              <div className="text-xs">
                <span className="text-[#D68B2A] font-medium uppercase mr-1">Engine Status:</span>
                <span className="font-bold text-[#D68B2A] text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* FORM CARD (LEFT) */}
          <div className="lg:col-span-1 bg-white shadow-xl border border-zinc-200/80 p-6 md:p-7 rounded-3xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#292B2B] text-[#D68B2A] flex items-center justify-center shadow-md">
                  <Calculator size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-900">Input Sales Data</h3>
                  <p className="text-xs text-zinc-500">Select employee & performance</p>
                </div>
              </div>

              {(form.staffId || form.productSalesCount > 0 || form.serviceSalesAmount > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-zinc-400 hover:text-red-500 transition flex items-center gap-1"
                >
                  <RefreshCw size={13} /> Reset
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SELECT STAFF */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2 flex items-center justify-between">
                  <span>1. Select Employee</span>
                  <span className="text-[#D68B2A]">*Required</span>
                </label>
                <select
                  name="staffId"
                  value={form.staffId}
                  onChange={handleChange}
                  className="w-full bg-[#faf9f5] border border-zinc-300 rounded-2xl px-4 py-3.5 text-zinc-900 font-medium focus:outline-none focus:border-[#D68B2A] focus:ring-2 focus:ring-amber-500/20 transition shadow-xs"
                >
                  <option value="">-- Choose Staff Member --</option>
                  {staffLoading && <option disabled>Loading staff directory...</option>}
                  {staffError && <option disabled>Error loading staff</option>}
                  {staffList?.map((staff) => (
                    <option key={staff._id || staff.id} value={staff._id || staff.id}>
                      {staff.name} ({staff.role || "Stylist"})
                    </option>
                  ))}
                </select>
              </div>

              {/* PRODUCT SALES COUNT */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                    <ShoppingBag size={14} className="text-[#D68B2A]" /> 2. Product Retail Units
                  </label>
                  <span className="text-xs font-mono font-bold text-zinc-400">Qty</span>
                </div>

                <input
                  type="number"
                  name="productSalesCount"
                  value={form.productSalesCount === 0 ? "" : form.productSalesCount}
                  onChange={handleChange}
                  min={0}
                  placeholder="0"
                  className="w-full bg-[#faf9f5] border border-zinc-300 rounded-2xl px-4 py-3.5 text-zinc-900 font-mono font-bold text-lg focus:outline-none focus:border-[#D68B2A] focus:ring-2 focus:ring-amber-500/20 transition shadow-xs"
                />

                {/* PRESET PILLS */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-medium text-zinc-400 mr-1">Add:</span>
                  {[5, 10, 25, 50].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => addProductSales(num)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-100 hover:text-amber-800 border border-zinc-200 text-xs font-bold text-zinc-600 transition"
                    >
                      +{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* SERVICE SALES AMOUNT */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                    <Scissors size={14} className="text-[#D68B2A]" /> 3. Service Revenue (₹)
                  </label>
                  <span className="text-xs font-mono font-bold text-zinc-400">INR</span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="serviceSalesAmount"
                    value={form.serviceSalesAmount === 0 ? "" : form.serviceSalesAmount}
                    onChange={handleChange}
                    min={0}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3.5 bg-[#faf9f5] border border-zinc-300 rounded-2xl text-zinc-900 font-mono font-bold text-lg focus:outline-none focus:border-[#D68B2A] focus:ring-2 focus:ring-amber-500/20 transition shadow-xs"
                  />
                </div>

                {/* PRESET PILLS */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-medium text-zinc-400 mr-1">Add:</span>
                  {[5000, 15000, 25000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => addServiceSales(amt)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-100 hover:text-amber-800 border border-zinc-200 text-xs font-bold text-zinc-600 transition font-mono"
                    >
                      +₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* CALCULATE BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D68B2A] via-amber-600 to-[#b8731e] hover:brightness-110 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-xl transition transform active:scale-95 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Calculating Incentive...
                  </>
                ) : (
                  <>
                    <Award size={20} />
                    Compute Staff Payout
                  </>
                )}
              </button>
            </form>

            {/* HELP CARD */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <HelpCircle size={18} className="text-[#D68B2A] shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                Commissions are calculated dynamically based on predefined Astha PMS staff role tiers and target slabs.
              </p>
            </div>
          </div>

          {/* RESULT SECTION (RIGHT) */}
          <div className="lg:col-span-2 space-y-6">
            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-md flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    Product Sales
                  </p>
                  <h3 className="text-2xl font-bold font-mono text-zinc-900 mt-1">
                    {data?.incentiveDetails?.productSalesCount ?? "—"}
                    <span className="text-xs font-normal text-zinc-400 ml-1">units</span>
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#D68B2A] flex items-center justify-center shrink-0">
                  <ShoppingBag size={22} />
                </div>
              </div>

              <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-md flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    Product Commission
                  </p>
                  <h3 className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                    {data?.incentiveDetails?.productCommission
                      ? `₹${data.incentiveDetails.productCommission}`
                      : "—"}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp size={22} />
                </div>
              </div>

              <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-md flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    Service Commission
                  </p>
                  <h3 className="text-2xl font-bold font-mono text-[#D68B2A] mt-1">
                    {data?.incentiveDetails?.serviceCommission
                      ? `₹${data.incentiveDetails.serviceCommission}`
                      : "—"}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-[#D68B2A] flex items-center justify-center shrink-0">
                  <Scissors size={22} />
                </div>
              </div>
            </div>

            {/* ERROR CARD */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-3xl flex items-center gap-3">
                <span className="font-bold bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">Error</span>
                <div>
                  <h4 className="font-bold">Computation Error</h4>
                  <p className="text-xs">Failed to generate commission breakdown. Please verify staff details.</p>
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {!data && (
              <div className="bg-white border border-zinc-200/80 rounded-3xl p-10 md:p-14 text-center shadow-lg space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-[#D68B2A] flex items-center justify-center mx-auto shadow-sm border border-amber-500/20">
                  <Award size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Ready to Compute Staff Commission
                  </h3>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto mt-1.5 leading-relaxed">
                    Select an employee from the left panel and input their retail sales and service revenue to generate an official executive payout breakdown.
                  </p>
                </div>
              </div>
            )}

            {/* OFFICIAL RESULT & PAYOUT SLIP */}
            {data && (
              <div
                id="incentive-print-card"
                className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-8"
              >
                {/* SLIP HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D68B2A] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      Official Commission Payout Slip
                    </span>
                    <h3 className="text-2xl font-extrabold text-zinc-900 mt-2">
                      Incentive Breakdown Statement
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                      Generated on: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • Astha PMS Engine
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 bg-[#292B2B] hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                    >
                      <Printer size={15} /> Print Slip
                    </button>
                  </div>
                </div>

                {/* STAFF PROFILE BANNER */}
                <div className="bg-[#faf9f5] border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#292B2B] text-yellow-400 font-bold text-xl flex items-center justify-center shadow-md border border-yellow-500/30">
                      {data.staff?.name ? data.staff.name.charAt(0).toUpperCase() : "S"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Employee Name
                      </p>
                      <h4 className="text-xl font-extrabold text-zinc-900">
                        {data.staff?.name || "Staff Member"}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Designation / Role
                    </p>
                    <span className="inline-block mt-1 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                      {data.staff?.role || "Stylist"}
                    </span>
                  </div>
                </div>

                {/* 2-COLUMN COMMISSION DETAIL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PRODUCT RETAIL BOX */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-xs hover:border-[#D68B2A]/50 transition">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={18} className="text-[#D68B2A]" />
                        <h4 className="font-bold text-zinc-900 text-sm">Product Commission</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Retail Incentive
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Retail Sales Count:</span>
                        <span className="font-mono font-bold text-zinc-900">
                          {data.incentiveDetails.productSalesCount} units
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Commission Rate:</span>
                        <span className="font-mono text-zinc-700">Standard Tier</span>
                      </div>
                      <div className="pt-2 border-t border-dashed border-zinc-200 flex justify-between items-center">
                        <span className="font-bold text-zinc-800">Earned Commission:</span>
                        <span className="font-mono font-extrabold text-emerald-600 text-lg">
                          ₹{data.incentiveDetails.productCommission}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SERVICE REVENUE BOX */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-xs hover:border-[#D68B2A]/50 transition">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <Scissors size={18} className="text-[#D68B2A]" />
                        <h4 className="font-bold text-zinc-900 text-sm">Service Commission</h4>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {data.incentiveDetails.serviceCommissionPercentage || "Tier Slab"}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Service Revenue generated:</span>
                        <span className="font-mono font-bold text-zinc-900">
                          ₹{data.incentiveDetails.serviceSalesAmount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Applied Commission Rate:</span>
                        <span className="font-mono font-bold text-[#D68B2A]">
                          {data.incentiveDetails.serviceCommissionPercentage || "N/A"}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-dashed border-zinc-200 flex justify-between items-center">
                        <span className="font-bold text-zinc-800">Earned Commission:</span>
                        <span className="font-mono font-extrabold text-emerald-600 text-lg">
                          ₹{data.incentiveDetails.serviceCommission}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GRAND TOTAL BANNER */}
                <div className="bg-[#292B2B] text-white p-6 md:p-7 rounded-2xl shadow-xl border border-[#D68B2A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Award size={16} /> Total Incentive Payable to Employee
                    </span>
                    <p className="text-xs text-zinc-400 mt-1">
                      Includes product + service commissions verified by Astha PMS
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
                    <span className="text-xl text-yellow-400 font-mono">₹</span>
                    <span className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {data.incentiveDetails.totalIncentive}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffIncentivePage;