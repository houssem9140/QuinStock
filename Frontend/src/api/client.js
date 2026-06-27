export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:4000/api");

const REQUEST_TIMEOUT_MS = 12000;

async function request(path, options = {}) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Le serveur met trop de temps a repondre. Verifiez le backend ou les variables Vercel.");
    }

    if (error instanceof TypeError) {
      throw new Error("Impossible de joindre le serveur API. Verifiez que le backend est lance.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function post(path, body, options = {}) {
  return request(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function get(path, options = {}) {
  return request(path, {
    ...options,
    method: "GET",
  });
}
