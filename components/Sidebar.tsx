import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
const BarcodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const IdCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm12 5a1 1 0 01-1 1H5a1 1 0 110-2h10a1 1 0 011 1zM5 10a1 1 0 000 2h2a1 1 0 100-2H5z" />
  </svg>
);
const SimCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 2h10v2H5V4zm0 4h10v2H5V8zm0 4h10v2H5v-2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const PassportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm10 5a1 1 0 100-2H6a1 1 0 100 2h8zm-3 4a1 1 0 100-2H6a1 1 0 100 2h5z"
      clipRule="evenodd"
    />
  </svg>
);
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zm.464-10.607a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100 2h1a1 1 0 100-2H3z"
      clipRule="evenodd"
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const CoffeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a8 8 0 00-8 8 3 3 0 003 3h1.333a2 2 0 011.825 1.253l.442.884a2 2 0 001.825 1.253H10a2 2 0 001.825-1.253l.442-.884a2 2 0 011.825-1.253H15a3 3 0 003-3 8 8 0 00-8-8zm0 14a1 1 0 01-.894-.553l-.442-.884a4 4 0 00-3.65-2.513H4a1 1 0 010-2h1.333a4 4 0 003.65-2.513l.442-.884A1 1 0 0110 6h.001a1 1 0 01.894.553l.442.884A4 4 0 0014.987 10H16a1 1 0 010 2h-1.013a4 4 0 00-3.65 2.513l-.442.884A1 1 0 0110 16z" />
  </svg>
);

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 ${
        isActive
          ? "bg-primary-500 text-white dark:bg-primary-600 dark:hover:bg-primary-700"
          : ""
      }`
    }
  >
    {icon}
    <span className="mx-4 font-medium">{children}</span>
  </RouterNavLink>
);

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [theme, setTheme] = useState(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="hidden md:block text-3xl font-semibold text-primary-600 dark:text-primary-400">
            Gen-It
          </h2>
          <button
            className="md:hidden text-gray-500 dark:text-gray-400"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav onClick={() => setIsOpen(false)}>
            <NavLink to="/" icon={<HomeIcon />}>
              Home
            </NavLink>
            <NavLink to="/barcodes" icon={<BarcodeIcon />}>
              Barcode Generator
            </NavLink>
            <NavLink to="/rsa-id" icon={<IdCardIcon />}>
              RSA ID Generator
            </NavLink>
            <NavLink to="/rsa-passport" icon={<PassportIcon />}>
              RSA Passport
            </NavLink>
            <NavLink to="/sim-cards" icon={<SimCardIcon />}>
              SIM Generator
            </NavLink>
            <NavLink to="/imei" icon={<PhoneIcon />}>
              IMEI Generator
            </NavLink>
          </nav>
          <div className="mt-6 space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-full px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              <span className="mx-4 font-medium">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </button>
            <a
              href="https://buymeacoffee.com/potenza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-gray-800 dark:text-gray-900 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 font-medium rounded-lg transition-colors duration-300"
            >
              <CoffeeIcon />
              <span className="mx-4">Buy me a coffee</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
