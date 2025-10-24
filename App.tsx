import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import RsaIdGenerator from "./pages/RsaIdGenerator";
import RsaSimGenerator from "./pages/RsaSimGenerator";
import ImeiGenerator from "./pages/ImeiGenerator";
import RsaPassportGenerator from "./pages/RsaPassportGenerator";
import RsaPhoneGenerator from "./pages/RsaPhoneGenerator";

// --- Persistent State Hook ---
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

const HamburgerIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="max-w-4xl mx-auto text-center text-gray-500 dark:text-gray-400">
        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
          Disclaimer
        </h3>
        <p className="text-sm mb-3">
          This tool is intended for developers, testers, and educators for
          software testing and validation purposes only. The data generated is
          algorithmically correct but is entirely fictional and does not belong
          to any real person.
        </p>
        <p className="font-semibold text-red-600 dark:text-red-500 text-sm mb-4">
          Using any generated data for fraudulent or illegal activities is
          strictly prohibited.
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Gen IT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="relative min-h-screen md:flex bg-gray-50 dark:bg-gray-900">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
            Gen IT
          </h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 dark:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
            aria-label="Open sidebar"
          >
            <HamburgerIcon />
          </button>
        </div>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-4 md:p-8 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/barcodes" element={<BarcodeGenerator />} />
              <Route path="/rsa-id" element={<RsaIdGenerator />} />
              <Route path="/rsa-passport" element={<RsaPassportGenerator />} />
              <Route path="/sim-cards" element={<RsaSimGenerator />} />
              <Route path="/imei" element={<ImeiGenerator />} />
              <Route path="/rsa-phone" element={<RsaPhoneGenerator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
