let app;
let loadError;

function getApp() {
  if (!app && !loadError) {
    try {
      app = require("../server");
    } catch (error) {
      loadError = error;
    }
  }

  if (loadError) {
    throw loadError;
  }

  return app;
}

module.exports = async function handler(req, res) {
  if (req.url && req.url.startsWith("/api/health")) {
    try {
      getApp();
    } catch (error) {
      loadError = error;
    }

    res.statusCode = loadError ? 500 : 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: !loadError,
        runtime: "vercel-node",
        hasMongoUri: Boolean(process.env.MONGO_URI || process.env.MONGODB_URI),
        hasJwtSecret: Boolean(process.env.JWT_SECRET),
        nodeVersion: process.version,
        loadError: loadError ? loadError.message : null,
      })
    );
    return;
  }

  try {
    return getApp()(req, res);
  } catch (error) {
    console.error("Serverless API load error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Erreur serveur au chargement de l'API.",
        error: error.message,
      })
    );
  }
};
