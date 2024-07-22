import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode, useEffect } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  

  const isScreenHeight = true;
  return (
    <div className={`flex flex-col w-screen items-center ${isScreenHeight ? "min-h-screen justify-between" : "h-screen justify-center"}`}>
      <Header isFullWidth={false}></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}
