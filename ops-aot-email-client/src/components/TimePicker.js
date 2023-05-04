import React, { useRef, useState } from "react";

function TimePicker(props) {
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const now = new Date();
  const handleTimeChange = () => {
    const hours = hoursRef.current.value;
    const minutes = minutesRef.current.value;
    setHours(hours);
    setMinutes(minutes);
    props.onTimeChange(
      hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":00"
    );
  };

  return (
    <div className="flex flex-col w-full px-6 pb-6 justify-center items-center bg-slate-200">
      <label className="w-full py-4 font-bold text-2xl text-center text-gray-700">
        Select Time
      </label>
      <div className="flex w-full py-4 items-center justify-center font-semibold text-2xl bg-slate-300">
        <input
          ref={hoursRef}
          className="text-center border-4 border-slate-400 bg-slate-200"
          type="number"
          min={props.onToday !== null ? now.getHours() : 0}
          max="23"
          value={hours}
          // value={props.onToday !== null ? props.onToday : hours}
          onChange={handleTimeChange}
        />
        {console.log(hours)}
        <span className="px-2">:</span>
        <input
          ref={minutesRef}
          className="text-center border-4 border-slate-400 bg-slate-200"
          type="number"
          min={props.onToday !== null ? now.getMinutes() : 0}
          max="59"
          value={minutes}
          onChange={handleTimeChange}
        />
        <span className="px-2">:</span>
        <span className="px-2 text-center text-slate-200 border-4 border-slate-500 bg-slate-500">
          00
        </span>
      </div>
    </div>
  );
}

export default TimePicker;
