import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default AppRouter;
