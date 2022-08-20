import React from "react";
import { FormValidationError } from "../models/formValidationErrorModel";

type Props = {
  label: string;
  id: string;
  value: string | number;
  type: "text" | "number";
  step?: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  formValidationErrors: FormValidationError[];
};

const FormElementText = ({
  id,
  label,
  type,
  step,
  value,
  onChange,
  formValidationErrors,
}: Props) => {
  return (
    <div className="flex flex-col mr-2">
      <label htmlFor={id}>{label}</label>
      {type === "number" ? (
        <input
          type={type}
          step={step}
          onChange={onChange}
          className="p-1 border border-gray-500"
          name={id}
          id={id}
          value={value}
        />
      ) : (
        <input
          type={type}
          onChange={onChange}
          className="p-1 border border-gray-500"
          name={id}
          id={id}
          value={value}
        />
      )}
      {formValidationErrors.map((e) => e.id === id && <span key={e.id} className="text-red-500">{e.message}</span>)}
    </div>
  );
};

export default FormElementText;
