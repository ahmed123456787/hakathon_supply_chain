import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./myComponents/Sidebar";
import ChatBox from "./pages/ChatBox";
import Dashboard from "./pages/Dashboard";
import DeliveryTracking from "./pages/DeliveryTracking";
import InventoryManagement from "./pages/Inventory";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar (toujours fixe à gauche) */}
        <Sidebar />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1 p-5  overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/inventory-managment"
              element={<InventoryManagement />}
            />
            <Route path="/ai-agent" element={<ChatBox />} />
            <Route path="/tracking" element={<DeliveryTracking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
