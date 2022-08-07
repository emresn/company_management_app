import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { homeRoute, loginRoute } from "../../constants/routeConstants";
import { SiteConstants } from "../../constants/siteConstants";
import { NavbarItems } from "../../data/navbarItems";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { signOut } from "../../viewModels/authSlice";

type Props = {};

const NavbarView = (props: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const authState = useSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();

  const CloseMenu = () => {
    return (
      <img
        width={26}
        height={26}
        onClick={() => setMenuIsOpen(false)}
        className="cursor-pointer"
        src="/assets/menu_close.svg"
        alt="menu_close"
      />
    );
  };

  const ExpandMenu = () => {
    return (
      <img
        width={26}
        height={26}
        className="cursor-pointer"
        onClick={() => setMenuIsOpen(true)}
        src="/assets/menu_open.svg"
        alt="menu_open"
      />
    );
  };

  function logoutHandler() {
    dispatch(signOut());
  }
  return (
    <nav className={`${menuIsOpen ? "min-w-max" : ""} h-screen relative`}>
      <div className="flex flex-col h-full justify-between ">
        <NavLink to={homeRoute}>
          <div
            className={
              menuIsOpen
                ? "text-lg font-bold m-2 p-4 text-center"
                : "text-sm flex flex-wrap p-1 m-2 w-12"
            }
          >
            {menuIsOpen ? SiteConstants.siteName : SiteConstants.shortName}
          </div>
        </NavLink>

        <div className="absolute top-0 right-0">
          {menuIsOpen ? <CloseMenu /> : <ExpandMenu />}
        </div>

        <hr />
        <ul>
          {NavbarItems.map((e) => (
            <NavLink to={e.route} key={e.alt}>
              <li
                key={e.alt}
                className="mx-2 px-2 py-3 flex flex-row gap-3 items-center hover:bg-primary-700 rounded-xl "
              >
                <img width={26} height={26} alt={e.alt} src={e.src} />
                {menuIsOpen && <span className="">{e.name}</span>}
              </li>
            </NavLink>
          ))}
        </ul>
        <div className="flex-auto"></div>

        <div className="m-2">
          {authState.isAuthenticated ? (
            <div className="flex flex-row justify-between items-center">
             {menuIsOpen && <div
                className={`border border-light ${
                  menuIsOpen ? "p-3" : "p-1"
                } hover:bg-gray-400`}
              >
                <span className="text-sm">Hi {authState.username}</span>
              </div>}
              <div className="cursor-pointer mx-2" onClick={() => logoutHandler()}>
                <img width={30} src="/assets/logout.svg" alt="logout"></img>
              </div>
            </div>
          ) : (
            <NavLink to={loginRoute}>
              <div
                className={`border border-light ${
                  menuIsOpen ? "p-3" : "p-1"
                } hover:bg-gray-400`}
              >
                <span className="text-sm">Login</span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarView;
