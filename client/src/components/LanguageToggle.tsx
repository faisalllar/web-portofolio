
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    void i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="w-16"
      aria-label="Toggle language"
    >
      {i18n.language === 'id' ? 'ID' : 'EN'}
    </Button>
  );
}
