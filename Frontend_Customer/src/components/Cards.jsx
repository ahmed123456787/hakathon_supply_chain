import { HeartIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] group relative space-y-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <figure className="relative overflow-hidden rounded-lg">
        <img
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          src={
            product.image ||
            "https://bundui-images.netlify.app/products/04.jpeg"
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
        <p className="text-lg font-bold text-gray-900">
          {product.price ? `$${product.price}` : "N/A"}
        </p>
      </div>

      <div className="flex gap-4">
        <button className="border border-gray-300 rounded-md p-2 flex-shrink-0 hover:bg-gray-100 transition-colors">
          <HeartIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button className="border border-gray-300 rounded-md p-2 flex items-center w-full text-zinc-950  transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
