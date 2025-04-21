import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  CodeIcon, 
  GithubIcon, 
  LinkedinIcon, 
  DownloadIcon, 
  BrainIcon, 
  GlobeIcon, 
  SmartphoneIcon,
  ChevronDownIcon
} from "lucide-react";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const toType = "Web Developer | UI Designer | Mobile Developer";
  const typingSpeed = 100; // ms per character
  const scrollRef = useRef(null);

  // Matrix-style background effect
  const DigitalRain = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 overflow-hidden">
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="matrix-column" style={{ 
              left: `${i * 5}%`, 
              animationDuration: `${Math.random() * 5 + 10}s`,
              animationDelay: `${Math.random() * 2}s` 
            }}>
              {Array.from({ length: 15 }).map((_, j) => (
                <div key={j} className="matrix-character" style={{ 
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}>
                  {String.fromCharCode(Math.floor(Math.random() * 26) + 97)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (typedText.length < toType.length) {
      const timeout = setTimeout(() => {
        setTypedText(toType.substring(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typedText]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

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

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Wave animation for particles
  const waveVariants = {
    start: {
      y: 0,
      transition: {
        yoyo: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Create 5 random particles with different positions and sizes
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 2
  }));

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
      className="pt-16 pb-24 px-4 overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Matrix-style background effect */}
      <DigitalRain />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-black dark:bg-white opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ y: 0 }}
            animate="start"
            variants={waveVariants}
            transition={{ delay: particle.delay }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-3 text-gray-700 dark:text-gray-300 font-medium inline-block"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Halo, Saya adalah
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-black dark:text-white font-['Poppins']"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Muhammad Faisal A.{" "}
              <span className="text-black dark:text-white block mt-2">
                <span className="text-black dark:text-white mr-1">{typedText}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    times: [0, 0.2, 0.8, 1] 
                  }}
                  className="inline-block w-[2px] h-8 bg-black dark:bg-white align-middle"
                >
                  &nbsp;
                </motion.span>
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Seorang mahasiswa Informatika dan pengembang web yang bersemangat tentang
              menciptakan pengalaman digital yang menarik dan intuitif untuk pengguna.
            </motion.p>

            <motion.div 
              className="flex space-x-4 pt-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="GitHub"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <GithubIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedinIcon className="h-5 w-5" />
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Link href="/contact">
                <Button 
                  className="w-full sm:w-auto text-center bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black" 
                  size="lg"
                >
                  <motion.span
                    initial={{ opacity: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Hubungi Saya
                  </motion.span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto text-center border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                size="lg"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" /> Download CV
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            style={{ 
              perspective: 1000,
              scale,
              opacity
            }}
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouse}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-600 rounded-full blur-3xl opacity-10 -z-10 transform -rotate-12"></div>
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300"
                initial={{ rotate: 2 }}
                whileHover={{ 
                  rotate: 0,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Muhammad Faisal"
                    className="w-full h-auto object-cover transition-all duration-700"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => scrollRef.current.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </motion.div>

        <motion.div
          ref={scrollRef}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-bl-full -z-10"
                whileHover={{
                  scale: 2,
                  transition: { duration: 0.5 }
                }}
              />
              
              <motion.div
                className={`w-12 h-12 ${service.bgClass} ${service.textClass} rounded-full flex items-center justify-center mb-4 border border-gray-300 dark:border-gray-700`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{service.title}</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
              
              <motion.div 
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 mt-4 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="h-full bg-black dark:bg-white rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  viewport={{ once: true }}
                />
              </motion.div>
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
              className="px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black overflow-hidden group relative"
            >
              <motion.span
                initial={{ opacity: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative z-10"
              >
                Lihat Portofolio Saya
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-600 to-black dark:from-gray-400 dark:to-white -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Custom CSS for the Matrix effect */}
      <style jsx global>{`
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .matrix-column {
          position: absolute;
          top: -20%;
          width: 1px;
          height: 120%;
          background: linear-gradient(to bottom, 
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 75%,
            rgba(0, 0, 0, 0) 100%);
          animation: fall linear infinite;
        }
        
        .matrix-character {
          position: relative;
          color: rgba(0, 0, 0, 0.8);
          font-family: monospace;
          font-size: 1.2rem;
          text-align: center;
          animation: glow ease-in-out infinite;
        }
        
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .dark .matrix-character {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </motion.section>
  );
};

export default Home;
