import { BrowserRouter } from "react-router-dom";
import ApplicationRoutes from "../../routes/AppRoutes";

import NavbarView from "./NavbarView";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row ">
        <NavbarView />
        <div className="bg-light flex-auto">
          <BrowserRouter>
            <ApplicationRoutes />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default Layout;
