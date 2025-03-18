import React from "react";
import ProductItem from "./ProductItem";
import { X } from "lucide-react";
function MyCart({onclose}) {
  const cartItems = [
    { name: "Product Name", quantity: 1, price: "$140.0" },
    { name: "Product Name", quantity: 1, price: "$140.0" },
    { name: "Product Name", quantity: 1, price: "$140.0" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg w-[50%] max-h-[90%] overflow-y-auto scrollbar-hidden">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">My Cart</h1>
          <X onClick={onclose}/>
        </div>

        {/* Customer Information */}
        <div className="mb-0.5 text-sm">
          <p className="text-gray-700">
            Customer: <span className="font-semibold">Maria McClusky</span>
          </p>
          <p className="text-gray-700">maria.mcclusky@example.com</p>
          <p className="text-gray-700">+44 1416 777777</p>
        </div>

        {/* Cart Items */}
        <h2 className="text-lg font-semibold mb-0.5">Items</h2>
        <div className="space-y-1">
          {cartItems.map((item, index) => (
            <ProductItem key={index} {...item} />
          ))}
        </div>

        {/* Payment Details */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-2">Payment</h2>
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">$280.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="font-semibold">$10.0</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">$290.0</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-0.5">Address</h2>
          <input
            type="text"
            placeholder="St 212 93th Street No. 28/29 Axis, Mexico 9555"
            className="p-1 w-full border rounded"
          />
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-between">
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg">
            Clear
          </button>
          <button className="px-3 py-1 bg-black text-white rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
