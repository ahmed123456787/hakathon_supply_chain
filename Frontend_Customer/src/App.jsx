import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Product_Details from "./components/ProductDetails";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Support from "./pages/Support";
import MyCart from "./components/MyCart";
import MyOrders from "./pages/MyOrders";

function App() {
<<<<<<< HEAD
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
=======
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
>>>>>>> 614d5397b266dec6f78f4b01a8afc3aac9445fe0

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1  overflow-y-auto">
          <Routes>
            <Route path="/product-detail" element={<Product />} />
<<<<<<< HEAD
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/support" element={<Support />} />
=======
            <Route path="/" element={<Home isModalOpen={isCartOpen} setIsModalOpen={setIsCartOpen} addToCart={addToCart}/>} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/product" element={<Product_Details />} />
            <Route path="/support" element={<Support />} />
            <Route path="/orders" element={<MyOrders />} />
>>>>>>> 614d5397b266dec6f78f4b01a8afc3aac9445fe0
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
