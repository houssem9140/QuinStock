import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../AuthContext";
import Header from "./Header";

function Layout() {
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.isAdmin;

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className={isAdmin ? "bg-surface-container-lowest" : "bg-surface"}>
        <div className="min-h-[calc(100vh-72px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
