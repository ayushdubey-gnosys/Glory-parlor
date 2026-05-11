import React, {
  useMemo,
  useState,
} from "react";

import {
  Search,
  Send,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useCustomers } from "../../services/customers/useCustomerQuery";

import { useSendCampaign } from "../../services/marketing/useMarketingMutation";

const PAGE_SIZE = 6;

const filters = [
  "all",
  "premium",
  "middle",
  "economy",
  "new",
];

const MarketingPage = () => {
  const { data, isLoading } =
    useCustomers();

  const customers = Array.isArray(data)
    ? data
    : Array.isArray(data?.customers)
    ? data.customers
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const sendMutation =
    useSendCampaign();

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    selectedCustomers,
    setSelectedCustomers,
  ] = useState([]);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  // FILTERS
  const filteredCustomers =
    useMemo(() => {
      let filtered = customers;

      switch (activeFilter) {
        case "premium":
          filtered =
            filtered.filter(
              (c) =>
                c.category ===
                "premium"
            );
          break;

        case "middle":
          filtered =
            filtered.filter(
              (c) =>
                c.category ===
                "middle"
            );
          break;

        case "economy":
          filtered =
            filtered.filter(
              (c) =>
                c.category ===
                "economy"
            );
          break;

        case "new":
          filtered =
            filtered.filter(
              (c) =>
                c.visitCount <= 1
            );
          break;

        default:
          break;
      }

      return filtered.filter((c) =>
        c.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [
      customers,
      activeFilter,
      search,
    ]);

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
              (c) =>
                c._id === id
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
        ? prev.filter(
            (x) => x !== id
          )
        : [...prev, id]
    );
  };

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

    sendMutation.mutate({
      message,
      selectedCustomers,
    });
  };

  // LOADING
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">

        {/* HEADER */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
              Marketing Campaign
            </h1>

            <p className="text-zinc-500 mt-2">
              Send campaigns to your customers
            </p>
          </div>

          <div className="flex gap-4">

            <div className="bg-white border border-zinc-200 rounded-3xl px-5 py-4 shadow-sm">
              <p className="text-sm text-zinc-500">
                Total Customers
              </p>

              <h2 className="text-2xl font-bold text-zinc-900">
                {
                  filteredCustomers.length
                }
              </h2>
            </div>

            <div className="bg-zinc-900 text-white rounded-3xl px-5 py-4 shadow-sm">
              <p className="text-sm text-zinc-300">
                Selected
              </p>

              <h2 className="text-2xl font-bold">
                {
                  selectedCustomers.length
                }
              </h2>
            </div>

          </div>
        </div>

        {/* MESSAGE BOX */}
        <div className="
          bg-white
          border
          border-zinc-200
          rounded-3xl
          p-6
          shadow-sm
        ">

          <div className="flex items-center gap-3 mb-4">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-zinc-100
              flex
              items-center
              justify-center
            ">
              <MessageSquare
                className="text-zinc-900"
                size={22}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                Campaign Message
              </h2>

              <p className="text-zinc-500 text-sm">
                Write your marketing message
              </p>
            </div>
          </div>

          <textarea
            rows={5}
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Write campaign message..."
            className="
              w-full
              rounded-3xl
              border
              border-zinc-200
              bg-zinc-50
              px-5
              py-4
              text-zinc-900
              focus:outline-none
              focus:ring-2
              focus:ring-zinc-900
              resize-none
            "
          />

          <div className="mt-3 text-right text-sm text-zinc-500">
            {message.length} characters
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 flex flex-wrap gap-3">

          {filters.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveFilter(
                  item
                );

                setPage(1);
              }}
              className={`
                px-5
                py-2.5
                rounded-full
                text-sm
                font-medium
                capitalize
                transition-all
                ${
                  activeFilter === item
                    ? "bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* TOP ACTIONS */}
        <div className="
          mt-6
          bg-white
          border
          border-zinc-200
          rounded-3xl
          p-5
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        ">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={allSelected}
              onChange={
                toggleSelectAll
              }
              className="
                w-5
                h-5
                rounded
                accent-black
              "
            />

            <span className="font-medium text-zinc-900">
              Select All
            </span>
          </div>

          {/* RIGHT */}
          <div className="
            flex
            flex-col
            sm:flex-row
            items-stretch
            sm:items-center
            gap-3
            w-full
            lg:w-auto
          ">

            {/* SEARCH */}
            <div className="relative w-full sm:w-72">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search customers..."
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-2xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-zinc-900
                "
              />
            </div>

            <div className="text-sm text-zinc-500">
              Total:
              {" "}
              <span className="font-semibold text-zinc-900">
                {
                  filteredCustomers.length
                }
              </span>
            </div>

          </div>
        </div>

        {/* CUSTOMER GRID */}
        <div className="
          mt-6
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        ">

          {paginatedCustomers.map(
            (customer) => {

              const selected =
                selectedCustomers.includes(
                  customer._id
                );

              return (
                <div
                  key={customer._id}
                  onClick={() =>
                    toggleCustomer(
                      customer._id
                    )
                  }
                  className={`
                    rounded-3xl
                    border
                    p-5
                    transition-all
                    duration-300
                    cursor-pointer
                    hover:shadow-xl
                    hover:-translate-y-1
                    ${
                      selected
                        ? "border-zinc-900 bg-zinc-100"
                        : "border-zinc-200 bg-white"
                    }
                  `}
                >

                  <div className="flex justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex gap-4">

                      <img
                        src={
                          customer.profilePic
                        }
                        alt={
                          customer.name
                        }
                        className="
                          w-16
                          h-16
                          rounded-2xl
                          object-cover
                          border
                          border-zinc-200
                        "
                      />

                      <div>

                        <h3 className="font-bold text-lg text-zinc-900">
                          {
                            customer.name
                          }
                        </h3>

                        <p className="text-sm text-zinc-500 mt-1">
                          {
                            customer.phone
                          }
                        </p>

                        {/* BADGES */}
                        <div className="flex flex-wrap gap-2 mt-3">

                          <span
                            className={`
                              text-xs
                              px-3
                              py-1
                              rounded-full
                              capitalize
                              ${
                                customer.category ===
                                "premium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : customer.category ===
                                    "middle"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-zinc-100 text-zinc-700"
                              }
                            `}
                          >
                            {
                              customer.category
                            }
                          </span>

                          <span
                            className={`
                              text-xs
                              px-3
                              py-1
                              rounded-full
                              ${
                                customer.visitCount >
                                5
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            {customer.visitCount >
                            5
                              ? "Regular"
                              : "New"}
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      checked={
                        selected
                      }
                      onChange={() =>
                        toggleCustomer(
                          customer._id
                        )
                      }
                      className="
                        mt-1
                        w-5
                        h-5
                        accent-black
                      "
                    />

                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* PAGINATION */}
        <div className="
          mt-8
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-4
        ">

          <div className="text-sm text-zinc-500">
            Page{" "}
            <span className="font-semibold text-zinc-900">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-900">
              {totalPages || 1}
            </span>
          </div>

          <div className="flex items-center gap-3">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) =>
                  p - 1
                )
              }
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-white
                border
                border-zinc-200
                hover:bg-zinc-100
                disabled:opacity-40
              "
            >
              <ChevronLeft
                size={18}
              />
              Prev
            </button>

            <button
              disabled={
                page ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setPage((p) =>
                  p + 1
                )
              }
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-zinc-900
                hover:bg-black
                text-white
                disabled:opacity-40
              "
            >
              Next
              <ChevronRight
                size={18}
              />
            </button>

          </div>
        </div>

        {/* SEND BUTTON */}
        <div className="
          sticky
          bottom-4
          mt-8
        ">

          <button
            onClick={handleSend}
            disabled={
              sendMutation.isPending
            }
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-zinc-900
              hover:bg-black
              text-white
              py-4
              rounded-3xl
              font-semibold
              shadow-lg
              transition
            "
          >
            <Send size={20} />

            {sendMutation.isPending
              ? "Sending..."
              : `Send Campaign (${selectedCustomers.length})`}
          </button>
        </div>

      </div>
    </div>
  );
};

export default MarketingPage;