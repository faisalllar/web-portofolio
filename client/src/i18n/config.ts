
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "home": "Home",
      "about": "About",
      "projects": "Projects",
      "contact": "Contact",
      "welcome": "Welcome",
      "discover": "Discover",
      "profile": "Profile",
      "greeting": "Hello, I am",
      "occupation": "Web Developer | UI Designer | Mobile Developer",
      "shortBio": "An Informatics student and web developer who is passionate about creating engaging and intuitive digital experiences for users."
    }
  },
  id: {
    translation: {
      "home": "Beranda",
      "about": "Tentang",
      "projects": "Proyek",
      "contact": "Kontak",
      "welcome": "Selamat Datang",
      "discover": "Jelajahi",
      "profile": "Profil",
      "greeting": "Halo, Saya adalah",
      "occupation": "Pengembang Web | Desainer UI | Pengembang Mobile",
      "shortBio": "Seorang mahasiswa Informatika dan pengembang web yang bersemangat tentang menciptakan pengalaman digital yang menarik dan intuitif untuk pengguna."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
