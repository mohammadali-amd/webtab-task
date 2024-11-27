import React, { useEffect, useState } from "react";
import { Form } from "@formio/react";
import axios from "axios";

interface StaticFormProps {
   fileId: string
}

const StaticForm: React.FC<StaticFormProps> = ({ fileId }) => {
   const [setForm, setSetForm] = useState()
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchFormIoFile = async () => {
         try {
            const response = await axios.get(`/formio${fileId}.json`)
            setSetForm(response.data)
         } catch (err) {
            setError("Failed to load Form.io file.");
            console.error(err);
         }
      };

      fetchFormIoFile();
   }, [fileId]);

   const handleFormSubmit = (submission: unknown) => {
      console.log("Form submitted with data: ", submission);
   };

   if (error) return <p className="text-danger">{error}</p>;

   return (
      <div className="mb-4">
         <Form
            form={setForm}
            onSubmit={handleFormSubmit}
         />
      </div>
   );
};

export default StaticForm;
