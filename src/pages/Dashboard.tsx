import { useContext, useEffect } from "react";
import BasePage from "../components/BasePage";
import { PlazmAPPContext } from "../App";
import MyReservations from "../components/MyReservations";
import { Button } from "../components/design";
import { useNavigate } from "react-router-dom";
import { getTimeslots } from "./NewReservation";

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(PlazmAPPContext);

  useEffect(() => {
    const preloadOpenTimes = async () => {
      const { newTimeSlots, openDays } = await getTimeslots(plazmAPP);

      const data = {
        openDays: openDays.opendays,
        timeSlots: newTimeSlots,
        createdAt: new Date().getTime(),
      };

      localStorage.setItem("openTimes", JSON.stringify(data));
    };

    preloadOpenTimes();
  }, []);

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
      <div className="mt-32 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Üdv {user?.firstname}!</h1>
        <button className="" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            className="fill-[#ff3b30] dark:fill-[#ff453a] hover:dark:fill-[#ff3a3ac7] hover:scale-110"
          >
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </button>
      </div>
      <p className="text-xl mt-5">Lefoglalt időpontjaim</p>

      <MyReservations />

      <div className="mx-auto w-fit mt-5">
        <Button
          className="bg-[#007AFF] dark:bg-[#0A84FF] hover:dark:bg-[#0a84ffcc]"
          onClick={() => navigate("/reservation")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Új foglalás
        </Button>
      </div>
    </BasePage>
  );
};

export default Dashboard;
