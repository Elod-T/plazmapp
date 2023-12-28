import { useContext } from "react";
import BasePage from "../components/BasePage";
import { PlazmAPPContext } from "../App";
import MyReservations from "../components/MyReservations";
import { Button } from "../components/design";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(PlazmAPPContext);

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  const user = plazmAPP.getUser();

  const handleLogout = () => {
    plazmAPP.logout();
  };

  return (
    <BasePage>
      <h1 className="mt-32 text-3xl font-bold">Üdv {user?.firstname}!</h1>
      <p className="text-xl mt-5">Lefoglalt időpontjaim</p>

      <MyReservations />

      <div className="mx-auto w-fit mt-5">
        <Button
          className="bg-[#007AFF] dark:bg-[#0A84FF] hover:dark:bg-[#0a84ffcc]"
          onClick={() => navigate("/reservation")}
        >
          Új foglalás
        </Button>
      </div>

      <div className="mx-auto w-fit mt-10">
        <Button
          className="bg-[#ff3b30] dark:bg-[#ff453a] hover:dark:bg-[#ff3a3ac7]"
          onClick={handleLogout}
        >
          Kijelentkezés
        </Button>
      </div>
    </BasePage>
  );
};

export default Dashboard;
