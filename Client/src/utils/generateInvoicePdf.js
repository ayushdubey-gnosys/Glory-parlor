import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePdf = (invoice) => {
  const doc = new jsPDF();

  // Color palette definitions
  const primaryDark = [41, 43, 43];     // #292B2B
  const luxuryGold = [214, 139, 42];    // #D68B2A
  const textDark = [24, 24, 27];        // #18181b
  const textMuted = [113, 113, 122];    // #71717a
  const bgLight = [250, 249, 245];      // #faf9f5

  // TOP HEADER BANNER
  doc.setFillColor(...primaryDark);
  doc.rect(0, 0, 210, 42, "F");

  // Logo text & Title
  doc.setTextColor(...luxuryGold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ASTHA PMS", 14, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("LUXURY SALON SOFTWARE", 14, 26);

  // Right Side Header Info
  doc.setTextColor(...luxuryGold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TAX INVOICE / RECEIPT", 196, 18, { align: "right" });

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const invId = invoice?._id ? invoice._id.slice(-8).toUpperCase() : "INV-000001";
  doc.text(`#${invId}`, 196, 26, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const dateStr = invoice?.createdAt
    ? new Date(invoice.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  doc.text(`Date: ${dateStr}`, 196, 33, { align: "right" });

  // CUSTOMER INFORMATION BLOCK
  let currentY = 54;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(14, currentY - 6, 88, 36, 3, 3, "FD");

  doc.setTextColor(...luxuryGold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("BILLED TO (CUSTOMER)", 18, currentY + 1);

  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const custName = typeof invoice?.customer === "object" ? invoice.customer?.name : (invoice?.customer || "Valued Customer");
  doc.text(custName || "Valued Customer", 18, currentY + 9);

  doc.setTextColor(...textMuted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const custPhone = typeof invoice?.customer === "object" ? invoice.customer?.phone : "N/A";
  doc.text(`Phone: ${custPhone || "N/A"}`, 18, currentY + 16);
  if (typeof invoice?.customer === "object" && invoice?.customer?.email) {
    doc.text(invoice.customer.email, 18, currentY + 22);
  }

  // PAYMENT & STATUS BLOCK
  doc.setFillColor(...bgLight);
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(108, currentY - 6, 88, 36, 3, 3, "FD");

  doc.setTextColor(...luxuryGold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("PAYMENT DETAILS", 112, currentY + 1);

  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`Method: ${invoice?.paymentMethod || "Cash"}`, 112, currentY + 9);

  doc.setTextColor(4, 120, 87); // Emerald green
  doc.setFont("helvetica", "bold");
  doc.text("Status: PAID", 112, currentY + 16);

  currentY += 42;

  // SERVICES TABLE
  if (invoice?.services && invoice.services.length > 0) {
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Salon Services Rendered", 14, currentY);

    const serviceRows = invoice.services.map((item, index) => [
      index + 1,
      item?.service?.name || item?.service || "Salon Treatment",
      `INR ${(Number(item.price) || 0).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: currentY + 3,
      head: [["#", "Service Name", "Amount (INR)"]],
      body: serviceRows,
      theme: "grid",
      headStyles: {
        fillColor: primaryDark,
        textColor: luxuryGold,
        fontStyle: "bold",
        fontSize: 9,
      },
      styles: {
        fontSize: 9,
        textColor: textDark,
        cellPadding: 4,
      },
      alternateRowStyles: {
        fillColor: bgLight,
      },
      columnStyles: {
        0: { cellWidth: 15 },
        2: { halign: "right", fontStyle: "bold" },
      },
    });

    currentY = doc.lastAutoTable.finalY + 12;
  }

  // PRODUCTS TABLE
  if (invoice?.products && invoice.products.length > 0) {
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Retail Boutique Products", 14, currentY);

    const productRows = invoice.products.map((item, index) => [
      index + 1,
      item?.product?.name || item?.product || "Retail Product",
      item.qty || 1,
      `INR ${(Number(item.price) || 0).toLocaleString()}`,
      `INR ${((Number(item.price) || 0) * (Number(item.qty) || 0)).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: currentY + 3,
      head: [["#", "Product Name", "Qty", "Unit Price", "Total (INR)"]],
      body: productRows,
      theme: "grid",
      headStyles: {
        fillColor: primaryDark,
        textColor: luxuryGold,
        fontStyle: "bold",
        fontSize: 9,
      },
      styles: {
        fontSize: 9,
        textColor: textDark,
        cellPadding: 4,
      },
      alternateRowStyles: {
        fillColor: bgLight,
      },
      columnStyles: {
        0: { cellWidth: 12 },
        2: { halign: "center" },
        3: { halign: "right" },
        4: { halign: "right", fontStyle: "bold" },
      },
    });

    currentY = doc.lastAutoTable.finalY + 12;
  }

  // TOTALS SUMMARY BOX
  const serviceTotal = invoice?.services?.reduce((acc, item) => acc + (Number(item.price) || 0), 0) || 0;
  const productTotal = invoice?.products?.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 0), 0) || 0;
  const discount = Number(invoice?.discount) || 0;
  const grandTotal = invoice?.finalAmount ?? invoice?.totalAmount ?? (serviceTotal + productTotal - discount);

  // Box on right side
  doc.setFillColor(...bgLight);
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(110, currentY, 86, 42, 3, 3, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("Services Subtotal:", 116, currentY + 8);
  doc.setTextColor(...textDark);
  doc.text(`INR ${serviceTotal.toLocaleString()}`, 190, currentY + 8, { align: "right" });

  doc.setTextColor(...textMuted);
  doc.text("Products Subtotal:", 116, currentY + 15);
  doc.setTextColor(...textDark);
  doc.text(`INR ${productTotal.toLocaleString()}`, 190, currentY + 15, { align: "right" });

  doc.setTextColor(5, 150, 105);
  const discountLabel =
    Number(invoice?.discountPercent) > 0
      ? `Discount Applied (${invoice.discountPercent}%):`
      : "Discount Applied:";
  doc.text(discountLabel, 116, currentY + 22);
  doc.text(`- INR ${discount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 190, currentY + 22, { align: "right" });

  doc.setDrawColor(212, 212, 216);
  doc.line(116, currentY + 26, 190, currentY + 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text("TOTAL PAYABLE:", 116, currentY + 34);
  doc.setTextColor(...luxuryGold);
  doc.setFontSize(13);
  doc.text(`INR ${grandTotal.toLocaleString()}`, 190, currentY + 34, { align: "right" });

  currentY += 55;

  // FOOTER & SIGNATURE
  if (currentY > 260) {
    doc.addPage();
    currentY = 30;
  }

  doc.setDrawColor(...luxuryGold);
  doc.setLineWidth(0.8);
  doc.line(75, currentY, 135, currentY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text("Astha PMS — Luxury Salon & Spa", 105, currentY + 8, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("Thank you for choosing us! Where luxury meets beauty and perfection.", 105, currentY + 14, { align: "center" });

  // SAVE PDF
  const safeName = typeof custName === "string" ? custName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() : "customer";
  doc.save(`astha-pms-invoice-${safeName}.pdf`);
};