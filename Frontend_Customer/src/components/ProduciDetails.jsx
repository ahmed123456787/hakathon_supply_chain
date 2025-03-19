import { Button } from "@/components/ui/button";
import React from "react";
import camera from "../assets/Camera.svg";
import StarRating from "../components/StarRating";
function Product_Details({ title, price, rating, totalRatings, desc }) {
  return (
    <div className="flex  justify-between w-full">
      <div className="p-5  flex flex-col w-[50%] space-y-2">
        {/* Product Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Star Rating */}
        <StarRating rating={rating} totalRatings={totalRatings} />
        {/* Price */}
        <p className="text-xl font-bold mt-2">${price?.toFixed(2) ?? "00.0"}</p>
        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <Button className=" text-white px-4 py-2 rounded-md">Buy Now</Button>
          <Button variant="outline" className="border px-4 py-2 rounded-md">
            Add to Cart
          </Button>
        </div>
        <div className="p-3 text-sm">
          <p>{desc}</p>
        </div>
        <div></div>
      </div>
      <div>
        <img src={camera} alt="" className="p-5" />
      </div>
    </div>
  );
}

export default Product_Details;
