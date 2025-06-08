import React, { useState } from "react";

type Props = {
  onSelectDate: (date: string) => void;
};

const Calendar: React.FC<Props> = ({ onSelectDate }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0–11

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;

  const pad = (n: number) => n.toString().padStart(2, "0");

  const handlePrevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div>
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.5rem",
    fontSize: "1.2rem", 
  }}
>
  <button
    onClick={handlePrevMonth}
    style={{ fontSize: "1.5rem", cursor: "pointer", background: "none", border: "none" }}
  >
    ⬅
  </button>
  <h3 style={{ margin: 0 }}>
  {new Date(year, month).toLocaleString("en", { month: "long", year: "numeric" })}
</h3>

  <button
    onClick={handleNextMonth}
    style={{ fontSize: "1.5rem", cursor: "pointer", background: "none", border: "none" }}
  >
    ➡
  </button>
</div>


      {/* 📅 Дни */}
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;

          return (
            <div
              key={day}
              className={`calendar-day ${
                isCurrentMonth && day === today ? "today" : ""
              }`}
              onClick={() => onSelectDate(dateStr)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
