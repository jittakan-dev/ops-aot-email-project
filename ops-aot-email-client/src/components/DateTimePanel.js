import React, { useState, useRef, useEffect } from "react";
import { formatTime } from "../utilities/Helper";

const DateTimePanel = (props) => {
  const dateTimeRef = useRef(null);
  const [timeFormat, setTimeFormat] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeFormat(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col p-6 text-white bg-slate-400">
      <label
        htmlFor="to"
        className="my-2 mb-4 font-semibold text-xl text-center text-gray-700"
      >
        Date/Time Selected : YYYY-MM-DD | HH:MM:00
      </label>
      <input
        ref={dateTimeRef}
        type="text"
        id="time"
        value={`${props.dateFromPicker}  |  ${
          props.timeFromPicker !== "00:00:00"
            ? props.timeFromPicker
            : formatTime(timeFormat)
        }`}
        readOnly
        className="py-4 cursor-default font-semibold text-2xl text-center bg-slate-600 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default DateTimePanel;
