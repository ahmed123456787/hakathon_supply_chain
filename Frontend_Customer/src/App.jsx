import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MyCart from "./components/MyCart";
import Product_Details from "./components/ProductDetails";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Support from "./pages/Support";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cartCount={cart.length}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Contenu principal (dashboard et autres pages) */}
        <div className="flex-1  overflow-y-auto">
          <Routes>
            <Route path="/product-detail" element={<Product />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/"
              element={
                <Home
                  isModalOpen={isCartOpen}
                  setIsModalOpen={setIsCartOpen}
                  addToCart={addToCart}
                />
              }
            />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/product-detail" element={<Product />} />
            <Route path="/product" element={<Product_Details />} />
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
