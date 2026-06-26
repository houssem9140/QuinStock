const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName : { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, trim: true },
    imageUrl: { type: String, default: "" },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    companyName: { type: String, trim: true, default: "" },
    taxId: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
}, {
    timestamps: true,
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
