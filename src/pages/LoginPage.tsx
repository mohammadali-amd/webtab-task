import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { login } from "../store/authSlice";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import { AUTH_LOGIN_URL } from "../constants/constants";

const LoginPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { t } = useTranslation();
   const { changeLanguage, currentLanguage } = useLanguageSwitcher();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
         const response = await axios.post(AUTH_LOGIN_URL, { email, password });
         const { userToken } = response.data.data;

         localStorage.setItem("token", userToken);
         dispatch(login({ email }));
         navigate("/dashboard");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.errorData?.errorMessage || "Invalid credentials.";
            setError(errorMessage);
         } else {
            setError("Login failed. Please check your credentials.");
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
                  <h2 className="text-center">{t("login")}</h2>

                  {error && <div className="alert alert-danger">{error}</div>}
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
                     <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
                        {loading ? t("loading") : t("login")}
                     </button>
                  </form>
                  <div className="text-center mt-3">
                     <small>
                        {t("register_msg")} <Link to="/register" className="text-secondary">{t("register_here")}</Link>
                     </small>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
