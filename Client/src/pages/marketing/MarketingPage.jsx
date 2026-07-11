import React, { useMemo, useState } from "react";
import { getAvatarUrl } from "../../utils/avatar";
import {
  Search,
  Send,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Tag,
  Filter,
  Zap,
  Award,
  Smartphone,
  Smile,
  RefreshCw,
  Check,
  AlertCircle,
  Megaphone,
} from "lucide-react";
import { toast } from "react-toastify";
import { useCustomers } from "../../services/customers/useCustomerQuery";
import { useSendCampaign } from "../../services/marketing/useMarketingMutation";

const PAGE_SIZE = 9;

const TEMPLATES = [
  {
    title: "Festive Offer (20% OFF)",
    content:
      "Celebrate the festive season with Astha Luxury Salon! Enjoy an exclusive 20% OFF on all hair spa and keratin treatments this weekend. Show this message at reception. Book now!",
  },
  {
    title: "Birthday Special",
    content:
      "Happy Birthday from Astha Salon & Spa! We have a complimentary hair spa session waiting just for you inside your birthday month. Visit us to claim your gift!",
  },
  {
    title: "New Luxury Arrival",
    content:
      "Exciting news! We have just launched our new organic Botox hair therapies and relaxing Moroccan body spa rituals. Experience world-class pampering today at Astha PMS!",
  },
  {
    title: "Weekend Pamper Package",
    content:
      "Unwind this weekend with our signature Aromatherapy Facial & Pedicure combo at a special package price. Slots filling fast—reply to book your appointment now!",
  },
];

const filters = [
  { id: "all", label: "All Audience", icon: Users },
  { id: "premium", label: "VIP Premium", icon: Award },
  { id: "middle", label: "Middle Segment", icon: Tag },
  { id: "economy", label: "Economy", icon: Tag },
  { id: "new", label: "New Clients (≤1 Visit)", icon: Sparkles },
];

const MarketingPage = () => {
  const { data, isLoading } = useCustomers();

  const customers = Array.isArray(data)
    ? data
    : Array.isArray(data?.customers)
    ? data.customers
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const sendMutation = useSendCampaign();

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  // FILTERS & SEARCH
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    switch (activeFilter) {
      case "premium":
        filtered = filtered.filter((c) => c.category === "premium");
        break;
      case "middle":
        filtered = filtered.filter((c) => c.category === "middle");
        break;
      case "economy":
        filtered = filtered.filter((c) => c.category === "economy");
        break;
      case "new":
        filtered = filtered.filter((c) => (c.visitCount || 0) <= 1);
        break;
      default:
        break;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.phone?.toString().includes(q) ||
          c.email?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [customers, activeFilter, search]);

  // PAGINATION
  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE);
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // SELECT ALL ON CURRENT PAGE
  const allCurrentPageSelected =
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) => selectedCustomers.includes(c._id));

  const toggleSelectAllCurrentPage = () => {
    if (allCurrentPageSelected) {
      setSelectedCustomers((prev) =>
        prev.filter((id) => !paginatedCustomers.some((c) => c._id === id))
      );
    } else {
      setSelectedCustomers((prev) => [
        ...new Set([...prev, ...paginatedCustomers.map((c) => c._id)]),
      ]);
    }
  };

  // SELECT ALL FILTERED AUDIENCE
  const toggleSelectEntireAudience = () => {
    if (selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((c) => c._id));
    }
  };

  // SINGLE SELECT
  const toggleCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // SEND CAMPAIGN
  const handleSend = () => {
    if (!message.trim()) {
      return toast.warning("Please enter a campaign message or select a quick template!");
    }

    if (selectedCustomers.length === 0) {
      return toast.warning("Please select at least one customer to receive the campaign!");
    }

    sendMutation.mutate(
      {
        message,
        selectedCustomers,
      },
      {
        onSuccess: () => {
          toast.success(`Campaign broadcasted to ${selectedCustomers.length} recipients!`);
          setSelectedCustomers([]);
          setMessage("");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to send campaign");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-4 text-zinc-500">
        <div className="w-12 h-12 border-4 border-[#D68B2A] border-t-transparent rounded-full animate-spin" />
        <span className="font-semibold tracking-wide text-sm text-[#292B2B]">
          Loading Astha Marketing Audience...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 text-zinc-800 dm">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[#D68B2A] uppercase tracking-[3px] text-xs mb-3 font-semibold">
              Marketing Suite
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-[#D68B2A] tracking-wide">
              Broadcast Campaigns
            </h1>
            <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-xl">
              Engage your salon clients with targeted promotional broadcasts and personalized rewards.
            </p>
          </div>

          {/* AUDIENCE SUMMARY PILLS */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
              <Users size={18} className="text-[#D68B2A]" />
              <div className="text-xs">
                <span className="text-gray-400 font-medium uppercase mr-1">Audience:</span>
                <span className="font-bold font-mono text-gray-900 text-sm">{filteredCustomers.length}</span>
              </div>
            </div>

            <div className="bg-[#D68B2A]/10 border border-[#D68B2A]/30 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#D68B2A]" />
              <div className="text-xs">
                <span className="text-[#D68B2A] font-medium uppercase mr-1">Selected:</span>
                <span className="font-bold font-mono text-[#D68B2A] text-sm">{selectedCustomers.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPOSER & TEMPLATES SECTION */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#292B2B] text-[#D68B2A] flex items-center justify-center shadow-md">
                <MessageSquare size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Message Composer
                </h2>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Write your customized copy or choose a proven high-conversion salon template
                </p>
              </div>
            </div>

            {message && (
              <button
                type="button"
                onClick={() => setMessage("")}
                className="text-xs font-semibold text-zinc-400 hover:text-red-500 transition flex items-center gap-1 self-start sm:self-center"
              >
                <RefreshCw size={13} /> Clear Copy
              </button>
            )}
          </div>

          {/* QUICK TEMPLATES CAROUSEL/GRID */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Zap size={14} className="text-[#D68B2A]" /> Quick Proven Templates (Click to apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMessage(tmpl.content);
                    toast.info(`Applied template: ${tmpl.title}`);
                  }}
                  className="text-left bg-[#faf9f5] border border-zinc-200/80 hover:border-[#D68B2A] p-3.5 rounded-2xl transition group flex flex-col justify-between gap-2 shadow-xs hover:shadow-md"
                >
                  <span className="font-bold text-xs text-zinc-800 group-hover:text-[#D68B2A] transition">
                    {tmpl.title}
                  </span>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 italic">
                    "{tmpl.content}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* TEXTAREA & ESTIMATOR */}
          <div className="relative">
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your marketing announcement or festive offer here..."
              className="w-full rounded-2xl border border-zinc-300 bg-[#faf9f5]/60 p-5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#D68B2A] focus:ring-4 focus:ring-amber-500/10 text-sm md:text-base leading-relaxed transition resize-none font-sans"
            />
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-500 px-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium text-zinc-600">
                  <Smartphone size={14} className="text-[#D68B2A]" /> SMS/WhatsApp Segment:{" "}
                  <strong className="text-zinc-800 font-mono">
                    {Math.max(1, Math.ceil(message.length / 160))}
                  </strong>
                </span>
                <span className="hidden sm:inline-block text-zinc-300">|</span>
                <span className="text-zinc-500">
                  Est. Delivery: <strong className="text-emerald-600">Instant</strong>
                </span>
              </div>
              <div className="font-mono font-semibold text-zinc-600 self-end sm:self-auto">
                {message.length} <span className="text-zinc-400 font-normal">characters</span>
              </div>
            </div>
          </div>
        </div>

        {/* AUDIENCE SEGMENTATION & SEARCH BAR */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-lg space-y-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            {/* SEGMENT TABS */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1">
                <Filter size={13} /> Segments:
              </span>
              {filters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.id);
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#292B2B] text-yellow-400 shadow-md ring-2 ring-[#D68B2A]/30"
                        : "bg-[#faf9f5] text-zinc-600 border border-zinc-200/80 hover:border-amber-500/40 hover:bg-white"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-[#D68B2A]" : "text-zinc-400"} />
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* SEARCH BOX */}
            <div className="relative w-full xl:w-72">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, phone..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-[#faf9f5]/80 text-sm focus:outline-none focus:border-[#D68B2A] transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* BULK SELECT BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700 hover:text-zinc-900 transition">
                <input
                  type="checkbox"
                  checked={allCurrentPageSelected}
                  onChange={toggleSelectAllCurrentPage}
                  className="w-4 h-4 rounded text-[#D68B2A] focus:ring-[#D68B2A] accent-[#D68B2A]"
                />
                <span>Select Page ({paginatedCustomers.length})</span>
              </label>

              <button
                type="button"
                onClick={toggleSelectEntireAudience}
                className="text-xs font-bold text-[#D68B2A] hover:underline flex items-center gap-1"
              >
                {selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0
                  ? "Deselect Entire Audience"
                  : `Select All Filtered Audience (${filteredCustomers.length})`}
              </button>
            </div>

            <div className="text-xs font-semibold text-zinc-500">
              Showing <span className="text-zinc-900 font-bold">{paginatedCustomers.length}</span> of{" "}
              <span className="text-zinc-900 font-bold">{filteredCustomers.length}</span> candidates
            </div>
          </div>
        </div>

        {/* CUSTOMERS GRID */}
        {filteredCustomers.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-[#D68B2A] flex items-center justify-center mx-auto">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-800">No Customers Found</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              No clients match your selected segment "{activeFilter}" or search query "{search}". Try clearing filters or adding new salon clients.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedCustomers.map((customer) => {
              const isSelected = selectedCustomers.includes(customer._id);
              const category = customer.category || "regular";
              const isVIP = category === "premium";

              return (
                <div
                  key={customer._id}
                  onClick={() => toggleCustomer(customer._id)}
                  className={`group relative rounded-3xl border p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#D68B2A] bg-gradient-to-br from-amber-50/70 via-yellow-50/30 to-white shadow-xl -translate-y-1 ring-1 ring-[#D68B2A]/50"
                      : "border-zinc-200/90 bg-white hover:border-[#D68B2A]/40 hover:shadow-xl hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* AVATAR & INFO */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={getAvatarUrl(customer)}
                          alt={customer.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-zinc-200 shadow-sm"
                        />
                        {isVIP && (
                          <span
                            title="VIP Premium Member"
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D68B2A] text-white flex items-center justify-center text-[10px] shadow"
                          >
                            <Award size={11} />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-base text-zinc-900 truncate group-hover:text-[#D68B2A] transition">
                            {customer.name || "Client"}
                          </h3>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">
                          {customer.phone || "No phone"}
                        </p>

                        {/* BADGES */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isVIP
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : category === "middle"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                            }`}
                          >
                            {isVIP ? "VIP Premium" : category}
                          </span>

                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {(customer.visitCount || 0) > 5 ? "Loyal Member" : "New Client"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CHECKBOX / BADGE */}
                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                          isSelected
                            ? "bg-[#D68B2A] text-white shadow-md scale-110"
                            : "border-2 border-zinc-300 group-hover:border-[#D68B2A]"
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200">
            <div className="text-xs text-zinc-500 font-medium">
              Page <strong className="text-zinc-900">{page}</strong> of{" "}
              <strong className="text-zinc-900">{totalPages}</strong> ({filteredCustomers.length} total)
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-zinc-200 font-bold text-xs hover:bg-zinc-100 disabled:opacity-40 transition shadow-xs"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="px-3 py-1.5 font-mono font-bold text-xs bg-[#292B2B] text-yellow-400 rounded-lg">
                {page}
              </span>
              <button
                type="button"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-zinc-200 font-bold text-xs hover:bg-zinc-100 disabled:opacity-40 transition shadow-xs"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STICKY BROADCAST BAR INSIDE CONTENT CONTAINER */}
        <div className="sticky bottom-4 z-30 pt-2">
          <div className="bg-[#292B2B] text-white p-4 md:p-5 rounded-3xl shadow-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D68B2A] to-amber-600 flex items-center justify-center text-white shadow-lg shrink-0">
                <Send size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base md:text-lg text-yellow-400 font-mono">
                    {selectedCustomers.length}
                  </span>
                  <span className="font-bold text-base md:text-lg text-white">
                    {selectedCustomers.length === 1 ? "Recipient Selected" : "Recipients Selected"}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 truncate max-w-md">
                  {message.trim()
                    ? `Ready to broadcast "${message.slice(0, 38)}${message.length > 38 ? "..." : ""}"`
                    : "Type copy or pick a quick template to enable instant broadcast"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {selectedCustomers.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCustomers([])}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
                >
                  Clear ({selectedCustomers.length})
                </button>
              )}
              <button
                type="button"
                onClick={handleSend}
                disabled={sendMutation.isPending || selectedCustomers.length === 0 || !message.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-[#D68B2A] via-amber-600 to-[#b8731e] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl transition transform active:scale-95"
              >
                <Send size={18} />
                {sendMutation.isPending ? "Broadcasting..." : `Send Campaign Now (${selectedCustomers.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;