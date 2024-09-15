import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AppRouter;
