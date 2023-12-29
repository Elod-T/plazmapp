import { useContext, useEffect, useState } from "react";
import { Button } from "../components/design";
import { PlazmAPPContext } from "../App";
import { Day } from "../types";
import BasePage from "../components/BasePage";
import type PlazmAPP from "../api";

interface TimeSlots {
  [key: string]: string[];
}

export const getTimeslots = async (plazmAPP: PlazmAPP) => {
  const openDays = await plazmAPP.getOpenDays();

  const newTimeSlots: TimeSlots = {};

  await Promise.all(
    openDays.opendays.map(async (day) => {
      const timeSlots = await plazmAPP.getTimeslots(day.day);
      newTimeSlots[day.day] = timeSlots;
    })
  );
  return { newTimeSlots, openDays };
};

const NewReservation = () => {
  const context = useContext(PlazmAPPContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDays, setOpenDays] = useState<Day[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlots>({});
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const getOpenTimes = async () => {
      const cachedOpenTimes = localStorage.getItem("openTimes");

      if (cachedOpenTimes) {
        const { openDays, timeSlots, createdAt } = JSON.parse(
          cachedOpenTimes
        ) as {
          openDays: Day[];
          timeSlots: TimeSlots;
          createdAt: number;
        };

        if (new Date().getTime() - createdAt < 1000 * 60 * 5) {
          setTimeSlots(timeSlots);
          setOpenDays(openDays);
          setLoading(false);
          return;
        }
      }

      const { newTimeSlots, openDays } = await getTimeslots(plazmAPP);
      setTimeSlots(newTimeSlots);
      setOpenDays(openDays.opendays);

      const data = {
        openDays: openDays.opendays,
        timeSlots: newTimeSlots,
        createdAt: new Date().getTime(),
      };

      localStorage.setItem("openTimes", JSON.stringify(data));

      setLoading(false);
    };

    getOpenTimes();
  }, []);

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  const user = plazmAPP.getUser();

  const handleReservation = async (day: Day) => {
    const date = new Date(day.day);
    const time = new Date(selectedTime);

    date.setHours(time.getHours());
    const dateString = date.toISOString().slice(0, 16) + "Z";

    const reservation = await plazmAPP.reserve(dateString);
    console.log(reservation);
  };

  return (
    <BasePage>
      <h1 className="mt-32 text-3xl font-bold">Üdv {user?.firstname}!</h1>
      <p className="text-xl mt-5">
        Válaszd ki a napot, amikor plazmát szeretnél adni
      </p>

      <div className="mx-auto w-full my-10">
        {loading ? (
          <div className="flex flex-col gap-y-3">
            <div className="skeleton w-full max-w-96 h-52 mx-auto"></div>
            <div className="skeleton w-full max-w-96 h-52 mx-auto"></div>
            <div className="skeleton w-full max-w-96 h-52 mx-auto"></div>
          </div>
        ) : (
          <div>
            {openDays.length > 0 ? (
              <div className="mx-auto flex flex-col gap-y-5">
                {openDays.map((day) => (
                  <div
                    key={day.day}
                    className="mx-auto w-full max-w-96 card bg-base-200"
                  >
                    <div className="card-body">
                      <div>
                        {new Date(day.day).toLocaleDateString("hu")}{" "}
                        <strong>{day.name}</strong>
                      </div>

                      <select
                        className="select select-bordered select-sm"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option selected>Válassz időpontot</option>
                        {timeSlots[day.day].map((time) => (
                          <option key={time} value={time}>
                            {new Date(time).toLocaleTimeString("hu", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </option>
                        ))}
                      </select>

                      <Button
                        className="w-full mt-3 bg-[#007AFF] dark:bg-[#0A84FF] hover:dark:bg-[#0a84ffcc]"
                        onClick={() => handleReservation(day)}
                      >
                        Foglalás
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nincs elérhető időpont</p>
            )}
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default NewReservation;
