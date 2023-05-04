import React, { useState, useRef } from "react";
import SMTPEmail from "./components/SMTPEmail";
import DatePicker from "./components/DatePicker";
import TimePicker from "./components/TimePicker";
import DateTimePanel from "./components/DateTimePanel";
import EventPanel from "./components/EventPanel";
import { currentDate, currentTime } from "./utilities/Helper";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from "@fortawesome/free-solid-svg-icons";
import Test from "./components/Test";

function App() {
  const eventRef = useRef(null);
  // const [toggleAlert, setToggleAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState([]);
  const [openEvent, setOpenEvent] = useState(false);
  const [emailForm, setEmailForm] = useState({
    email: "",
    subject: "",
    body: "",
    date: currentDate(),
    time: "00:00:00",
  });
  const handleTime = (time) => {
    setEmailForm((prevForm) => ({
      ...prevForm,
      time: time === "00:00:00" ? currentTime() : time,
    }));
  };
  const handleDate = (date, eventMatchArray) => {
    setEmailForm((prevForm) => ({
      ...prevForm,
      date: date,
    }));
    setEventDetail(eventMatchArray);
    setOpenEvent(true);
  };
  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEmailForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (emailForm.email === null || emailForm.email === "") {
      // setAlertMessage("Email is empty!");
      return;
    }
    if (emailForm.date === currentDate() && emailForm.time < currentTime()) {
      // setAlertMessage("Can not set an event back in the past!");
      return;
    }
    fetch("/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: emailForm.email,
        subject: emailForm.subject,
        body: emailForm.body,
        dateTime:
          emailForm.date +
          "T" +
          (emailForm.time === "00:00:00" ? currentTime() : emailForm.time),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setIsLoading(false);
        // setAlertMessage("Email is successfully schedule :D");
        setEmailForm((prevForm) => ({
          email: "",
          subject: "",
          body: "",
          date: currentDate(),
          time: currentTime(),
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        // setAlertMessage(
        //   "Email is not successfully schedule. Try again later :( "
        // );
      });
  };
  // const handleAlertClose = (e) => {
  //   e.preventDefault();
  //   setToggleAlert(false);
  // };
  return (
    <div className="flex flex-col w-full justify-center items-center text-lg">
      <div className="flex flex-col  w-2/3 justify-center items-center">
        {/* Alert Message */}
        {/* <div
          className="w-full"
          style={{
            display: toggleAlert ? "block" : "none",
          }}
        >
          <div className="flex flex-col w-full justify-center items-center p-6 mb-6 bg-slate-600">
            <div
              className="w-auto p-4 self-end cursor-pointer bg-red-500 text-white"
              onClick={handleAlertClose}
            >
              <FontAwesomeIcon icon={faClose} className="text-2xl" />
            </div>
            <div className="w-full p-6 text-2xl bg-red-500 text-white">
              {alertMessage}
            </div>
          </div>
        </div> */}
        {/* Alert Message */}
        <Test />
        <SMTPEmail />
        <div className="flex w-full h-full space-x-5 justify-center items-start">
          <div className="flex flex-col w-1/2">
            <DatePicker
              onDateChange={(date, eventMatchArray) => {
                handleDate(date, eventMatchArray);
                // scrollToEvent();
              }}
            />
            <TimePicker
              onTimeChange={(time) => handleTime(time)}
              onToday={
                emailForm.date === currentDate()
                  ? parseInt(new Date().getHours())
                  : null
              }
            />
          </div>
          <div className="flex flex-col w-1/2">
            <DateTimePanel
              dateFromPicker={emailForm.date}
              timeFromPicker={emailForm.time}
            />
            <form className="p-6 bg-slate-300">
              <label className="w-full py-4 font-bold text-2xl text-center text-gray-700">
                Messages
              </label>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="to"
                  className="my-2 font-semibold text-gray-600"
                >
                  To :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailForm.email}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="subject"
                  className="my-2 font-semibold text-gray-600"
                >
                  Subject :
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={emailForm.subject}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="message"
                  className="mb-2 font-semibold text-gray-600"
                >
                  Message :
                </label>
                <textarea
                  id="message"
                  name="body"
                  value={emailForm.body}
                  onChange={handleFormChange}
                  rows="4"
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div
          ref={eventRef}
          className="flex flex-col w-full p-6 m-6 justify-center items-start text-xl bg-slate-300"
          style={{
            display: openEvent ? "block" : "none",
          }}
        >
          <EventPanel
            eventDetail={eventDetail}
            eventDateSelected={emailForm.date}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
