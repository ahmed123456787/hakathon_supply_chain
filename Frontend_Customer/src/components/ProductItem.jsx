import React from "react";

export default function ProductItem({ item, onIncrease, onDecrease }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
      <div className="flex flex-col">
        <p className="font-semibold">{item.name}</p>
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={onDecrease}
          >
            -
          </button>
          <span className="text-gray-500">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}
