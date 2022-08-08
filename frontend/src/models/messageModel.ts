export type MessageModel = {
  text: string;
  isActive: boolean;
  type: "success" | "error" | "warning" | "";
};


export const successMessage = (text: string) => {
  const msg: MessageModel = { isActive: true, text: text, type: "success" };
  return msg;
};

export const errorMessage = (text: string) => {
  const msg: MessageModel = { isActive: true, text: text, type: "error" };
  return msg;
};
export const warningMessage = (text: string) => {
  const msg: MessageModel = { isActive: true, text: text, type: "warning" };
  return msg;
};
export const initMessage = () => {
  const msg: MessageModel = { isActive: false, text: "", type: "" };
  return msg;
};
