import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import StdTable from "./components/StdTable/StdTable";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <PrivateRoute>
            <StdTable />
          </PrivateRoute>
        }
      />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
