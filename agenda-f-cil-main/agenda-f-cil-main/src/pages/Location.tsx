import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";
import Header from "@/components/Header";

const Location = () => {
  const navigate = useNavigate();
  const { selectedPackage, address, setAddress } = useBooking();
  const [localAddress, setLocalAddress] = useState(address);

  if (!selectedPackage) {
    navigate("/");
    return null;
  }

  const handleContinue = () => {
    setAddress(localAddress);
    navigate("/data-horario");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pacote selecionado</p>
          <p className="text-lg font-semibold text-card-foreground">{selectedPackage.name} — R$ {selectedPackage.price}</p>
        </div>

        <label className="block text-sm font-medium text-foreground mb-2">
          Digite o endereço onde deseja o serviço
        </label>
        <input
          type="text"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
          placeholder="Ex: Rua das Flores, 123 - São Paulo"
          className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <iframe
            title="Mapa de prestadores"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.7,-23.6,-46.6,-23.5&layer=mapnik"
            className="h-72 w-full"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Prestadores disponíveis na região</p>

        <button
          onClick={handleContinue}
          disabled={!localAddress.trim()}
          className="mt-8 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40"
        >
          Continuar
        </button>
      </main>
    </div>
  );
};

export default Location;
