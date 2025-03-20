import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, EyeOff, Trash } from "lucide-react";
import OrderDetail from "../components/OrderDetails";
import { getAllOrders } from "../api/dirverApi";

export default function DeliveryTracking() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const fetchedOrders = await getAllOrders();
        setOrders(fetchedOrders);
        console.log(fetchedOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    })();
  }, []);

  const orderStatusMap = {
    1: "Delivering",
    2: "Completed",
    3: "Returned",
  };

  const statusColors = {
    Delivering: "bg-yellow-500",
    Completed: "bg-green-500",
    Returned: "bg-red-500",
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const displayedData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.orderID !== id));
  };

  const handleToggleOrderDetail = (order) => {
    setSelectedOrder(selectedOrder?.orderID === order.orderID ? null : order);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Delivery Orders</h1>

      {selectedOrder && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <OrderDetail
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          </div>
        </div>
      )}

      <div className="overflow-y-auto max-h-[400px] bg-white rounded-lg shadow-md">
        <Table className="border border-gray-300">
          <TableHeader className="bg-gray-100 border-b border-gray-300">
            <TableRow>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                ID
              </TableHead>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                Customer
              </TableHead>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                Address
              </TableHead>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                Phone number
              </TableHead>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                Order Date
              </TableHead>
              <TableHead className="border-r border-gray-300 font-bold text-lg">
                Status
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedData.map((order) => (
              <TableRow
                key={order.orderID}
                className="border-b border-gray-300"
              >
                <TableCell className="border-r border-gray-300">
                  {order.orderID}
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  {order.customerName}
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  {order.address}
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  {order.phoneNumber}
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  {new Date(order.orderDate).toISOString().split("T")[0]}
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  <Badge
                    className={`${
                      statusColors[orderStatusMap[order.orderStatus]]
                    } text-white`}
                  >
                    {orderStatusMap[order.orderStatus]}
                  </Badge>
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ExternalLink size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleOrderDetail(order)}
                  >
                    {selectedOrder?.orderID === order.orderID ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(order.orderID)}
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
}
