"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  fullWidth?: boolean;
  fixed?: boolean;
  onlyLogo?: boolean;
}

export default function Header({
  fullWidth = true,
  fixed = false,
  onlyLogo = false,
}: HeaderProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Dashboard", href: "/dashboard", type: "link" },
    { name: "Patients", href: "/patients", type: "link" },
  ];

  return (
    <>
      <div
        className={`bg-white text-black w-full h-16 border-b-2 border-gray-200 z-30`}
      >
        <div
          className={`${
            fullWidth ? "w-screen" : "container"
          } ${
            onlyLogo ? "justify-center" : "justify-between"
          } items-center h-full px-10 flex`}
        >
          {onlyLogo ? (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <span className="text-2xl font-bold">Clinical Assistant</span>
            </div>
          ) : (
            <>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <span className="text-2xl font-bold">Clinical Assistant</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="block sm:hidden">
                  <button
                    className="text-gray-800"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Menu
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-md">
                      {tabs.map((tab, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            router.push(tab.href);
                          }}
                        >
                          {tab.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden sm:flex flex-row justify-end gap-1">
                  {tabs.map((tab, index) => (
                    <span
                      key={index}
                      className={`text-sm font-bold cursor-pointer p-1 px-2 rounded-md hover:bg-gray-200`}
                      onClick={() => router.push(tab.href)}
                    >
                      {tab.name}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
