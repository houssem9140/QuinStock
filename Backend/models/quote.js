const mongoose = require("mongoose");

const QuoteItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, default: "" },
    unit: { type: String, default: "" },
    categoryId: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const QuoteSchema = new mongoose.Schema(
  {
    quoteNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", index: true },
    companyName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    shippingMethod: { type: String, enum: ["standard", "express"], default: "standard" },
    status: {
      type: String,
      enum: ["pending", "sent", "email_not_configured", "email_failed"],
      default: "pending",
    },
    items: { type: [QuoteItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    freightCost: { type: Number, required: true, min: 0 },
    totalEstimate: { type: Number, required: true, min: 0 },
    emailSentAt: { type: Date },
    emailError: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("quotes", QuoteSchema);
