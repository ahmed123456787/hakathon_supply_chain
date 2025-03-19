import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product_Details from "./components/ProduciDetails";
import Product from "./pages/Product";
import Support from "./pages/Support";
import MyCart from "./components/MyCart";
import MyOrders from "./pages/MyOrders";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header
          cartCount={cart.length}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1 p-5  overflow-y-auto">
          <Routes>
            <Route path="/product-detail" element={<Product />} />
            <Route path="/" element={<Home isModalOpen={isCartOpen} setIsModalOpen={setIsCartOpen} addToCart={addToCart}/>} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/product" element={<Product_Details />} />
            <Route path="/support" element={<Support />} />
            <Route path="/orders" element={<MyOrders />} />
          </Routes>
        </div>
        {isCartOpen && (
          <MyCart
            initialCartItems={cart}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
