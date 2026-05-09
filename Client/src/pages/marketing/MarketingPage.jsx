import React, {
  useMemo,
  useState,
} from "react";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import { useSendCampaign } from "../../services/marketing/useMarketingMutation";

const PAGE_SIZE = 6;

const MarketingPage = () => {
  const { data: customers = [], isLoading } =
    useCustomers();

  const sendMutation =
    useSendCampaign();

  const [message, setMessage] =
    useState("");

  const [selectedCustomers, setSelectedCustomers] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [page, setPage] = useState(1);

  // FILTER CUSTOMERS
  const filteredCustomers =
    useMemo(() => {
      switch (activeFilter) {
        case "premium":
          return customers.filter(
            (c) =>
              c.category ===
              "premium"
          );

        case "middle":
          return customers.filter(
            (c) =>
              c.category ===
              "middle"
          );

        case "economy":
          return customers.filter(
            (c) =>
              c.category ===
              "economy"
          );

        case "new":
          return customers.filter(
            (c) =>
              c.visitCount <= 1
          );

        default:
          return customers;
      }
    }, [customers, activeFilter]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredCustomers.length /
      PAGE_SIZE
  );

  const paginatedCustomers =
    filteredCustomers.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  // SELECT ALL
  const allSelected =
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) =>
      selectedCustomers.includes(
        c._id
      )
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedCustomers((prev) =>
        prev.filter(
          (id) =>
            !paginatedCustomers.some(
              (c) => c._id === id
            )
        )
      );
    } else {
      setSelectedCustomers((prev) => [
        ...new Set([
          ...prev,
          ...paginatedCustomers.map(
            (c) => c._id
          ),
        ]),
      ]);
    }
  };

  // SINGLE SELECT
  const toggleCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // SELECTED DATA
  const selectedCustomerData =
    customers.filter((c) =>
      selectedCustomers.includes(
        c._id
      )
    );

  // SEND
  const handleSend = () => {
    if (!message.trim()) {
      return alert(
        "Enter message"
      );
    }

    if (
      selectedCustomers.length === 0
    ) {
      return alert(
        "Select customers"
      );
    }

    // send only selected customer IDs to backend
    sendMutation.mutate({
      message,
      selectedCustomers: selectedCustomers,
    });
  };

  // LOADING
  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Marketing Campaign
          </h1>

          <p className="text-gray-500 mt-2">
            Send campaign to
            customers
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          {/* MESSAGE */}
          <div>
            <label className="block font-semibold mb-2">
              Campaign Message
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Write message..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3"
            />
          </div>

          {/* FILTERS */}
          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "all",
              "premium",
              "middle",
              "economy",
              "new",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveFilter(
                    item
                  );

                  setPage(1);
                }}
                className={`px-5 py-2 rounded-full capitalize transition ${
                  activeFilter ===
                  item
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* TOP ACTION */}
          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={
                  allSelected
                }
                onChange={
                  toggleSelectAll
                }
              />

              <span className="font-medium">
                Select All
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Total:
              {" "}
              {
                filteredCustomers.length
              }
            </div>
          </div>

          {/* CUSTOMER GRID */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {paginatedCustomers.map(
              (customer) => (
                <div
                  key={
                    customer._id
                  }
                  className={`border rounded-3xl p-5 transition ${
                    selectedCustomers.includes(
                      customer._id
                    )
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white"
                  }`}
                >

                  <div className="flex justify-between">

                    <div className="flex gap-4">

                      <img
                        src={
                          customer.profilePic
                        }
                        alt={
                          customer.name
                        }
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-bold text-lg">
                          {
                            customer.name
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            customer.phone
                          }
                        </p>

                        <div className="flex gap-2 mt-2">

                          <span
                            className={`text-xs px-3 py-1 rounded-full capitalize ${
                              customer.category ===
                              "premium"
                                ? "bg-yellow-100 text-yellow-700"
                                : customer.category ===
                                  "middle"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {
                              customer.category
                            }
                          </span>

                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              customer.visitCount >
                              5
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {customer.visitCount >
                            5
                              ? "Regular"
                              : "New"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(
                        customer._id
                      )}
                      onChange={() =>
                        toggleCustomer(
                          customer._id
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* PAGINATION */}
          <div className="mt-8 flex items-center justify-center gap-3">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) => p - 1)
              }
              className="px-4 py-2 rounded-xl border disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {page} of{" "}
              {totalPages || 1}
            </span>

            <button
              disabled={
                page === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setPage((p) => p + 1)
              }
              className="px-4 py-2 rounded-xl border disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* SEND BUTTON */}
          <div className="mt-8">

            <button
              onClick={handleSend}
              disabled={
                sendMutation.isPending
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
            >
              {sendMutation.isPending
                ? "Sending..."
                : `Send Campaign (${selectedCustomers.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;