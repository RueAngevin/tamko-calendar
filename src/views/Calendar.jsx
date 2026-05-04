import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import iCalendarPlugin from "@fullcalendar/icalendar";

function Calendar() {
  const calendarRef = useRef(null);

  // ICS proxy
  const googleCalendarEvents = {
    url: "https://tamko-calendar.vercel.app/api/googleCalendarProxy",
    format: "ics",
  };

  // current month/year
  const now = new Date();
  const [CurrentDate, setCurrentDate] = useState({
    month: now.toLocaleString("default", { month: "long" }),
    year: now.getFullYear(),
  });

  // modal state
  const [selectedEvent, setSelectedEvent] = useState(null);

  // update header
  const updateHeader = () => {
    const api = calendarRef.current?.getApi();
    const newDate = api?.getDate();

    setCurrentDate({
      month: newDate.toLocaleString("default", { month: "long" }),
      year: newDate.getFullYear(),
    });
  };

  // click date
  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  // click event
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

    setSelectedEvent({
      title: event.title,
      startTime,
      endTime,
      description: event.extendedProps.description || "No description",
    });
  };

  // navigation
  const prevMonth = () => {
    calendarRef.current?.getApi().prev();
    updateHeader();
  };

  const nextMonth = () => {
    calendarRef.current?.getApi().next();
    updateHeader();
  };

  const toToday = () => {
    calendarRef.current?.getApi().today();
    updateHeader();
  };

  // event colors
  const getEventColor = (event) => {
    if (event.title.includes("Hangouts")) return "bg-green-500";
    if (event.title.includes("Exam")) return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <>
      {/* Calendar Card */}
      <div className="h-160 w-280 bg-white rounded-3xl">
        {/* Header */}
        <div className="grid grid-cols-3 h-20">
          <div className="flex items-center gap-3 pl-5">
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
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5"
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
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5"
              />
            </svg>

            <button
              className="ml-5 border px-2 py-1 rounded-md"
              onClick={toToday}
            >
              Today
            </button>
          </div>

          <div className="flex items-center justify-center text-2xl font-bold gap-2">
            <p>{CurrentDate.month}</p>
            <p>{CurrentDate.year}</p>
          </div>
        </div>

        {/* Calendar */}
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
                  className={`p-1 w-full text-xs text-white rounded-md ${getEventColor(
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

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-80 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-2">
              {selectedEvent.title}
            </h2>

            <p className="text-sm mb-2">
              {selectedEvent.startTime} - {selectedEvent.endTime}
            </p>

            <p className="text-gray-600">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;