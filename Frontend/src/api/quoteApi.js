import { get, post } from "./client";

export function createQuote(payload) {
  return post("/quotes", payload);
}

export function getQuotes() {
  return get("/quotes");
}
