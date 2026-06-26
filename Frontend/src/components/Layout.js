import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../AuthContext";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  const authContext = useContext(AuthContext);
  const isClient = !authContext.isAdmin;

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className={isClient ? "bg-surface" : "bg-surface-container-lowest"}>
        <div className="grid min-h-[calc(100vh-72px)] grid-cols-12">
          <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] lg:col-span-2 lg:flex">
            <SideMenu />
          </aside>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
