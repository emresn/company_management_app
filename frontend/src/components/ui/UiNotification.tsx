import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MessageModel } from "../../models/messageModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { closeNotification } from "../../stores/notificationSlice";

type Props = {
  message: MessageModel;
};

const UiNotification = ({ message }: Props) => {
  const dispatch = useAppDispatch();
  const notificationState = useSelector(
    (state: AppState) => state.notificationState
  );

   useEffect(() => {
    if (notificationState.message.isActive) {
      setTimeout(() => {
        dispatch(closeNotification());
      }, 2000);
    }
  }, [dispatch, notificationState]);

  const colorStr =
    message.type === "success"
      ? "bg-indigo-300"
      : message.type === "error"
      ? "bg-red-300"
      : message.type === "warning"
      ? "bg-yellow-300"
      : "";
  return (
    <div className={`${!message.isActive && 'invisible'} `}>
      <div className="absolute -right-72 bottom-0 bg-light z-10 ">
        <div className={`md:w-72 relative transform ${message.isActive ? '-translate-x-72' : 'translate-x-72'}  transition-transform duration-200 m-4 `}>
          <div className={`font-semibold p-4 ${colorStr}`}>
            <span>{message.text}</span>
            <div
              className="cursor-pointer absolute -top-2 -right-2 bg-light  rounded-full"
              onClick={() => dispatch(closeNotification())}
            >
              <img width={22} src="/assets/close.svg" alt="close"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiNotification;
