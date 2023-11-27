import React from "react";
import Header from "@/components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full text-center flex flex-col items-center h-screen">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
