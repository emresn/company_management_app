import { useState } from "react";
import { SiteConstants } from "../../constants/siteConstants";
import { NavbarItems } from "../../data/navbarItems";

type Props = {};

const NavbarView = (props: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const CloseMenu = () => {
    return (
      <img
        width={26}
        height={26}
        onClick={() => setMenuIsOpen(false)}
        className="cursor-pointer"
        src="./assets/menu_close.svg"
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
        src="./assets/menu_open.svg"
        alt="menu_open"
      />
    );
  };
  return (
    <nav className={`${menuIsOpen ? "w-1/6" : ""} h-screen relative`}>
      <div className="flex flex-col">
        <div
          className={
            menuIsOpen
              ? "text-lg font-bold m-2 p-2 text-center"
              : "text-sm flex flex-wrap p-1 m-2 w-12"
          }
        >
          {menuIsOpen ? SiteConstants.siteName : SiteConstants.shortName}
        </div>
        <div className="absolute top-0 right-0">
          {menuIsOpen ? <CloseMenu /> : <ExpandMenu />}
        </div>

        <hr />
        <ul>
          {NavbarItems.map((e) => (
            <li
              key={e.alt}
              className="mx-2 px-2 py-3 flex flex-row gap-3 items-center hover:bg-primary-600 rounded-xl "
            >
              <img width={26} height={26} alt={e.alt} src={e.src} />
              {menuIsOpen && <span className="">{e.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarView;
