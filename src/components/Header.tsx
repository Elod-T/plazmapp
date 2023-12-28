import { useContext } from "react";
import { PlazmAPPContext } from "../App";
import { useAuth } from "../protectedRoute";

const Header = () => {
  const context = useContext(PlazmAPPContext);
  const loggedIn = useAuth();

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  return (
    <header className="fixed z-50 top-0 navbar bg-base-200">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">
          {loggedIn ? (
            <div>
              Plazmaadásaim eddig:{" "}
              <span className="text-[#ff3b30] dark:text-[#ff453a] animate-pulse">
                {plazmAPP.getUser()?.pphtotal}
              </span>
            </div>
          ) : (
            "PlazmAPP"
          )}
        </a>
      </div>
      <div className="navbar-end"></div>
    </header>
  );
};

export default Header;
