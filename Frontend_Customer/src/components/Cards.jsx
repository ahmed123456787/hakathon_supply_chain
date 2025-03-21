import { HeartIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="w-[300px] group relative space-y-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <figure className="relative overflow-hidden rounded-lg">
        <img
          className="w-full h-64 object-center transition-transform duration-300 group-hover:scale-105"
          src={
            product.image ||
            "https://placehold.co/600?text=No+image"
          }
          alt={product.prodcutName || "Product Image"}
        />
      </figure>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            <Link
              to={`/product/${product.productID}`}
              state={{ product }}
              className="hover:underline"
            >
              {product.prodcutName || "Unnamed Product"}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">
            {product.category || "Uncategorized"}
          </p>
        </div>
        <p className="text-lg font-semibold">${product.price}</p>
      </div>
      <div className="flex gap-4 ">
        <button className="border border-gray-300 rounded-md p-2 flex-shrink-0">
          <HeartIcon className="w-4 h-4" />
        </button>
        <button
          className="border border-gray-300 rounded-md p-2 flex items-center w-full cursor-pointer hover:bg-black/80 hover:text-white"
          onClick={() => addToCart(product)}
        >
          <PlusIcon className="w-4 h-4 mr-1 " /> Add to Cart
        </button>
      </div>
    </div>
  );
}
