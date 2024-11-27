import React, { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js";

interface BpmnViewerProps {
   xml: string;
}

const BpmnViewer: React.FC<BpmnViewerProps> = ({ xml }) => {
   const viewerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const bpmnViewer = new BpmnJS({
         container: viewerRef.current as HTMLElement
      });

      if (xml) {
         bpmnViewer.importXML(xml)
            .then(() => {
               const canvas = bpmnViewer.get("canvas") as { zoom: (zoomLevel: string) => void };
               canvas.zoom("fit-viewport");
            })
            .catch((err) => {
               console.error("Error rendering BPMN diagram:", err);
            });
      }

      return () => bpmnViewer.destroy();
   }, [xml]);

   return (
      <div ref={viewerRef} style={{ height: "500px", }} />
   );
};

export default BpmnViewer;
