const authService = require("../services/authService");

function handleError(res, error, fallbackMessage) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(fallbackMessage, error);
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? fallbackMessage : error.message,
  });
}

async function register(req, res) {
  try {
    const authPayload = await authService.registerUser(req.body);
    return res.status(201).json(authPayload);
  } catch (error) {
    return handleError(res, error, "Unable to register account");
  }
}

async function login(req, res) {
  try {
    const authPayload = await authService.loginUser(req.body);
    return res.json(authPayload);
  } catch (error) {
    return handleError(res, error, "Unable to login");
  }
}

async function me(req, res) {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    return res.json({ user });
  } catch (error) {
    return handleError(res, error, "Unable to fetch current user");
  }
}

module.exports = { register, login, me };
