import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth, { Auth } from "./hooks/useAuth";

import { Buildings } from "./pages/Buildings";
import CreateBuilding from "./pages/CreateBuilding/CreateBuilding";
import CreateOffice from "./pages/CreateOffice/CreateOffice";
import CreateRenting from "./pages/CreateRenting/CreateRenting";
import CreateRentingWithId from "./pages/CreateRentingWithId/CreateRentingWithId";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login/Login";
import OfficeData from "./pages/OfficeData/OfficeData";
import { Offices } from "./pages/Offices";
import RentingData from "./pages/RentingData/RentingData";
import Rentings from "./pages/Rentings/Rentings";

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedScreen element={<Dashboard />} user={user} />} />
        <Route path="/buildings" element={<ProtectedScreen element={<Buildings />} user={user} />} />
        <Route path="/offices" element={<ProtectedScreen element={<Offices />} user={user} />} />
        <Route path="/offices/create" element={<ProtectedScreen element={<CreateOffice />} user={user} />} />
        <Route path="/office/:id" element={<ProtectedScreen element={<OfficeData />} user={user} />} />
        <Route path="/rentings" element={<ProtectedScreen element={<Rentings />} user={user} />} />
        <Route path="/renting/:id" element={<ProtectedScreen element={<RentingData />} user={user} />} />
        <Route path="/rentings/create">
          <Route path="/rentings/create/:buildingId/:officeId" element={<ProtectedScreen element={<CreateRentingWithId />} user={user} />} />
          <Route path="" element={<ProtectedScreen element={<CreateRenting />} user={user} />} />
        </Route>
        <Route path="/buildings/create" element={<ProtectedScreen element={<CreateBuilding />} user={user} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedScreen(props: { element: JSX.Element; user?: Auth }) {
  return props.user ? props.element : <Navigate to="/login" replace />;
}

export default App;
