import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatBox from "./pages/ChatBox";
import DeliveryTracking from "./pages/Deliveries";
import MapWithOrder from "./pages/Map";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar (toujours fixe à gauche) */}
        <Sidebar />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1 p-5  overflow-y-auto">
          <Routes>
            <Route path="/ai-agent" element={<ChatBox />} />
            <Route path="/deliveries" element={<DeliveryTracking />} />
            <Route path="/map-route" element={<MapWithOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
