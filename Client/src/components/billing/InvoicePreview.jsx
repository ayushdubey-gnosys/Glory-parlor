// InvoicePreview.jsx

import React, { useRef } from "react";

// IMPORTANT
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";

import {
  Download,
  User,
  Calendar,
  CreditCard,
  Phone,
} from "lucide-react";

const InvoicePreview = ({
  invoice,
}) => {
  const invoiceRef =
    useRef();

  // DOWNLOAD PDF

  const downloadPDF =
    async () => {
      try {
        const element =
          invoiceRef.current;

        if (!element)
          return;

        // HIGH QUALITY CANVAS

        const canvas =
          await html2canvas(
            element,
            {
              scale: 3,

              useCORS: true,

              backgroundColor:
                "#ffffff",

              logging: false,
            }
          );

        const imgData =
          canvas.toDataURL(
            "image/png"
          );

        // PDF

        const pdf =
          new jsPDF(
            "p",
            "mm",
            "a4"
          );

        const pdfWidth =
          210;

        const pdfHeight =
          295;

        const imgWidth =
          pdfWidth;

        const imgHeight =
          (canvas.height *
            imgWidth) /
          canvas.width;

        let heightLeft =
          imgHeight;

        let position = 0;

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -=
          pdfHeight;

        // MULTIPLE PAGES

        while (
          heightLeft > 0
        ) {
          position =
            heightLeft -
            imgHeight;

          pdf.addPage();

          pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight
          );

          heightLeft -=
            pdfHeight;
        }

        // FILE NAME

        const customerName =
          invoice?.customer
            ?.name ||
          "customer";

        pdf.save(
          `${customerName}-invoice.pdf`
        );
      } catch (err) {
        console.error(
          "PDF ERROR:",
          err
        );
      }
    };

  // TOTALS

  const serviceTotal =
    invoice?.services?.reduce(
      (acc, item) =>
        acc +
        Number(
          item.price
        ),
      0
    ) || 0;

  const productTotal =
    invoice?.products?.reduce(
      (acc, item) =>
        acc +
        Number(
          item.price
        ) *
          Number(
            item.qty
          ),
      0
    ) || 0;

  return (
    <div className="mt-10">
      {/* PDF AREA */}

      <div
        ref={invoiceRef}
        className="
          bg-white
          text-black
          rounded-[40px]
          p-10
          shadow-2xl
          border
          border-zinc-200
          overflow-hidden
          max-w-[850px]
          mx-auto
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-zinc-200 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Astha  PMS
            </h1>

            <p className="text-zinc-500 mt-3 uppercase tracking-[4px] text-sm">
              Luxury Salon
              Software
            </p>
          </div>

          <div className="text-right">
            <div className="bg-black text-white px-6 py-3 rounded-2xl inline-block">
              <h2 className="text-2xl font-bold">
                Invoice
              </h2>
            </div>

            <p className="text-zinc-500 mt-3">
              #
              {invoice?._id?.slice(
                -6
              ) ||
                "000001"}
            </p>
          </div>
        </div>

        {/* CUSTOMER + SUMMARY */}

        <div className="grid grid-cols-2 gap-8 mt-10">
          {/* CUSTOMER */}

          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-6">
              Customer Details
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="bg-black text-white p-3 rounded-2xl">
                  <User
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Customer
                  </p>

                  <p className="font-bold text-lg">
                    {invoice
                      ?.customer
                      ?.name ||
                      "Customer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-emerald-500 text-white p-3 rounded-2xl">
                  <Phone
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {invoice
                      ?.customer
                      ?.phone ||
                      "No phone"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-2xl">
                  <Calendar
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Date
                  </p>

                  <p className="font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-500 text-white p-3 rounded-2xl">
                  <CreditCard
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Payment
                  </p>

                  <p className="font-semibold">
                    {
                      invoice?.paymentMethod
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}

          <div className="bg-black text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-8">
              Payment Summary
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between text-zinc-300">
                <span>
                  Services
                </span>

                <span>
                  ₹
                  {
                    serviceTotal
                  }
                </span>
              </div>

              <div className="flex justify-between text-zinc-300">
                <span>
                  Products
                </span>

                <span>
                  ₹
                  {
                    productTotal
                  }
                </span>
              </div>

              <div className="flex justify-between text-zinc-300">
                <span>
                  Discount
                </span>

                <span>
                  ₹
                  {invoice?.discount ||
                    0}
                </span>
              </div>

              <div className="border-t border-zinc-700 pt-5 flex justify-between text-4xl font-black">
                <span>
                  Total
                </span>

                <span>
                  ₹
                  {invoice?.finalAmount ||
                    0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}

        {invoice
          ?.services
          ?.length >
          0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-black mb-6">
              Services
            </h3>

            <div className="overflow-hidden rounded-3xl border border-zinc-200">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left p-5">
                      Service
                    </th>

                    <th className="text-right p-5">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoice.services.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={
                          index
                        }
                        className="border-t hover:bg-zinc-50"
                      >
                        <td className="p-5 font-medium">
                          {item
                            ?.service
                            ?.name ||
                            "Service"}
                        </td>

                        <td className="p-5 text-right font-bold">
                          ₹
                          {
                            item.price
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS */}

        {invoice
          ?.products
          ?.length >
          0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-black mb-6">
              Products
            </h3>

            <div className="overflow-hidden rounded-3xl border border-zinc-200">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left p-5">
                      Product
                    </th>

                    <th className="text-center p-5">
                      Qty
                    </th>

                    <th className="text-right p-5">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoice.products.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={
                          index
                        }
                        className="border-t hover:bg-zinc-50"
                      >
                        <td className="p-5 font-medium">
                          {item
                            ?.product
                            ?.name ||
                            "Product"}
                        </td>

                        <td className="p-5 text-center">
                          {
                            item.qty
                          }
                        </td>

                        <td className="p-5 text-right font-bold">
                          ₹
                          {Number(
                            item.price
                          ) *
                            Number(
                              item.qty
                            )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FOOTER */}

        <div className="mt-16 pt-8 border-t border-zinc-200 text-center">
          <div className="w-24 h-1 bg-black mx-auto rounded-full mb-5"></div>

          <p className="text-zinc-500 text-sm">
            Thank you for
            visiting
          </p>

          <h3 className="text-3xl font-black mt-3">
            Astha  PMS
          </h3>

          <p className="text-zinc-400 mt-2 text-sm">
            Luxury Salon
            Experience
          </p>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}

      <button
        onClick={
          downloadPDF
        }
        className="
          mt-8
          flex
          items-center
          gap-3
          bg-black
          hover:bg-zinc-800
          text-white
          px-8
          py-5
          rounded-2xl
          font-bold
          text-lg
          transition
          mx-auto
          shadow-xl
        "
      >
        <Download
          size={22}
        />

        Download PDF
      </button>
    </div>
  );
};

export default InvoicePreview;