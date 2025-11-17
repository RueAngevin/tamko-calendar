import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const calendarRef = useRef(null);

  // dummy events
  const [events, setEvents] = useState([
    { title: "Tamko Hangout", date: "2025-11-15", backgroundColor: "#2D9BF0" },

    {title: "Subassociation Meeting", date: "2025-11-20",backgroundColor: "#27AE60",},
  ]);

  // state for month and year
  const now = new Date();
  const [CurrentDate, setCurrentDate] = useState({
    month: now.toLocaleString("default", {month:"long"}),
    year: now.getFullYear()
  })

  // function to update the header after each prev/next click
  const updateHeader = () => {
    const api = calendarRef.current?.getApi();
    const newDate = api?.getDate();

    setCurrentDate({
      month: newDate.toLocaleString("default", {month:"long"}),
      year: newDate.getFullYear(),
    })
  }

  // alerts for clicked dates for now
  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  // previous month
  const prevMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    updateHeader();
  };

  // next month
  const nextMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    updateHeader();
  };

  // return to today
  const toToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    updateHeader();
  }

  return (
    <div className="h-[40rem] mt-[5rem] w-[70rem] bg-white rounded-3xl">
      <div className="grid grid-cols-3 grid-rows-1 h-20">
        <div className="flex justify-start pl-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer"
            onClick={prevMonth}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer"
            onClick={nextMonth}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <button className="ml-5 border-2 p-1 rounded-md cursor-pointer" onClick={toToday}>Today</button>
        </div>
        <div className="flex justify-center items-center gap-3">
          <p>{CurrentDate.month}</p>
          <p>{CurrentDate.year}</p>
        </div>
        <div className="flex justify-end items-center pr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </div>
      </div>

      {/* calendar */}
      <div className="p-5">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={false}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="32rem"
        />
      </div>
    </div>
  );
}

export default Calendar;

