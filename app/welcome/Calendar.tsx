import React, { useState } from "react";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    dayjs().set("month", i).format("MMMM")
  );
console.log(monthNames)
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const handleMonthChange = (offset: number) => {
    setCurrentDate(currentDate.add(offset, "month"));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        currentDate.year() === dayjs().year() &&
        currentDate.month() === dayjs().month() &&
        day === dayjs().date();
      days.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center ${
            isToday ? "bg-blue-300 font-bold" : "bg-gray-100"
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className="w-164 p-4 bg-white border rounded"
      style={{ direction: "rtl", textAlign: "right" }}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => handleMonthChange(-1)}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          قبلی
        </button>
        <span>
          {monthNames[currentDate.month()]} {currentDate.year()}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          بعدی
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {renderDays()}
      </div>
    </div>
  );
}
