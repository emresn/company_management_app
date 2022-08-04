import { BrowserRouter } from "react-router-dom";
import ApplicationRoutes from "../../routes/AppRoutes";

import NavbarView from "./NavbarView";

type Props = {};

const Layout = (props: Props) => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-row ">
          <NavbarView />
          <div className="bg-light flex-auto">
            <ApplicationRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
