import { useState, useMemo } from "react";

interface SimpleCalendarProps {
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date | null;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const SimpleCalendar = ({ onSelectDate, selectedDate }: SimpleCalendarProps) => {
  const [currentMonth] = useState(new Date());

  const unavailableDays = useMemo(() => new Set([3, 7, 12, 18, 25]), []);

  const { year, month, daysInMonth, startDay } = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    return {
      year: y,
      month: m,
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      startDay: new Date(y, m, 1).getDay(),
    };
  }, [currentMonth]);

  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(<div key={`e${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) {
    const unavailable = unavailableDays.has(d);
    const isSelected = selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month;
    cells.push(
      <button
        key={d}
        disabled={unavailable}
        onClick={() => onSelectDate?.(new Date(year, month, d))}
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors mx-auto
          ${unavailable ? "text-muted-foreground/40 cursor-not-allowed" : ""}
          ${!unavailable && !isSelected ? "text-foreground hover:bg-accent ring-2 ring-primary/30 ring-inset" : ""}
          ${isSelected ? "bg-primary text-primary-foreground" : ""}
        `}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-6">
      <p className="mb-4 text-center text-lg font-semibold capitalize text-card-foreground">{monthName}</p>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-xs font-medium text-muted-foreground">{w}</span>
        ))}
        {cells}
      </div>
    </div>
  );
};

export default SimpleCalendar;
