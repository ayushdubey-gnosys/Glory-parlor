import React, { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
  Download,
  User,
  Calendar,
  CreditCard,
  Phone,
  Sparkles,
  Scissors,
  ShoppingBag,
  Printer,
  CheckCircle,
} from "lucide-react";

const InvoicePreview = ({ invoice }) => {
  const invoiceRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  // DOWNLOAD PDF (High-resolution capture via html2canvas-pro)
  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      const element = invoiceRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 295;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const customerName = invoice?.customer?.name || "Customer";
      const cleanName = customerName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      pdf.save(`astha-pms-invoice-${cleanName}.pdf`);
    } catch (err) {
      console.error("PDF ERROR:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // PRINT INVOICE
  const handlePrint = () => {
    window.print();
  };

  const serviceTotal =
    invoice?.services?.reduce(
      (acc, item) => acc + (Number(item.price) || 0),
      0
    ) || 0;

  const productTotal =
    invoice?.products?.reduce(
      (acc, item) =>
        acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0
    ) || 0;

  return (
    <div className="mt-8 space-y-8">
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* PRINTABLE INVOICE AREA */}
      <div
        ref={invoiceRef}
        id="printable-invoice"
        style={{
          backgroundColor: "#ffffff",
          color: "#27272a",
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
        }}
        className="rounded-[32px] overflow-hidden shadow-2xl border border-zinc-200 p-8 md:p-12 relative"
      >
        {/* TOP LUXURY HEADER BAND */}
        <div
          style={{ backgroundColor: "#292B2B", color: "#ffffff" }}
          className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle gold glow */}
          <div
            style={{
              position: "absolute",
              right: "-50px",
              top: "-50px",
              width: "180px",
              height: "180px",
              background: "rgba(214, 139, 42, 0.15)",
              borderRadius: "9999px",
              filter: "blur(30px)",
            }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div
              style={{
                background: "linear-gradient(180deg, #eab308 0%, #854d0e 100%)",
                width: "52px",
                height: "52px",
                borderRadius: "16px",
              }}
              className="flex items-center justify-center shadow-lg text-white font-bold"
            >
              <Sparkles size={26} />
            </div>
            <div>
              <h1
                style={{ color: "#D68B2A", letterSpacing: "4px" }}
                className="text-2xl md:text-3xl font-light uppercase tracking-widest"
              >
                Astha PMS
              </h1>
              <p
                style={{ color: "#a1a1aa", letterSpacing: "3px" }}
                className="text-[11px] uppercase tracking-wider mt-0.5"
              >
                Luxury Salon Software
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right relative z-10">
            <div
              style={{
                backgroundColor: "rgba(214, 139, 42, 0.15)",
                border: "1px solid rgba(214, 139, 42, 0.4)",
                color: "#D68B2A",
              }}
              className="px-4 py-1.5 rounded-xl inline-block text-xs font-bold uppercase tracking-widest"
            >
              Tax Invoice / Receipt
            </div>
            <p
              style={{ color: "#e4e4e7" }}
              className="text-base font-bold font-mono mt-2.5"
            >
              #{invoice?._id?.slice(-8)?.toUpperCase() || "INV-000001"}
            </p>
            <p style={{ color: "#a1a1aa" }} className="text-xs mt-0.5">
              Date:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* CUSTOMER AND SALON META SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* BILLED TO */}
          <div
            style={{ backgroundColor: "#faf9f5", borderColor: "#e4e4e7" }}
            className="border rounded-2xl p-5"
          >
            <p
              style={{ color: "#D68B2A" }}
              className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
            >
              <User size={14} /> Billed To (Customer)
            </p>
            <h3 style={{ color: "#18181b" }} className="text-lg font-bold">
              {invoice?.customer?.name || "Valued Customer"}
            </h3>
            <p
              style={{ color: "#52525b" }}
              className="text-sm mt-1 flex items-center gap-2"
            >
              <Phone size={14} style={{ color: "#D68B2A" }} />
              {invoice?.customer?.phone || "N/A"}
            </p>
            {invoice?.customer?.email && (
              <p style={{ color: "#71717a" }} className="text-xs mt-1">
                {invoice.customer.email}
              </p>
            )}
            {invoice?.customer?.address && (
              <p style={{ color: "#71717a" }} className="text-xs mt-1">
                {invoice.customer.address}
              </p>
            )}
          </div>

          {/* PAYMENT DETAILS */}
          <div
            style={{ backgroundColor: "#faf9f5", borderColor: "#e4e4e7" }}
            className="border rounded-2xl p-5"
          >
            <p
              style={{ color: "#D68B2A" }}
              className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
            >
              <CreditCard size={14} /> Payment & Status
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span style={{ color: "#71717a" }}>Payment Method:</span>
                <span
                  style={{ backgroundColor: "#292B2B", color: "#ffffff" }}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                >
                  {invoice?.paymentMethod || "Cash"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "#71717a" }}>Payment Status:</span>
                <span
                  style={{
                    backgroundColor: "#ecfdf5",
                    color: "#047857",
                    borderColor: "#a7f3d0",
                  }}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-bold border"
                >
                  PAID
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "#71717a" }}>Generated On:</span>
                <span
                  style={{ color: "#27272a" }}
                  className="font-medium text-xs"
                >
                  {new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES TABLE */}
        {invoice?.services?.length > 0 && (
          <div className="mt-8">
            <h3
              style={{ color: "#18181b" }}
              className="text-base font-bold mb-3 flex items-center gap-2"
            >
              <Scissors size={16} style={{ color: "#D68B2A" }} /> Salon Services
              Rendered
            </h3>
            <div
              style={{ borderColor: "#e4e4e7" }}
              className="overflow-hidden rounded-2xl border"
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#292B2B", color: "#D68B2A" }}>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider w-12">
                      #
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.services.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#faf9f5",
                        borderTop: "1px solid #f4f4f5",
                      }}
                    >
                      <td
                        style={{ color: "#71717a" }}
                        className="py-3.5 px-4 font-mono text-xs"
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{ color: "#18181b" }}
                        className="py-3.5 px-4 font-medium"
                      >
                        {item?.service?.name || "Salon Treatment"}
                      </td>
                      <td
                        style={{ color: "#18181b" }}
                        className="py-3.5 px-4 font-bold text-right font-mono"
                      >
                        ₹{(Number(item.price) || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TABLE */}
        {invoice?.products?.length > 0 && (
          <div className="mt-8">
            <h3
              style={{ color: "#18181b" }}
              className="text-base font-bold mb-3 flex items-center gap-2"
            >
              <ShoppingBag size={16} style={{ color: "#D68B2A" }} /> Retail
              Boutique Products
            </h3>
            <div
              style={{ borderColor: "#e4e4e7" }}
              className="overflow-hidden rounded-2xl border"
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#292B2B", color: "#D68B2A" }}>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider w-12">
                      #
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider text-center">
                      Qty
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider text-right">
                      Unit Price
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.products.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#faf9f5",
                        borderTop: "1px solid #f4f4f5",
                      }}
                    >
                      <td
                        style={{ color: "#71717a" }}
                        className="py-3.5 px-4 font-mono text-xs"
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{ color: "#18181b" }}
                        className="py-3.5 px-4 font-medium"
                      >
                        {item?.product?.name || "Retail Product"}
                      </td>
                      <td
                        style={{ color: "#3f3f46" }}
                        className="py-3.5 px-4 text-center font-bold font-mono"
                      >
                        {item.qty}
                      </td>
                      <td
                        style={{ color: "#71717a" }}
                        className="py-3.5 px-4 text-right font-mono"
                      >
                        ₹{(Number(item.price) || 0).toLocaleString()}
                      </td>
                      <td
                        style={{ color: "#18181b" }}
                        className="py-3.5 px-4 font-bold text-right font-mono"
                      >
                        ₹{(
                          (Number(item.price) || 0) * (Number(item.qty) || 0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUMMARY CALCULATION SECTION */}
        <div className="mt-8 flex justify-end">
          <div
            style={{ backgroundColor: "#faf9f5", borderColor: "#e4e4e7" }}
            className="w-full sm:w-80 border rounded-2xl p-6 space-y-3"
          >
            <div
              className="flex justify-between text-sm"
              style={{ color: "#52525b" }}
            >
              <span>Services Subtotal:</span>
              <span
                className="font-mono font-medium"
                style={{ color: "#18181b" }}
              >
                ₹{serviceTotal.toLocaleString()}
              </span>
            </div>
            <div
              className="flex justify-between text-sm"
              style={{ color: "#52525b" }}
            >
              <span>Products Subtotal:</span>
              <span
                className="font-mono font-medium"
                style={{ color: "#18181b" }}
              >
                ₹{productTotal.toLocaleString()}
              </span>
            </div>
            <div
              className="flex justify-between text-sm"
              style={{ color: "#059669" }}
            >
              <span>
                Discount Applied
                {Number(invoice?.discountPercent) > 0
                  ? ` (${invoice.discountPercent}%)`
                  : ""}
                :
              </span>
              <span className="font-mono font-medium">
                - ₹{(Number(invoice?.discount) || 0).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div
              style={{ borderTopColor: "#d4d4d8" }}
              className="border-t pt-3 flex justify-between items-baseline"
            >
              <span
                style={{ color: "#18181b" }}
                className="font-bold uppercase tracking-wider text-sm"
              >
                Total Payable
              </span>
              <span
                style={{ color: "#D68B2A" }}
                className="text-2xl font-black font-mono"
              >
                ₹{(
                  invoice?.finalAmount ??
                  invoice?.totalAmount ??
                  serviceTotal +
                    productTotal -
                    (Number(invoice?.discount) || 0)
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* LUXURY FOOTER & SIGNATURE */}
        <div
          style={{ borderTopColor: "#f4f4f5" }}
          className="mt-12 pt-8 border-t text-center space-y-3"
        >
          <div
            style={{
              background: "linear-gradient(90deg, #eab308 0%, #d97706 100%)",
              width: "48px",
              height: "4px",
              margin: "0 auto",
              borderRadius: "9999px",
            }}
          />
          <h4
            style={{ color: "#18181b" }}
            className="text-lg font-bold tracking-wide"
          >
            Astha PMS — Luxury Salon & Spa
          </h4>
          <p
            style={{ color: "#71717a" }}
            className="text-xs italic font-light"
          >
            Thank you for choosing us! Where luxury meets beauty and perfection.
          </p>
          <p
            style={{ color: "#a1a1aa" }}
            className="text-[10px] uppercase tracking-widest mt-2"
          >
            Terms: All services & retail sales are final. Please retain invoice
            for records.
          </p>
        </div>
      </div>

      {/* FLOATING ACTION BAR FOR DOWNLOAD / PRINT (HIDDEN IN PRINT) */}
      <div className="no-print max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#292B2B] p-6 rounded-3xl shadow-xl border border-white/10">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-[#D68B2A]/20 text-[#D68B2A] flex items-center justify-center font-bold">
            <CheckCircle size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Invoice Ready</h4>
            <p className="text-xs text-zinc-400">
              High-resolution PDF export or direct printer output
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
          >
            <Printer size={18} />
            Print Receipt
          </button>

          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold px-6 py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Download size={18} />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;