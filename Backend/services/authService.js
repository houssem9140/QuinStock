const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { createToken } = require("../utils/jwt");
const sanitizeUser = require("../utils/sanitizeUser");

function buildAuthResponse(user) {
  return {
    token: createToken(user),
    user: sanitizeUser(user),
  };
}

function resolveRole(role, adminCode) {
  const canCreateAdmin =
    role === "admin" &&
    process.env.ADMIN_REGISTRATION_CODE &&
    adminCode === process.env.ADMIN_REGISTRATION_CODE;

  return canCreateAdmin ? "admin" : "client";
}

async function registerUser(payload) {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    imageUrl,
    companyName,
    taxId,
    address,
    role,
    adminCode,
  } = payload;

  if (!firstName || !lastName || !email || !password) {
    const error = new Error("First name, last name, email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    const error = new Error("An account already exists with this email");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password: hashedPassword,
    phoneNumber,
    imageUrl,
    companyName,
    taxId,
    address,
    role: resolveRole(role, adminCode),
  });

  return buildAuthResponse(user);
}

async function loginUser(payload) {
  const { email, password } = payload;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return buildAuthResponse(user);
}

async function getCurrentUser(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return sanitizeUser(user);
}

module.exports = { registerUser, loginUser, getCurrentUser };
