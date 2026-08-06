import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#080c14] text-[#f8fafc] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <Navbar onMobileMenuToggle={() => setMobileOpen(true)} />

        {/* Scrollable Main Viewport with Centered Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24">
          <div className="max-w-7xl w-full mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}