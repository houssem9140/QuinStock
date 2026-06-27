const quoteService = require("../services/quoteService");

function handleError(res, error, fallbackMessage) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(fallbackMessage, error);
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? fallbackMessage : error.message,
  });
}

async function create(req, res) {
  try {
    const quote = await quoteService.createQuote(req.body, req.user);
    return res.status(201).json({ quote });
  } catch (error) {
    return handleError(res, error, "Unable to create quote");
  }
}

async function list(req, res) {
  try {
    const quotes = await quoteService.getUserQuotes(req.user);
    return res.json({ quotes });
  } catch (error) {
    return handleError(res, error, "Unable to fetch quotes");
  }
}

module.exports = { create, list };
