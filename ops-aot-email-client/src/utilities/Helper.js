export const currentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const currentTime = () => {
  const now = new Date();
  const timeOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return now.toLocaleTimeString("en-US", timeOptions);
};
export const formatDate = (date) => {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = String(fullDate.getMonth() + 1).padStart(2, "0");
  const day = String(fullDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const formatTime = (time) => {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
export const isValidEmail = (email) => {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  return emailPattern.test(email);
};
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const [focusedInput, setFocusedInput] = useState(null);
// const [showError, setShowError] = useState(false);
// const scrollToEvent = useCallback(() => {
//   if (eventDetail.length > 0) {
//     eventRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// }, [eventDetail]);

// useEffect(() => {
//   scrollToEvent();
// }, [scrollToEvent]);

// function handleInputValidation(e) {
//   const { name, value } = e.target;
//   if (name === "email" && value !== "") {
//     const isEmailValid = isValidEmail(value);
//     setShowError(!isEmailValid);
//   } else if (value !== "") {
//     setShowError(false);
//   } else {
//     setShowError(true);
//   }
// }
