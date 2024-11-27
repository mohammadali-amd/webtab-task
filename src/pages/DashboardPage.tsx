import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BpmnSection from "../components/BpmnSection";
import DynamicForm from "../components/DynamicForm";
import { RootState } from "../store/store";
import { setFileId } from "../store/fileIdSlice";

const DashboardPage: React.FC = () => {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const fileId = useSelector((state: RootState) => state.fileId.fileId);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as "1" | "2";
      if (value === "1" || value === "2") dispatch(setFileId(value));
   };

   return (
      <>
         <h1 className="mb-4">{t("welcome")}</h1>

         <div className="mb-4 d-flex align-items-end gap-3">
            <label htmlFor="fileIdInput" className="form-label">
               {t("enterFileId")}
            </label>
            <input
               id="fileIdInput"
               type="number"
               min="1"
               max="2"
               value={fileId}
               onChange={handleInputChange}
               className="form-control w-auto"
            />
         </div>

         <BpmnSection />
         <DynamicForm />
      </>
   );
};

export default DashboardPage;
