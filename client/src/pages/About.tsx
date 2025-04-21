import { motion } from "framer-motion";
import { BookOpenIcon, BriefcaseIcon, CodeIcon, GraduationCapIcon } from "lucide-react";

const About = () => {
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

  const skills = [
    { name: "HTML & CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "UI/UX Design", level: 65 },
  ];

  const education = [
    {
      degree: "Teknik Informatika",
      institution: "Universitas Islam Negeri Makassar",
      year: "2022 - sekarang",
      description: "Menempuh pendidikan S1 di bidang Teknologi Informasi dengan fokus pada Pengembangan Web dan Aplikasi Mobile.",
    },
    {
      degree: "SMA IPA",
      institution: "SMA Negeri 1 Makassar",
      year: "2019 - 2022",
      description: "Lulus dengan nilai tertinggi di kelas. Aktif dalam klub komputer dan matematika."
    }
  ];

  return (
    <motion.section
      id="about"
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
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Saya adalah seorang mahasiswa Informatika yang mengkhususkan diri dalam pengembangan web modern.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookOpenIcon className="mr-2 text-primary" /> Tentang Saya
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Nama saya Muhammad Faisal Abdurrahman. Saya seorang mahasiswa Teknik Informatika yang
                bersemangat tentang teknologi web dan mobile. Saya senang menggabungkan kreativitas dengan 
                logika coding untuk membuat aplikasi yang berguna dan menarik secara visual.
              </p>
              <p>
                Selain coding, saya juga tertarik dengan desain UI/UX dan selalu berusaha membuat proyek
                dengan tampilan yang menarik dan pengalaman pengguna yang baik. Saya terus belajar hal-hal baru
                dalam dunia teknologi dan bertujuan untuk berkontribusi pada solusi yang inovatif.
              </p>
              <p>
                Saya percaya pada pembelajaran seumur hidup dan senang berkolaborasi dengan orang lain 
                untuk mengembangkan keterampilan dan memperluas pengetahuan saya.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CodeIcon className="mr-2 text-primary" /> Kemampuan
            </h2>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-primary h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-20"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <GraduationCapIcon className="mr-2 text-primary" /> Pendidikan
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <span className="text-sm text-primary dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900 px-3 py-1 rounded-full">
                    {edu.year}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{edu.institution}</h4>
                <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-20"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <BriefcaseIcon className="mr-2 text-primary" /> Pengalaman
          </h2>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-8 ml-4">
            <motion.div 
              className="mb-10 relative"
              variants={itemVariants}
            >
              <div className="absolute -left-[41px] bg-white dark:bg-gray-800 p-2 rounded-full border-2 border-primary">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Web Developer Freelance</h3>
                  <span className="text-sm text-primary dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900 px-3 py-1 rounded-full">
                    2023 - Sekarang
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Berbagai Proyek</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Mengerjakan proyek website untuk klien dari berbagai bidang. Menyediakan solusi pengembangan web
                  modern dengan fokus pada responsivitas dan pengalaman pengguna yang baik.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="mb-10 relative"
              variants={itemVariants}
            >
              <div className="absolute -left-[41px] bg-white dark:bg-gray-800 p-2 rounded-full border-2 border-primary">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Asisten Lab Komputer</h3>
                  <span className="text-sm text-primary dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900 px-3 py-1 rounded-full">
                    2023
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Universitas Islam Negeri Makassar</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Membantu dosen dalam mengajar praktikum pemrograman dasar. Membantu mahasiswa dalam menyelesaikan tugas
                  dan memahami konsep dasar pemrograman.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;