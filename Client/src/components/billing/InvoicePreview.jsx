import React, { useRef } from "react";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

const InvoicePreview = ({
  invoice,
}) => {
  const pdfRef = useRef();

  const downloadPdf = async () => {
    const element = pdfRef.current;

    const canvas =
      await html2canvas(element);

    const data =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    const imgProperties =
      pdf.getImageProperties(data);

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (imgProperties.height *
        pdfWidth) /
      imgProperties.width;

    pdf.addImage(
      data,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("invoice.pdf");
  };

  return (
    <div className="mt-10">
      <div
        ref={pdfRef}
        className="border p-5 bg-white"
      >
        <h1 className="text-2xl font-bold mb-4">
          Salon Invoice
        </h1>

        <p>
          Customer: {invoice.customer?.name || invoice.customer || "-"}
          {invoice.customer?.phone && (
            <span> — {invoice.customer.phone}</span>
          )}
        </p>

        <p>
          Payment:
          {invoice.paymentMethod}
        </p>

        <hr className="my-3" />

        <h2 className="font-bold">
          Services
        </h2>

        {invoice.services?.map((s, i) => (
          <div key={i} className="flex justify-between">
            <div>{s.name || s.service || "Service"}</div>
            <div>₹{s.price}</div>
          </div>
        ))}

        <h2 className="font-bold mt-4">
          Products
        </h2>

        {invoice.products?.map((p, i) => (
          <div key={i} className="flex justify-between">
            <div>{p.name || p.product || "Product"} × {p.qty}</div>
            <div>₹{p.price * p.qty}</div>
          </div>
        ))}

        <hr className="my-3" />

        <h2 className="text-xl font-bold">
          Total:
          ₹
          {invoice.finalAmount}
        </h2>
      </div>

      <button
        onClick={downloadPdf}
        className="bg-green-600 text-white px-5 py-2 mt-4 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoicePreview;