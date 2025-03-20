import { Button } from "@/components/ui/button";
import React from "react";
import StarRating from "./StarRating";

function Product_Details({ title, price, rating, totalRatings, desc, image }) {
  return (
    <div className="flex flex-wrap justify-between w-full p-5">
      {/* Left Section - Product Info */}
      <div className="flex flex-col w-full md:w-[50%] space-y-3">
        {/* Product Title */}
        <h2 className="text-2xl font-semibold">{title}</h2>

        {/* Star Rating */}
        <StarRating rating={rating} totalRatings={totalRatings} />

        {/* Price */}
        <p className="text-2xl font-bold mt-2">
          ${price ? price.toFixed(2) : "00.00"}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Buy Now
          </Button>
          <Button variant="outline" className="border px-6 py-3 rounded-lg">
            Add to Cart
          </Button>
        </div>

        {/* Description */}
        <div className="p-3 text-gray-700 text-sm">
          <p>{desc || "No description available."}</p>
        </div>
      </div>

      {/* Right Section - Product Image */}
      <div className="flex justify-center items-center w-full md:w-[50%]">
        <img
          src={image || "https://placeholder.co/300"}
          alt={title}
          className="max-w-[300px] h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}

export default Product_Details;
