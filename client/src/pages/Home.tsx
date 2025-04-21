import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CodeIcon, 
  GithubIcon, 
  LinkedinIcon, 
  DownloadIcon, 
  BrainIcon, 
  GlobeIcon, 
  SmartphoneIcon
} from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const services = [
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Membuat website modern dan responsif dengan berbagai teknologi terbaru seperti React, Next.js, dan Tailwind CSS.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
    {
      icon: <SmartphoneIcon className="h-6 w-6" />,
      title: "Mobile Development",
      description:
        "Mengembangkan aplikasi mobile untuk Android dan iOS menggunakan React Native dan Flutter.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
    {
      icon: <BrainIcon className="h-6 w-6" />,
      title: "UI/UX Design",
      description:
        "Merancang antarmuka yang intuitif dan menarik dengan fokus pada pengalaman pengguna yang baik.",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      textClass: "text-black dark:text-white",
    },
  ];

  return (
    <motion.section
      id="home"
      className="pt-16 pb-24 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            variants={itemVariants}
          >
            <div className="mb-3 text-gray-700 dark:text-gray-300 font-medium">Halo, Saya adalah</div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-['Poppins']">
              Muhammad Faisal A.{" "}
              <span className="text-black dark:text-white block mt-2">
                <motion.span
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    times: [0, 0.1, 0.9, 1] 
                  }}
                  className="inline-block w-[2px] h-8 bg-black dark:bg-white ml-1 align-middle"
                >
                  &nbsp;
                </motion.span>
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Seorang mahasiswa Informatika dan pengembang web yang bersemangat tentang
              menciptakan pengalaman digital yang menarik dan intuitif untuk pengguna.
            </p>

            <div className="flex space-x-4 pt-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button className="w-full sm:w-auto text-center bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black" size="lg">
                  Hubungi Saya
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto text-center border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                size="lg"
              >
                <DownloadIcon className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={itemVariants}
            whileHover={{ rotate: 0, transition: { duration: 0.5 } }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-600 rounded-full blur-3xl opacity-10 -z-10 transform -rotate-12"></div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform rotate-2 transition-transform hover:rotate-0 duration-300">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Muhammad Faisal"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div
                className={`w-12 h-12 ${service.bgClass} ${service.textClass} rounded-full flex items-center justify-center mb-4 border border-gray-300 dark:border-gray-700`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          variants={itemVariants}
        >
          <Link href="/projects">
            <Button 
              size="lg" 
              className="px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
            >
              Lihat Portofolio Saya
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;
