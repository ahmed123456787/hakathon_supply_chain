import { useState } from "react";
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
import { ExternalLink, EyeOff, Trash } from "lucide-react";

const orders = [
  {
    id: 922,
    customer: "Floyd Miles",
    amount: "$396.84",
    date: "5/7/16",
    status: "Completed",
    driver: "Eleanor Pena",
  },
  {
    id: 274,
    customer: "Esther Howard",
    amount: "$293.01",
    date: "7/27/13",
    status: "Completed",
    driver: "Marvin McKinney",
  },
  {
    id: 877,
    customer: "Eleanor Pena",
    amount: "$450.54",
    date: "6/19/14",
    status: "Completed",
    driver: "Albert Flores",
  },
  {
    id: 536,
    customer: "Jenny Wilson",
    amount: "$576.28",
    date: "9/18/16",
    status: "Returned",
    driver: "Darlene Robertson",
  },
  {
    id: 540,
    customer: "Marvin McKinney",
    amount: "$406.27",
    date: "5/19/12",
    status: "Completed",
    driver: "Esther Howard",
  },
  {
    id: 423,
    customer: "Kathryn Murphy",
    amount: "$446.61",
    date: "8/15/17",
    status: "Delivering",
    driver: "Robert Fox",
  },
];

const statusColors = {
  Completed: "bg-green-500",
  Returned: "bg-red-500",
  Delivering: "bg-yellow-500",
};

export default function DeliveryTracking() {
  const [data, setData] = useState(orders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setData(data.filter((order) => order.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Delivery Tracking</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        {["All", "1 Month", "3 Months", "1 Year"].map((filter) => (
          <Button key={filter} variant="outline">
            {filter}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[order.status]} text-white`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.driver}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ExternalLink size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <EyeOff size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(order.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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
