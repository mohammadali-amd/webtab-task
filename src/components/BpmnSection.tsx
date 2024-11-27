import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/store";
import BpmnViewer from "./BpmnViewer";
import StaticBpmn from "./StaticBpmn";
import { BPMN_FILE_URL } from "../constants/constants";

const BpmnSection: React.FC = () => {
   const { t } = useTranslation();
   const fileId = useSelector((state: RootState) => state.fileId.fileId);
   const [bpmnXML, setBpmnXML] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchBpmnFile = async () => {
         try {
            const token = localStorage.getItem("token");
            if (!token) {
               setError("No token found in localStorage");
               return;
            }

            const response = await axios.get(`${BPMN_FILE_URL}?fileId=${fileId}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
               },
            });

            setBpmnXML(response.data.data);
         } catch (err) {
            setError("Failed to load BPMN file from server.");
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchBpmnFile();
   }, [fileId]);

   if (loading) return <p>{t("loading")}</p>;

   return (
      <div className="mb-5">
         <h2 className="text-center mb-3">{t("diagram")}</h2>
         {!error ? null : <StaticBpmn fileId={fileId} />}
         {!error ? (
            <BpmnViewer xml={bpmnXML} />
         ) : (
            <p className="text-danger">{error}</p>
         )}
      </div>
   );
};

export default BpmnSection;
