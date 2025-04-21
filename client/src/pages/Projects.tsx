import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";

const Projects = () => {
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

  const projects = [
    {
      title: "E-Commerce Website",
      description: "Sebuah website toko online lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibuat dengan React, Node.js, dan MongoDB.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Weather App",
      description: "Aplikasi cuaca yang menampilkan informasi cuaca terkini dan prediksi untuk 5 hari ke depan berdasarkan lokasi pengguna. Menggunakan OpenWeather API.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["JavaScript", "HTML", "CSS", "API Integration"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Task Manager",
      description: "Aplikasi manajemen tugas dengan fitur pengorganisasian berdasarkan proyek, prioritas, dan tenggat waktu. Mendukung notifikasi dan kolaborasi tim.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Firebase", "Tailwind CSS", "Context API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Blog Platform",
      description: "Platform blog dengan fitur manajemen konten, komentar, dan analitik. Mendukung markdown dan pemformatan rich text.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "Sanity.io", "Tailwind CSS", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "Website portfolio personal dengan tema minimalis dan animasi halus. Responsif dan mendukung tema gelap/terang.",
      image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Chat App",
      description: "Aplikasi chat real-time dengan fitur pengelompokan, pesan langsung, dan berbagi media. Mendukung notifikasi push.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["React Native", "Firebase", "Socket.io", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <motion.section
      id="projects"
      className="py-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16" 
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Berikut beberapa proyek yang telah saya kerjakan. Menunjukkan kemampuan teknis
            dan kreativitas saya dalam pengembangan web.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-10">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-14">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="md:w-1/2 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLinkIcon className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-10">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="px-2 py-1 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="px-2 py-1 text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <GithubIcon className="mr-1 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLinkIcon className="mr-1 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;