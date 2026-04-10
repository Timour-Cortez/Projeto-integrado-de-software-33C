import { createContext, useContext, useState, ReactNode } from "react";

export interface PackageInfo {
  name: string;
  price: number;
  duration: string;
}

interface BookingState {
  selectedPackage: PackageInfo | null;
  address: string;
  selectedDate: Date | null;
  selectedTime: string;
}

interface BookingContextType extends BookingState {
  setSelectedPackage: (pkg: PackageInfo) => void;
  setAddress: (addr: string) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string) => void;
  reset: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const reset = () => {
    setSelectedPackage(null);
    setAddress("");
    setSelectedDate(null);
    setSelectedTime("");
  };

  return (
    <BookingContext.Provider value={{
      selectedPackage, address, selectedDate, selectedTime,
      setSelectedPackage, setAddress, setSelectedDate, setSelectedTime, reset
    }}>
      {children}
    </BookingContext.Provider>
  );
};
