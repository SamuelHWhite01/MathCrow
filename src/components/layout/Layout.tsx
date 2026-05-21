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
      <div className="h-[12vw] md:h-[8vw] lg:h-[4vw]"/>
      <div className="min-h-screen flex flex-col">
        <main className="p-4 flex-grow" >{children}</main>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
