import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-full overflow-hidden bg-[#080c14] text-[#f8fafc] flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Viewport with Vertical Scroll */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Header */}
        <Navbar onMobileMenuToggle={() => setMobileOpen(true)} />

        {/* Scrollable Main Canvas with Safe Area Padding */}
        <main className="flex-1 overflow-y-auto safe-area-content max-w-7xl w-full mx-auto space-y-10 pb-16 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}