import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BrushIcon, ShareIcon, TrophyIcon } from "lucide-react";

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

  const features = [
    {
      icon: <BrushIcon className="h-6 w-6" />,
      title: "Create Levels",
      description:
        "Design custom game levels with our easy-to-use editor. Drag and drop elements to create unique challenges.",
      bgClass: "bg-indigo-100 dark:bg-indigo-900",
      textClass: "text-primary dark:text-indigo-300",
    },
    {
      icon: <ShareIcon className="h-6 w-6" />,
      title: "Share Games",
      description:
        "Share your creations with coworkers instantly. Generate a link or add them directly to your team's collection.",
      bgClass: "bg-pink-100 dark:bg-pink-900",
      textClass: "text-secondary dark:text-pink-300",
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
      title: "Compete",
      description:
        "Play others' levels and compete for high scores. Perfect for quick lunch break entertainment with colleagues.",
      bgClass: "bg-green-100 dark:bg-green-900",
      textClass: "text-success dark:text-green-300",
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-['Poppins']">
              Create & Share{" "}
              <span className="text-primary dark:text-indigo-400">
                Game Levels
              </span>{" "}
              During Lunch Breaks
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Design your own challenges, share with coworkers, and compete for
              the high score - all in your web browser, no installation needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/editor">
                <Button className="w-full sm:w-auto text-center" size="lg">
                  Start Creating
                </Button>
              </Link>
              <Link href="/discover">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-center"
                  size="lg"
                >
                  Explore Games
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={itemVariants}
            whileHover={{ rotate: 0, transition: { duration: 0.5 } }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform rotate-2 transition-transform hover:rotate-0 duration-300">
              <img
                src="https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Coworkers playing a game together"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-8px]"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div
                className={`w-12 h-12 ${feature.bgClass} ${feature.textClass} rounded-full flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;
