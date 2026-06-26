import { createContext } from "react";

const AuthContext = createContext({
  auth: null,
  user: null,
  currentUser: null,
  token: null,
  signin: () => {},
  signout: () => {},
  isAdmin: false,
  isClient: false,
});

export default AuthContext;
