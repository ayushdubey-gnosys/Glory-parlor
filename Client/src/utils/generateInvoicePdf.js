import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePdf = (invoice) => {
  const doc = new jsPDF();

  // TITLE
  doc.setFontSize(22);
  doc.text("Salon Invoice", 70, 20);

  // CUSTOMER INFO
  doc.setFontSize(12);

  doc.text(`Customer: ${invoice.customer}`, 14, 40);

  doc.text(`Invoice ID: ${invoice._id}`, 14, 48);

  doc.text(
    `Date: ${new Date(
      invoice.createdAt
    ).toLocaleString()}`,
    14,
    56
  );

  // SERVICES
  doc.setFontSize(16);

  doc.text("Services", 14, 75);

  const serviceRows = invoice.services.map(
    (service, index) => [
      index + 1,
      service.service || "N/A",
      `₹${service.price}`,
    ]
  );

  autoTable(doc, {
    startY: 80,
    head: [["#", "Service ID", "Price"]],
    body: serviceRows,
  });

  // PRODUCTS
  const productRows = invoice.products.map(
    (product, index) => [
      index + 1,
      product.product || "N/A",
      product.qty,
      `₹${product.price}`,
      `₹${product.qty * product.price}`,
    ]
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,

    head: [
      [
        "#",
        "Product ID",
        "Qty",
        "Price",
        "Total",
      ],
    ],

    body: productRows,
  });

  // TOTALS
  const finalY = doc.lastAutoTable.finalY + 20;

  doc.setFontSize(14);

  doc.text(
    `Total Amount: ₹${
      invoice.totalAmount || invoice.total || 0
    }`,
    14,
    finalY
  );

  doc.text(
    `Discount: ₹${invoice.discount || 0}`,
    14,
    finalY + 10
  );

  doc.text(
    `Final Amount: ₹${
      invoice.finalAmount ||
      invoice.totalAmount ||
      invoice.total ||
      0
    }`,
    14,
    finalY + 20
  );

  doc.text(
    `Payment Method: ${
      invoice.paymentMethod || "Cash"
    }`,
    14,
    finalY + 30
  );

  // SAVE PDF
  doc.save("invoice.pdf");
};