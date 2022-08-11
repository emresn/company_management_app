import UiButton from "../../components/ui/UiButton";
import {
  errorMessage,
  successMessage,
  warningMessage,
} from "../../models/messageModel";
import { useAppDispatch } from "../../redux/hooks";
import { setNotification } from "../../stores/notificationSlice";

type Props = {};

const NotificationsTest = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className=" h-80 w-full justify-center items-center flex">
      <div className="flex flex-row justify-center items-center gap-4">
        <div
          onClick={() =>
            dispatch(
              setNotification({ message: successMessage("Successfully Added") })
            )
          }
        >
          <UiButton color="success" size="lg" text="Success" />{" "}
        </div>
        <div
          onClick={() =>
            dispatch(
              setNotification({
                message: warningMessage("Warning: You were logged out."),
              })
            )
          }
        >
          <UiButton color="warning" size="lg" text="Warning" />
        </div>
        <div
          onClick={() =>
            dispatch(
              setNotification({ message: errorMessage("Item was deleted !") })
            )
          }
        >
          <UiButton color="danger" size="lg" text="Danger" />{" "}
        </div>
      </div>
    </div>
  );
};

export default NotificationsTest;
