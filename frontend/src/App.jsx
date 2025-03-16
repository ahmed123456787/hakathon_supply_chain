import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./My_components/Sidebar";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/Product_managment";

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
