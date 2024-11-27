import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { login } from "../store/authSlice";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import { AUTH_REGISTER_URL } from "../constants/constants";

const RegisterPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { t } = useTranslation();
   const { changeLanguage, currentLanguage } = useLanguageSwitcher();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setLoading(true);

      // Validate password match
      if (password !== confirmPassword) {
         setError("Passwords do not match!");
         setLoading(false);
         return;
      }

      try {
         await axios.post(AUTH_REGISTER_URL, { email, password });

         setSuccess("Registration successful! Logging in...");
         dispatch(login({ email }));
         setTimeout(() => navigate("/login"), 1000);
      } catch (error) {
         console.error(error);
         if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.errorData?.errorMessage || "Registration failed.";
            setError(errorMessage);
         } else {
            setError("An unexpected error occurred.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="d-flex justify-content-center align-items-center vh-100">
         <div className="col-md-3">
            <div className="card">
               <div className="card-body position-relative">
                  <div className="position-absolute end-0 px-3">
                     {
                        currentLanguage === "en" ? (
                           <button className="btn" onClick={() => changeLanguage("fa")}>FA</button>
                        ) : (
                           <button className="btn" onClick={() => changeLanguage("en")}>EN</button>
                        )
                     }
                  </div>
                  <h2 className="card-title text-center">{t("register")}</h2>
                  {error && <div className="alert alert-danger">
                     {error === "duplicateUser" ? 'This user already exists.' : error}
                  </div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t("email")}</label>
                        <input
                           type="email"
                           id="email"
                           className="form-control"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </div>
                     <div className="mb-3">
                        <label htmlFor="password" className="form-label">{t("password")}</label>
                        <input
                           type="password"
                           id="password"
                           className="form-control"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </div>
                     <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">{t("confirm_password")}</label>
                        <input
                           type="password"
                           id="confirmPassword"
                           className="form-control"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           required
                        />
                     </div>
                     <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
                        {loading ? t("loading") : t("register")}
                     </button>
                     <div className="text-center mt-3">
                        <small>
                           {t("login_msg")} <Link to="/login" className="text-secondary">{t("login_here")}</Link>
                        </small>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
