const Quote = require("../models/quote");
const { sendQuoteEmail } = require("../utils/email");
const { generateQuotePdf } = require("../utils/quotePdf");

function normalizeItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Quote must contain at least one item");
    error.statusCode = 400;
    throw error;
  }

  return items.map((item) => {
    const product = item.product || item;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(0, Number(product.price || item.unitPrice) || 0);

    if (!product.id && !item.productId) {
      const error = new Error("Each quote item must contain a product id");
      error.statusCode = 400;
      throw error;
    }

    return {
      productId: String(product.id || item.productId),
      name: product.name || item.name || "Produit",
      brand: product.brand || item.brand || "",
      unit: product.unit || item.unit || "",
      categoryId: product.categoryId || item.categoryId || "",
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });
}

function serializeQuote(quote, warning) {
  const quoteObject = quote.toObject ? quote.toObject() : quote;

  return {
    id: quoteObject.quoteNumber,
    quoteNumber: quoteObject.quoteNumber,
    date: quoteObject.createdAt,
    companyName: quoteObject.companyName,
    contactEmail: quoteObject.contactEmail,
    shippingMethod: quoteObject.shippingMethod,
    status: quoteObject.status,
    items: quoteObject.items,
    subtotal: quoteObject.subtotal,
    freightCost: quoteObject.freightCost,
    totalEstimate: quoteObject.totalEstimate,
    emailSentAt: quoteObject.emailSentAt,
    warning,
  };
}

async function createQuote(payload, user) {
  const { companyName, contactEmail, shippingMethod = "standard" } = payload;

  if (!companyName || !contactEmail) {
    const error = new Error("Company name and contact email are required");
    error.statusCode = 400;
    throw error;
  }

  const items = normalizeItems(payload.items);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const freightCost = shippingMethod === "express" ? 45 : 15;
  const totalEstimate = subtotal + freightCost;
  const quoteNumber = `DV-${Date.now().toString().slice(-8)}`;

  const quote = await Quote.create({
    quoteNumber,
    userId: user?.id,
    companyName,
    contactEmail: contactEmail.toLowerCase().trim(),
    shippingMethod,
    items,
    subtotal,
    freightCost,
    totalEstimate,
  });

  const pdfBuffer = await generateQuotePdf(quote);
  let emailResult;

  try {
    emailResult = await sendQuoteEmail({ quote, pdfBuffer });
  } catch (error) {
    console.error("Unable to send quote email", error.message);
    emailResult = { sent: false, reason: "SMTP_SEND_FAILED" };
  }

  if (!emailResult.sent) {
    quote.status = emailResult.reason === "SMTP_NOT_CONFIGURED" ? "email_not_configured" : "email_failed";
    quote.emailError = emailResult.reason;
    await quote.save();
    return serializeQuote(quote, emailResult.reason);
  }

  quote.status = "sent";
  quote.emailSentAt = new Date();
  await quote.save();

  return serializeQuote(quote);
}

async function getUserQuotes(user) {
  const filter = user.role === "admin" ? {} : { userId: user.id };
  const quotes = await Quote.find(filter).sort({ createdAt: -1 }).limit(100);
  return quotes.map((quote) => serializeQuote(quote));
}

module.exports = { createQuote, getUserQuotes };
