import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../store/authSlice";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";

const Header: React.FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { t } = useTranslation();
   const { changeLanguage, currentLanguage } = useLanguageSwitcher();

   const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
   };

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 py-3">
         <div className="container">
            <Link to="/" className="navbar-brand text-secondary">
               {t("header_title")}
            </Link>

            <div className="d-flex align-items-center gap-3">
               {
                  currentLanguage === "en" ? (
                     <button className="btn" onClick={() => changeLanguage("fa")}>FA</button>
                  ) : (
                     <button className="btn" onClick={() => changeLanguage("en")}>EN</button>
                  )
               }
               <button className="btn btn-secondary" onClick={handleLogout}>
                  {t("logout")}
               </button>
            </div>

         </div>
      </nav >
   );
};

export default Header;
