import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Buildings } from "./pages/Buildings";
import CreateBuilding from "./pages/CreateBuilding/CreateBuilding";
import CreateOffice from "./pages/CreateOffice/CreateOffice";
import CreateRenting from "./pages/CreateRenting/CreateRenting";
import CreateRentingWithId from "./pages/CreateRentingWithId/CreateRentingWithId";
import { Dashboard } from "./pages/Dashboard";
import OfficeData from "./pages/OfficeData/OfficeData";
import { Offices } from "./pages/Offices";
import RentingData from "./pages/RentingData/RentingData";
import Rentings from "./pages/Rentings/Rentings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buildings" element={<Buildings />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/offices/create" element={<CreateOffice />} />
        <Route path="/office/:id" element={<OfficeData />} />
        <Route path="/rentings" element={<Rentings />} />
        <Route path="/renting/:id" element={<RentingData />} />
        <Route path="/rentings/create">
          <Route path="/rentings/create/:officeId" element={<CreateRentingWithId />} />
          <Route path="" element={<CreateRenting />} />
        </Route>
        <Route path="/buildings/create" element={<CreateBuilding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
