import React, { useEffect, useState } from "react";
import axios from "axios";
import BpmnViewer from "./BpmnViewer";

interface StaticBpmnProps {
   fileId: string
}

const StaticBpmn: React.FC<StaticBpmnProps> = ({ fileId }) => {
   const [bpmnXML, setBpmnXML] = useState<string>("");
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchBpmnFile = async () => {
         try {
            const response = await axios.get(`/bpmn${fileId}.json`);

            setBpmnXML(response.data.data);
         } catch (err) {
            setError("Failed to load BPMN file.");
            console.error(err);
         }
      };

      fetchBpmnFile();
   }, [fileId]);

   if (error) return <p className="text-danger">{error}</p>;

   return (
      <div className="mb-4">
         <BpmnViewer xml={bpmnXML} />
      </div>
   );
};

export default StaticBpmn;
