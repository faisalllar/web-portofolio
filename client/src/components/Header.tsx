import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { CodeIcon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 py-2" 
          : "bg-white/30 dark:bg-gray-900/30 py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <div className="cursor-pointer text-black dark:text-white font-bold flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CodeIcon className="mr-2" />
              </motion.div>
              <span className={`font-['Poppins'] ${scrolled ? "text-lg" : "text-xl"} transition-all duration-300`}>
                Muhammad Faisal
              </span>
            </div>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-1">
            {navLinks.map((link, i) => (
              <motion.li key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link href={link.href}>
                  <div
                    className={`px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-all duration-200 ${
                      location === link.href
                        ? "text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <motion.button
            className="md:hidden focus:outline-none text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <div
                      className={`block py-2 px-2 rounded-md my-1 text-sm font-medium ${
                        location === link.href
                          ? "text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
