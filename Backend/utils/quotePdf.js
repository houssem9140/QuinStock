const PDFDocument = require("pdfkit");

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function generateQuotePdf(quote) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 48 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc
      .fontSize(26)
      .fillColor("#1C1C1E")
      .text("QUINSTOCK", { continued: true })
      .fillColor("#D4820A")
      .text("  DEVIS");

    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .fillColor("#555555")
      .text("Quincaillerie professionnelle - devis et livraison rapide en Tunisie");

    doc.moveDown(1.5);
    doc.fontSize(12).fillColor("#1C1C1E").text(`Reference: ${quote.quoteNumber}`);
    doc.text(`Date: ${new Date(quote.createdAt || Date.now()).toLocaleDateString("fr-FR")}`);
    doc.text(`Client: ${quote.companyName}`);
    doc.text(`Email: ${quote.contactEmail}`);
    doc.text(`Livraison: ${quote.shippingMethod === "express" ? "Express 24h/48h" : "Standard 3 a 5 jours"}`);

    doc.moveDown(1.5);
    const tableTop = doc.y;
    const columns = {
      product: 48,
      brand: 255,
      quantity: 345,
      price: 410,
      total: 492,
    };

    doc
      .fontSize(9)
      .fillColor("#D4820A")
      .text("Produit", columns.product, tableTop)
      .text("Marque", columns.brand, tableTop)
      .text("Qté", columns.quantity, tableTop)
      .text("PU", columns.price, tableTop)
      .text("Total", columns.total, tableTop);

    doc.moveTo(48, tableTop + 16).lineTo(545, tableTop + 16).strokeColor("#D4820A").stroke();

    let y = tableTop + 28;
    quote.items.forEach((item) => {
      if (y > 720) {
        doc.addPage();
        y = 48;
      }

      doc
        .fontSize(9)
        .fillColor("#1C1C1E")
        .text(item.name, columns.product, y, { width: 195 })
        .text(item.brand || "-", columns.brand, y, { width: 80 })
        .text(String(item.quantity), columns.quantity, y)
        .text(formatPrice(item.unitPrice), columns.price, y, { width: 70 })
        .text(formatPrice(item.lineTotal), columns.total, y, { width: 60 });

      y += 32;
    });

    doc.moveDown(2);
    const totalsY = Math.max(y + 16, 560);
    doc
      .fontSize(11)
      .fillColor("#1C1C1E")
      .text(`Sous-total HT: ${formatPrice(quote.subtotal)}`, 360, totalsY)
      .text(`Transport estime: ${formatPrice(quote.freightCost)}`, 360, totalsY + 20)
      .fontSize(14)
      .fillColor("#D4820A")
      .text(`Total estime: ${formatPrice(quote.totalEstimate)}`, 360, totalsY + 46);

    doc
      .fontSize(8)
      .fillColor("#777777")
      .text(
        "Ce document est une estimation. Les prix, disponibilites et delais seront confirmes par l'equipe QuinStock.",
        48,
        760,
        { align: "center" }
      );

    doc.end();
  });
}

module.exports = { generateQuotePdf };
