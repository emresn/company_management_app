import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import ApplicationRoutes from "../../routes/AppRoutes";
import { checkAuthentication } from "../../viewModels/authSlice";
import UiWarning from "../ui/UiAlert";

import NavbarView from "./NavbarView";

type Props = {};

const Layout = (props: Props) => {
  const state = useSelector((state: AppState) => state);
  const alertState = state.alertState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch])
  

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative">
        {alertState.alertType !== "none" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10">
            <div className="absolute left-1/3 top-1/3 bg-light z-20">
              <UiWarning
                message={alertState.message}
                title={alertState.title}
              />
            </div>
          </div>
        )}
        <div className="flex flex-row ">
          <NavbarView />
          <div className="bg-light flex-auto relative">
            <ApplicationRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
