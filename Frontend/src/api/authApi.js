import { get, post } from "./client";

export function login(credentials) {
  return post("/auth/login", credentials);
}

export function register(account) {
  return post("/auth/register", account);
}

export function getCurrentUser() {
  return get("/auth/me");
}
