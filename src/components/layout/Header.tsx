import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import navLogo from "../../assets/icons/icon-set/nav_logo.svg";
import AuthNavigation from "./navigation/AuthNavigation";
import GuestNavigation from "./navigation/GuestNavigation";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed h-27 inset-x-0 top-0 z-50 border-b border-grayscale-200 bg-grayscale-100  max-mobile:px-2  max-tablet:px-12 max-laptop:px-25 px-44.25 flex items-center ">
      <nav className=" flex h-15 items-center w-full justify-between  ">
        <Link
          to={"/"}
          className="button-primary p-0 flex items-center justify-center rounded-[14px] h-full w-15"
        >
          <img alt="RedClass logo" className="h-7.5 w-7.5 " src={navLogo} />
        </Link>

        {isAuthenticated ? <AuthNavigation /> : <GuestNavigation />}
      </nav>
    </header>
  );
}
