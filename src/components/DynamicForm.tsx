import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "@formio/react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/store";
import StaticForm from "./StaticForm";
import { FORM_IO_FILE_URL } from "../constants/constants";

interface FormJson {
   components: unknown[];
}

const DynamicForm: React.FC = () => {
   const { t } = useTranslation();
   const fileId = useSelector((state: RootState) => state.fileId.fileId);
   const [formJson, setFormJson] = useState<FormJson | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchFormFile = async () => {
         try {
            const token = localStorage.getItem("token");
            if (!token) {
               setError("No token found in localStorage");
               return;
            }

            const response = await axios.get(`${FORM_IO_FILE_URL}?fileId=${fileId}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
               },
            });

            setFormJson(response.data);
         } catch (err) {
            setError("Failed to load dynamic form.");
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchFormFile();
   }, [fileId]);

   const handleFormSubmit = (submission: unknown) => {
      console.log("Form submitted with data: ", submission);
   };

   if (loading) return <p>{t("loading")}</p>;

   return (
      <div>
         <h2 className="text-center mb-3">{t("form")}</h2>
         {formJson ? null : <StaticForm fileId={fileId} />}
         {formJson ? (
            <Form
               form={formJson}
               onSubmit={handleFormSubmit}
            />
         ) : (
            <p className="text-danger">{error}</p>
         )}
      </div>
   );
};

export default DynamicForm;
