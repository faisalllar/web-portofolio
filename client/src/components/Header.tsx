import { useState } from "react";
import { useLocation, Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { CodeIcon, Menu } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <a className="text-primary dark:text-indigo-400 text-2xl font-bold flex items-center">
              <CodeIcon className="mr-2" />
              <span className="font-['Poppins']">Muhammad Faisal</span>
            </a>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`font-medium transition-colors duration-200 ${
                  location === link.href
                    ? "text-primary dark:text-indigo-400"
                    : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-indigo-400"
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 space-y-2 bg-white dark:bg-gray-800 shadow-md">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`block py-2 font-medium ${
                    location === link.href
                      ? "text-primary dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
