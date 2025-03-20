import { Card } from "@/components/ui/card";

// Mapping numeric order statuses to user-friendly labels
const orderStatusLabels = {
  1: "Pending",
  2: "Confirmed",
  3: "On Delivery",
  4: "Canceled",
};

const OrderItem = ({ order }) => {
  const statusText = orderStatusLabels[order.orderStatus] || "Unknown";

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">
            Order ID: {order.orderID}{" "}
            <span className="text-blue-500">({statusText})</span>
          </p>
          <p className="text-sm text-gray-500">
            Placed on: {new Date(order.orderDate).toLocaleDateString()} |
            Arriving: {new Date(order.receiveDate).toLocaleDateString()}
          </p>
        </div>
        <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
      </div>

      <div className="self-stretch p-2 bg-slate-100 rounded-lg inline-flex justify-center items-center gap-9">
        <div className="flex-1 h-14 relative">
          <div className="w-14 h-14 left-0 top-0 absolute bg-white rounded-lg">
            {" "}
            <img
              src={order.image || "https://placehold.co/600?text=No+image"}
              alt=""
            />{" "}
          </div>
          <div className="h-14 py-2 left-[70px] top-0 absolute inline-flex flex-col justify-between items-start">
            <div className="justify-start text-slate-700 text-sm font-medium  leading-none">
              {order.productName}
            </div>
            <div className="justify-start text-slate-700 text-sm font-medium  leading-none">
              {order.weight} lbs
            </div>
          </div>
        </div>
        <div className="justify-start text-slate-700 text-sm font-medium leading-none">
          {order.quantity}
        </div>
        <div className="justify-start text-slate-700 text-sm font-medium  leading-none">
          ${order.totalAmount}
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
