import React from "react";

type Props = {
  label: string;
  id: string;
  value: string | number;
  type: "text" | "number";
  step?: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormElementText = ({ id, label, type, step, value, onChange }: Props) => {
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
    </div>
  );
};

export default FormElementText;
