import React from "react";
import { HeartIcon, PlusIcon } from "lucide-react";

const product = {
  name: "Red Hat",
  href: "#",
  image: "https://bundui-images.netlify.app/products/04.jpeg",
  price: "$28",
  category: "Clothing"
};

export default function ProductCard() {
  return (
    <div className="w-[300px] group relative space-y-4">
      <figure className="group-hover:opacity-90">
        <img
          className="w-full rounded-lg aspect-square"
          src={product.image}
          alt={product.name}
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">
            <a href={product.href}>{product.name}</a>
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-lg font-semibold">{product.price}</p>
      </div>
      <div className="flex gap-4">
        <button className="border border-gray-300 rounded-md p-2 flex-shrink-0">
          <HeartIcon className="w-4 h-4" />
        </button>
        <button className="border border-gray-300 rounded-md p-2 flex items-center w-full">
          <PlusIcon className="w-4 h-4 mr-1 " /> Add to Cart
        </button>
      </div>
    </div>
  );
}
