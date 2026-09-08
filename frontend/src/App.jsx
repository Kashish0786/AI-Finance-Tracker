// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Signup from "./authpages/Signup";
// import Login from "./authpages/Login";
// import Navbar from "./pages/Navbar";
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/navbar" element={<Navbar />} />
//       {/* <Route path="/signup" element={<Signup />} /> */}
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Subscriptions from "./pages/Subscriptions";
import TrackExpense from "./pages/Expenses";
import Goals from "./pages/Goals";
import EMITracker from "./pages/Emi";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/expenses" element={<TrackExpense />} />
        <Route path="/emi" element={<EMITracker />} />
        <Route path="/goals" element={<Goals />} />
      
      </Routes>
    </>
  );
}

export default App;