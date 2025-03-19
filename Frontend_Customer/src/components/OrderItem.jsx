import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderItem = ({ order }) => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">
            Order ID: {order.id}{" "}
            <span className="text-blue-500">{order.status}</span>
          </p>
          <p className="text-sm text-gray-500">
            Placed on: {order.date} | Arrived in: {order.arrival}
          </p>
        </div>
        <p className="font-semibold">${order.total.toFixed(2)}</p>
      </div>
      <Button variant="outline" className="mt-2">
        Details
      </Button>
    </Card>
  );
};

export default OrderItem;
