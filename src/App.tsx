import { useState, Dispatch, createContext, useMemo } from "react";
import LoginPage from "./pages/LoginPage";
import PlazmAPP from "./api";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./pages/Dashboard";
import NewReservation from "./pages/NewReservation";
import Messages from "./pages/Messages";

interface PlazmAPPContext {
  plazmAPP: PlazmAPP;
  setPlazmAPP: Dispatch<React.SetStateAction<PlazmAPP>>;
}

export const PlazmAPPContext = createContext<PlazmAPPContext | null>(null);

function App() {
  const [plazmAPP, setPlazmAPP] = useState(new PlazmAPP());
  const contextValue = useMemo(
    () => ({ plazmAPP: plazmAPP, setPlazmAPP }),
    [plazmAPP, setPlazmAPP]
  );

  return (
    <PlazmAPPContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservation" element={<NewReservation />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Routes>
    </PlazmAPPContext.Provider>
  );
}

export default App;
