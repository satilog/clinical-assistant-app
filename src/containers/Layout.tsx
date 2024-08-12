import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  isScreenHeight?: boolean;
  fullWidth?: boolean;
  headerFixed?: boolean;
  onlyLogo?: boolean;
}

export default function Layout({ children, isScreenHeight = true, fullWidth = true, headerFixed = true, onlyLogo = false }: LayoutProps) {

  return (
    <div className={`flex flex-col ${isScreenHeight ? "min-h-screen justify-start" : "h-screen justify-center"}`}>
      <Header fullWidth={fullWidth} fixed={headerFixed} onlyLogo={onlyLogo}/>
      <div className={`flex-grow flex flex-col ${headerFixed ? "": ""} ${fullWidth ? "w-full": "container"}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
