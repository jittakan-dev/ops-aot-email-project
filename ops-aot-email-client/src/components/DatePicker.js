import React, { useState, useEffect } from "react";
import { formatDate, daysOfWeek, monthsOfYear } from "../utilities/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function isEventMatchingDate(eventFetch, day, currentMonth, currentYear) {
  const eventDate = new Date(
    eventFetch.dateTime.substring(0, eventFetch.dateTime.indexOf("T"))
  );
  return (
    eventDate.getDate() === day &&
    eventDate.getMonth() === currentMonth &&
    eventDate.getFullYear() === currentYear
  );
}
const DatePicker = (props) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsDate, setEventsDate] = useState([]);

  const handleDateClick = (day, eventMatch) => {
    setSelectedDate(day);
    props.onDateChange(formatDate(day), eventMatch);
  };
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    fetch("/emails")
      .then((response) => response.json())
      .then((data) => setEventsDate(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex flex-col w-full h-full px-6 pb-6 justify-center items-center text-lg bg-slate-300 ">
      <label className="w-full py-4 font-bold text-2xl text-center text-gray-700">
        Select Date
      </label>
      <div className="flex w-full text-slate-700 ">
        <button
          className="flex-none px-4 py-2 border-2 border-slate-400"
          onClick={goToPreviousMonth}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="" />
        </button>
        <div className="grow">
          <div className="flex w-full py-2 space-x-4 justify-center items-center font-bold text-2xl text-slate-600 border-y-2 border-slate-400 ">
            <div>{monthsOfYear[currentMonth]}</div>
            <div>{currentYear}</div>
          </div>
        </div>
        <button
          className="flex-none px-4 py-2 border-2 border-slate-400"
          onClick={goToNextMonth}
        >
          <FontAwesomeIcon icon={faAngleRight} className="" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-7 w-full my-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium text-center text-gray-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 w-full gap-4">
        {[
          ...Array(firstDayOfMonth).fill(null),
          ...Array(daysInMonth).keys(),
        ].map((day, index) => {
          const currentDate = new Date(currentYear, currentMonth, day + 1);
          const isDateDisabled = currentDate < today;
          const eventsMatches = eventsDate.filter((eventFetch) =>
            isEventMatchingDate(eventFetch, day, currentMonth, currentYear)
          );

          const eventDay = eventsDate.find((eventFetch) =>
            isEventMatchingDate(eventFetch, day, currentMonth, currentYear)
          );
          return (
            <div key={index} className="bg-slate-400">
              <button
                onClick={
                  isDateDisabled
                    ? null
                    : () =>
                        handleDateClick(
                          new Date(currentYear, currentMonth, day),
                          eventsMatches ? eventsMatches : null
                        )
                }
                className={`w-full p-1 text-center hover:bg-blue-500 ${
                  day === null
                    ? "text-gray-400"
                    : eventDay
                    ? "bg-red-500 text-white"
                    : day === today.getDate() &&
                      currentMonth === today.getMonth()
                    ? "bg-blue-500 text-white hover:text-white"
                    : selectedDate &&
                      day === selectedDate.getDate() &&
                      currentMonth === selectedDate.getMonth() &&
                      currentYear === selectedDate.getFullYear()
                    ? "bg-yellow-500 text-white"
                    : ""
                } ${
                  isDateDisabled
                    ? "bg-slate-500 hover:bg-slate-500 hover:text-black cursor-default"
                    : ""
                }`}
              >
                {day === null ? "" : day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
