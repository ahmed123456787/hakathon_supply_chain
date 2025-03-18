import React from "react";
import Product_Details from "../components/ProduciDetails";
import ProductCard from "../components/Cards";
import Footer from "../components/Footer";

function Product() {
  return (
    <div>
      <Product_Details
        title="Smartphone X"
        price={999.99}
        rating={4.5}
        totalRatings={1200}
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <div className=" flex justify-start items-center mt-5">
        <h1 className=" font-bold text-4xl p-4">🔥 Similar Product</h1>
      </div>
      <div className="flex space-x-5  items-center mt-5  overflow-auto scrollbar-hidden px-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-[300px]">
            <ProductCard />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
