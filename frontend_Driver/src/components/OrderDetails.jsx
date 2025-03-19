import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const OrderDetail = ({ order }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Information */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium text-gray-800">#{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium text-gray-800">{order.customer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-medium text-gray-800">{order.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge className="px-3 py-1 rounded-full text-sm">
              {order.status}
            </Badge>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">Driver</p>
            <p className="font-medium text-gray-800">{order.driver}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium text-gray-800">{order.amount}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-100"></div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-lg">
          Print Receipt
        </Button>
        <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
          Contact Driver
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
