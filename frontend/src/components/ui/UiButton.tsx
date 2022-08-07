import React from "react";

type Props = {
  size: "sm" | "lg";
  // Size Options: sm, lg
  text: string;
  color: "dark" | "light"  | "success" | "warning" |"danger";
  //   Options: dark, light, success, warning, danger
};

const UiButton = ({ size, text, color }: Props) => {
  const colorStr = {
    dark: "bg-dark hover:bg-gray-700 text-light",
    light: "bg-light hover:bg-gray-300 text-dark",
    success: "bg-cinder-800 hover:bg-cinder-600 text-white",
    warning: "bg-yellow-700 hover:bg-yellow-600 text-white",
    danger: "bg-red-700 hover:bg-red-600 text-white",
  };
  const sizeStr = {
    large: "py-2 px-4",
    small: "py-1 px-2 text-sm",
  };
  const common = "border border-gray-400 rounded shadow";

  const colorStyles =
    color === "dark"
      ? colorStr.dark
      : color === "light"
      ? colorStr.light
      : color === "success"
      ? colorStr.success
      : color === "warning"
      ? colorStr.warning
      : color === "danger"
      ? colorStr.danger
      : colorStr.light;

  switch (size) {
    case "sm":
      return (
        <div>
          <button
            type="button"
            className={`${colorStyles} ${sizeStr.small} ${common}`}
          >
            {text}
          </button>
        </div>
      );
    case "lg":
      return (
        <div>
          <button
            type="button"
            className={`${colorStyles} ${sizeStr.large} ${common}`}
          >
            {text}
          </button>
        </div>
      );
    default:
      return (
        <div>
          <button>{text}</button>
        </div>
      );
  }
};

export default UiButton;
