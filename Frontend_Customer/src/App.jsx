import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product_Details from "./components/ProduciDetails";
import Product from "./pages/Product";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1 p-5  overflow-y-auto">
          <Routes>
            <Route
              path="/product-detail"
              element={
                <Product/>
              }
            />
            <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<Product_Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
