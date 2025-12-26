import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import iCalendarPlugin from "@fullcalendar/icalendar";

function Calendar() {
  const calendarRef = useRef(null);

  // ICS proxy from Vercel
  const googleCalendarEvents = {
    url: "https://tamko-calendar.vercel.app/api/googleCalendarProxy",
    format: "ics",
  };

  // state for month and year
  const now = new Date();
  const [CurrentDate, setCurrentDate] = useState({
    month: now.toLocaleString("default", { month: "long" }),
    year: now.getFullYear(),
  });

  // update header after prev/next/today
  const updateHeader = () => {
    const api = calendarRef.current?.getApi();
    const newDate = api?.getDate();

    setCurrentDate({
      month: newDate.toLocaleString("default", { month: "long" }),
      year: newDate.getFullYear(),
    });
  };

  // click on a date (currently just alert)
  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  // click on an event: show start–end, title, description
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const startTime = event.start
      ? event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "";
    const endTime = event.end
      ? event.end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "";

    alert(
      `${startTime} - ${endTime}\n` +
        `${event.title}\n` +
        `${event.extendedProps.description || "No description"}`
    );
  };

  // navigation
  const prevMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    updateHeader();
  };
  const nextMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    updateHeader();
  };
  const toToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    updateHeader();
  };

  // optional: color by event keyword
  const getEventColor = (event) => {
    if (event.title.includes("Hangouts")) return "bg-green-500";
    if (event.title.includes("Exam")) return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="h-160 mt-20 w-280 bg-white rounded-3xl">
      {/* header */}
      <div className="grid grid-cols-3 grid-rows-1 h-20">
        <div className="flex justify-start pl-5 items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
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
            className="w-8 h-8 cursor-pointer"
            onClick={nextMonth}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <button
            className="ml-5 border-2 p-1 rounded-md cursor-pointer"
            onClick={toToday}
          >
            Today
          </button>
        </div>
        <div className="flex font-bold text-2xl justify-center items-center gap-3">
          <p>{CurrentDate.month}</p>
          <p>{CurrentDate.year}</p>
        </div>
        <div className="flex justify-end items-center pr-5">
          {/* optional icon */}
        </div>
      </div>

      {/* calendar */}
      <div className="p-5">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, iCalendarPlugin]}
          headerToolbar={false}
          initialView="dayGridMonth"
          events={googleCalendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="32rem"
          eventContent={(arg) => {
            const { event } = arg;
            const startTime = event.start
              ? event.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "";
            const endTime = event.end
              ? event.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "";

            return (
              <div
                className={`p-1 text-xs w-full text-white rounded-md whitespace-normal ${getEventColor(
                  event
                )}`}
              >
                <div className="font-bold">
                  {startTime} - {endTime}
                </div>
                <div>{event.title}</div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Calendar;
