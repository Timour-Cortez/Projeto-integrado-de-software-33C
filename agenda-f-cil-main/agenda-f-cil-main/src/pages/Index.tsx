import { useNavigate } from "react-router-dom";
import { useBooking, PackageInfo } from "@/contexts/BookingContext";
import Header from "@/components/Header";
import serviceBronze from "@/assets/service-bronze.jpg";
import servicePrata from "@/assets/service-prata.jpg";
import serviceOuro from "@/assets/service-ouro.jpg";
import SimpleCalendar from "@/components/SimpleCalendar";

const packages: (PackageInfo & { image: string })[] = [
  { name: "Pacote Bronze", price: 150, duration: "1h30", image: serviceBronze },
  { name: "Pacote Prata", price: 300, duration: "2h30", image: servicePrata },
  { name: "Pacote Ouro", price: 500, duration: "4h", image: serviceOuro },
];

const Index = () => {
  const navigate = useNavigate();
  const { setSelectedPackage } = useBooking();

  const handleSelect = (pkg: PackageInfo) => {
    setSelectedPackage(pkg);
    navigate("/localizacao");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground">Serviços de Limpeza</h1>
        <p className="mt-2 text-muted-foreground">Explore nossos pacotes</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <img src={pkg.image} alt={pkg.name} className="h-48 w-full object-cover" width={640} height={512} />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-card-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.duration} de serviço</p>
                <p className="mt-2 text-2xl font-bold text-foreground">R$ {pkg.price}</p>
                <button
                  onClick={() => handleSelect(pkg)}
                  className="mt-4 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  Selecionar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Prestadores na região</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="Mapa de prestadores"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.7,-23.6,-46.6,-23.5&layer=mapnik"
              className="h-80 w-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </section>

        {/* Calendário */}
        <section className="mt-12 mb-16">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Disponibilidade</h2>
          <SimpleCalendar />
        </section>
      </main>
    </div>
  );
};

export default Index;
