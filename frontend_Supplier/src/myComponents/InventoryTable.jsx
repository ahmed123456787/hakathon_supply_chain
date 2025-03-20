import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const InventoryTable = ({ items, onEdit, onDelete }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-semibold text-base">ID</TableHead>
              <TableHead className="font-semibold text-base">Item</TableHead>
              <TableHead className="font-semibold text-base">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-base">
                Price / Unit
              </TableHead>
              <TableHead className="font-semibold text-base">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.productID}>
                <TableCell>{item.productID}</TableCell>
                <TableCell>{item.prodcutName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item.productID)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item.productID)}
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
