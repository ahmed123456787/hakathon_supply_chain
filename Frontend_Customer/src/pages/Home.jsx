import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import Deals_Logo from "../assets/discount-percent-fill.svg";
import Payment_Logo from "../assets/secure-payment-fill.svg";
import Traffic_Logo from "../assets/truck-fill.svg";
import youngMen from "../assets/young-man.svg";
import ProductCard from "../components/Cards";
import Footer from "../components/Footer";
import MyCart from "../components/MyCart";
import Property from "../components/Property";

function Home({ isModalOpen, setIsModalOpen, addToCart }) {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getAllProducts();
        const shuffled = products.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const Property_data = [
    {
      id: 1,
      icon: Payment_Logo,
      name: "Secure Checkout & Support",
      desc: "Shop with Confidence – Secure & Safe!",
    },
    {
      id: 2,
      icon: Traffic_Logo,
      name: "Fast & Free Shipping",
      desc: "Hassle-Free Shipping, Every Time!",
    },
    {
      id: 3,
      icon: Deals_Logo,
      name: "Best Deals & Discounts",
      desc: "Shop More, Save More!",
    },
  ];

  return (
    <div className="flex flex-col align-center justify-center">
      <div className="flex align-items justify-center rounded-lg bg-soft-gray mt-5">
        <div className="flex flex-col justify-center items-start space-y-5 w-[30%]">
          <h1 className="text-4xl font-bold">
            The best deals are waiting for you
          </h1>
          <button className="bg-slate-900 rounded-md text-white h-15 w-25 p-2 font-bold">
            Let's Go
          </button>
        </div>
        <div>
          <img src={youngMen} alt="" className="object-contain w-[650px]" />
        </div>
      </div>
      <div className="flex-col">
        <div className="flex align-items justify-start">
          <h1 className="font-bold text-4xl p-4">🔥Featured Product</h1>
        </div>
        <div className="flex align-items justify-center">
          <div className="grid grid-cols-4 gap-[20px] max-w[1420px]">
            {randomProducts.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} addToCart={()=>addToCart(product)} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start items-center mt-5">
          <h1 className="font-bold text-4xl p-4">🔥New Product</h1>
        </div>
        <div className="flex align-items justify-center">
          <div className="grid grid-cols-4 gap-[20px]">
            {randomProducts.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} addToCart={()=>addToCart(product)} />
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 mt-10 flex justify-between items-center">
          {Property_data.map((item) => (
            <Property
              key={item.id}
              icon={item.icon}
              name={item.name}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
      {isModalOpen && (
        <MyCart
          onclose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Home;
