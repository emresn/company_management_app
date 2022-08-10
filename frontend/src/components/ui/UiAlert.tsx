import { MessageModel } from "../../models/messageModel";
import { useAppDispatch } from "../../redux/hooks";
import {  closeAlert, switchisApproved } from "../../stores/alertSlice";
import UiButton from "./UiButton";

type Props = {
  title: string;
  message: MessageModel;
};

const UiAlert = ({ title, message }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className="bg-orange-100  text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message.text}</p>
      <div className="flex flex-row justify-end gap-4">
        <div>
         <div onClick={()=>(dispatch(closeAlert()))}> <UiButton color="light" size="sm" text="Cancel" /></div>
        </div>
        <div>
          <div onClick={()=>(dispatch(switchisApproved(true)))}><UiButton color="danger" size="sm" text="Yes" /></div>
        </div>
      </div>
    </div>
  );
};

export default UiAlert;
