import { Route, Routes } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import StdTable from "./components/StdTable/StdTable";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<StdTable />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/table" exact element={<StdTable />} /> */}
    </Routes>
  );
}

export default App;
