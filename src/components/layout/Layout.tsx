// components/Layout.tsx
import React from "react";
import Toolbar from "./Toolbar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Toolbar />
      <div className="h-[clamp(2.5rem,4vw,4rem)]"/>
      <div className="min-h-screen flex flex-col">
        <main className="p-4 flex-grow" >{children}</main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
