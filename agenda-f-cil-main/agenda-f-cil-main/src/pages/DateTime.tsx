import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";
import Header from "@/components/Header";
import SimpleCalendar from "@/components/SimpleCalendar";

const TIMES = ["08h00", "10h00", "14h00", "16h00"];

const DateTime = () => {
  const navigate = useNavigate();
  const { selectedPackage, address, selectedDate, selectedTime, setSelectedDate, setSelectedTime } = useBooking();

  if (!selectedPackage || !address) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 rounded-lg border border-border bg-card p-4 space-y-1">
          <p className="text-lg font-semibold text-card-foreground">{selectedPackage.name} — R$ {selectedPackage.price}</p>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>

        <SimpleCalendar onSelectDate={setSelectedDate} selectedDate={selectedDate} />

        {selectedDate && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-foreground">
              Horários disponíveis para {selectedDate.toLocaleDateString("pt-BR")}:
            </p>
            <div className="flex flex-wrap gap-3">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`rounded-md border px-5 py-2.5 text-sm font-medium transition-colors ${
                    selectedTime === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Duração estimada: {selectedPackage.duration}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/confirmacao")}
          disabled={!selectedDate || !selectedTime}
          className="mt-10 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40"
        >
          Confirmar Agendamento
        </button>
      </main>
    </div>
  );
};

export default DateTime;
