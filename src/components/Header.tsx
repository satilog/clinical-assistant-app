"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header(props: any) {
  const router: any = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // This state will hold the current path to trigger re-renders
  const [currentPath, setCurrentPath] = useState(router.pathname);

//   useEffect(() => {
//     const handleRouteChange = (url: string) => {
//       setCurrentPath(url);
//     };

//     router.events.on("routeChangeComplete", handleRouteChange);
    
//     // Cleanup event listener on unmount
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.events]);

  const tabs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Patients", href: "/patients" },
  ];

  return (
    <div className="flex w-full items-center justify-around custom-bg-white-color h-20 border-b-[1.5px] custom-border-color">
      <div
        className={`flex w-full px-5 justify-between items-center custom-bg-invert-color`}
      >
        <div
          className="custom-text-color text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
            MIMIC IV APP
        </div>

        {/* Tabs and Sign Up Button Group */}
        <div className="flex items-center gap-4">
          {/* Mobile Dropdown Button */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-md custom-text-color focus:outline-none"
            >
              Menu
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className="custom-text-color text-md cursor-pointer hover:bg-gray-100 px-4 py-2"
                    onClick={() => {
                      router.push(tab.href);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {tab.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs for Larger Screens */}
          <div className="hidden sm:flex flex-row gap-8">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="custom-text-color text-md cursor-pointer hover:text-red-600"
                onClick={() => router.push(tab.href)}
              >
                {tab.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
