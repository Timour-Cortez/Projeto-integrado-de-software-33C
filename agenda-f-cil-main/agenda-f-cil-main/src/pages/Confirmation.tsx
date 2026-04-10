import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";
import Header from "@/components/Header";
import { CheckCircle2 } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const booking = useBooking();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!booking.selectedPackage || !booking.address || !booking.selectedDate || !booking.selectedTime) {
    navigate("/");
    return null;
  }

  const handleFinalize = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <h2 className="mt-6 text-2xl font-bold text-foreground">Agendamento realizado com sucesso!</h2>
          <p className="mt-3 text-muted-foreground">Protocolo: <span className="font-semibold text-foreground">#2025-001</span></p>
          <button
            onClick={() => { booking.reset(); navigate("/"); }}
            className="mt-8 rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Voltar ao início
          </button>
        </main>
      </div>
    );
  }

  const inputClass = "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground">Quase lá! Informe seus dados</h1>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Nome completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Telefone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-0000" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className={inputClass} />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-5 space-y-2">
          <h3 className="font-semibold text-card-foreground">Resumo do Agendamento</h3>
          <p className="text-sm text-muted-foreground">Pacote: <span className="text-foreground font-medium">{booking.selectedPackage.name} — R$ {booking.selectedPackage.price}</span></p>
          <p className="text-sm text-muted-foreground">Endereço: <span className="text-foreground font-medium">{booking.address}</span></p>
          <p className="text-sm text-muted-foreground">Data: <span className="text-foreground font-medium">{booking.selectedDate.toLocaleDateString("pt-BR")}</span></p>
          <p className="text-sm text-muted-foreground">Horário: <span className="text-foreground font-medium">{booking.selectedTime}</span></p>
          <p className="text-sm text-muted-foreground">Duração: <span className="text-foreground font-medium">{booking.selectedPackage.duration}</span></p>
        </div>

        <button
          onClick={handleFinalize}
          disabled={!name.trim() || !phone.trim() || !email.trim()}
          className="mt-8 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40"
        >
          Finalizar Agendamento
        </button>
      </main>
    </div>
  );
};

export default Confirmation;
