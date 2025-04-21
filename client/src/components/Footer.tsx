import { Link } from "wouter";
import { CodeIcon, GithubIcon, LinkedinIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="text-primary dark:text-indigo-400 text-xl font-bold flex items-center">
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
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Muhammad Faisal Abdurrahman. UTS Pemrograman Web.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/">
              <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 text-sm transition-colors">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 text-sm transition-colors">
                About
              </a>
            </Link>
            <Link href="/projects">
              <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 text-sm transition-colors">
                Projects
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 text-sm transition-colors">
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
