// components/Layout.tsx
import React from "react";
import Toolbar from "./Toolbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Toolbar />
      <div className="h-[8vh]"/>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
