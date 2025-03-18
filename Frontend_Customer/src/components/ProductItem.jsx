import React from "react";

export default function ProductItem({ name, quantity, price }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500">1x Box</p>
      </div>
      <p className="font-semibold">{price}</p>
    </div>
  );
}
