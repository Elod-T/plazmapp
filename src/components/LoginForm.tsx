import { useContext, useState } from "react";
import { PlazmAPPContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, NumberInput, DateInput } from "./design";
import BasePage from "./BasePage";

function LoginForm() {
  const navigate = useNavigate();

  const context = useContext(PlazmAPPContext);

  const [donorNumber, setDonorNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState(false);

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  const handleLogin = async () => {
    if (donorNumber.length !== 8) {
      alert("Hibás donorszám!");
      return;
    }

    if (plazmAPP) {
      setLoading(true);

      try {
        await plazmAPP.login({
          donor_number: donorNumber,
          date_of_birth: dateOfBirth,
        });
      } catch (e) {
        alert("Hibás donorszám vagy születési dátum!");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <BasePage>
      <div className="text-xl flex flex-col text-center max-w-xs mx-auto">
        <h1 className="text-3xl font-bold mb-10 mt-32">PlazmAPP</h1>

        <div className="flex flex-col gap-y-5">
          <NumberInput
            value={donorNumber}
            onChange={(e) => setDonorNumber(e.target.value)}
          />

          <DateInput
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <Button
            className="mt-5 bg-[#ff3b30] dark:bg-[#ff453a] hover:dark:bg-[#ff3a3ac7]"
            onClick={handleLogin}
            loading={loading}
          >
            Bejelentkezés
          </Button>
        </div>
      </div>
    </BasePage>
  );
}

export default LoginForm;
