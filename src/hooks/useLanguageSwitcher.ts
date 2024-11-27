import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguageSwitcher = () => {
   const { i18n } = useTranslation();

   const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      document.dir = lng === "fa" ? "rtl" : "ltr";
   };

   useEffect(() => {
      document.dir = i18n.language === "fa" ? "rtl" : "ltr";
   }, [i18n.language]);

   return { changeLanguage, currentLanguage: i18n.language };
};

export default useLanguageSwitcher;
