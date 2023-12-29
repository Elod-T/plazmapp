import { useContext, useEffect, useState } from "react";
import { PlazmAPPContext } from "../App";
import { ReservationsResponse } from "../types";
import { Button } from "./design";

const MyReservations = () => {
  const context = useContext(PlazmAPPContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [myReservations, setMyReservations] = useState<ReservationsResponse>(
    []
  );

  useEffect(() => {
    const getReservations = async () => {
      const cachedReservations = localStorage.getItem("myReservations");

      if (cachedReservations) {
        const { reservations, createdAt } = JSON.parse(cachedReservations) as {
          reservations: ReservationsResponse;
          createdAt: number;
        };

        if (new Date().getTime() - createdAt < 1000 * 60 * 5) {
          setMyReservations(reservations);
          setLoading(false);
          return;
        }
      }

      const reservations = await context?.plazmAPP.getMyReservations();
      if (!reservations) {
        return;
      }

      const data = {
        reservations,
        createdAt: new Date().getTime(),
      };

      localStorage.setItem("myReservations", JSON.stringify(data));

      setMyReservations(reservations);
      setLoading(false);
    };

    getReservations();
  }, []);

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  const handleCancelReservation = async (id: string) => {
    await plazmAPP.cancelReservation({ reservationId: id });
    setMyReservations(myReservations.filter((r) => r.id !== id));
  };
  return (
    <div>
      {loading ? (
        <div className="mt-10">
          <div className="skeleton w-full h-52"></div>
        </div>
      ) : (
        <div>
          {myReservations.length > 0 ? (
            <div className="mt-10">
              {myReservations.map((reservation, index) => (
                <div
                  key={reservation.id}
                  className="card border border-gray-500"
                >
                  <div className="card-body">
                    <p className="card-title">
                      {myReservations.length > 1 && `${index + 1}. `}
                      {reservation.category}
                    </p>
                    <p>
                      {new Date(reservation.start).toLocaleDateString("hu", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <p>{reservation.centre} centrum</p>

                    <div className="card-actions">
                      <Button
                        className="bg-[#ff3b30] dark:bg-[#ff453a] hover:dark:bg-[#ff3a3ac7]"
                        onClick={() =>
                          (
                            document.getElementById(
                              "modal" + reservation.id
                            ) as any
                          ).showModal()
                        }
                      >
                        Lemondás
                      </Button>
                      <dialog id={"modal" + reservation.id} className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg">Figyelem!</h3>
                          <p className="py-4">
                            Biztosan le szeretnéd mondani a foglalásodat{" "}
                            <strong>
                              {new Date(reservation.start).toLocaleDateString(
                                "hu",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </strong>{" "}
                            -n?
                          </p>
                          <div className="modal-action">
                            <Button
                              onClick={() =>
                                handleCancelReservation(reservation.id)
                              }
                            >
                              Igen, lemondom
                            </Button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Nincsen</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
