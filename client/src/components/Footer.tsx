import { Link } from "wouter";
import { CodeIcon, GithubIcon, LinkedinIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="text-black dark:text-white text-xl font-bold flex items-center">
                <CodeIcon className="mr-2" />
                <span className="font-['Poppins']">Muhammad Faisal</span>
              </a>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Mahasiswa Informatika & Web Developer
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/faisalllar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-faisal-abdurrahman-a78161217/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/faisalll.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Muhammad Faisal Abdurrahman. NIM 152023100.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/">
              <a className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                About
              </a>
            </Link>
            <Link href="/projects">
              <a className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                Projects
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
