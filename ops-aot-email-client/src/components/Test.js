import React, { useEffect, useCallback, useState } from "react";
const Test = () => {
  const [, setData] = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch("/emails", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  return (
    <div>
      {/* {data.map(() => {
        return <div></div>;
      })} */}
    </div>
  );
};

export default Test;
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Test from "./pages/Test";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         {/* <Route path="/home" element={<Home />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;
