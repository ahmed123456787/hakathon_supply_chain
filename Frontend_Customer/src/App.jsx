import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Product_Details from "./components/ProduciDetails";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Support from "./pages/Support";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1  overflow-y-auto">
          <Routes>
            <Route path="/product-detail" element={<Product />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<Product_Details />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
