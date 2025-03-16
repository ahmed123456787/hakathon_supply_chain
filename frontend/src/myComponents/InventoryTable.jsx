import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableActions from "./TableAction";

const InventoryTable = ({ items, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse border border-gray-300">
        <TableHeader className="bg-gray-100 text-left">
          <TableRow>
            <TableHead className="font-bold text-lg border border-gray-300">
              ID
            </TableHead>
            <TableHead className="font-bold text-lg border border-gray-300">
              Item
            </TableHead>
            <TableHead className="font-bold text-lg border border-gray-300">
              Qnt
            </TableHead>
            <TableHead className="font-bold text-lg border border-gray-300">
              Price / Unit
            </TableHead>
            <TableHead className="font-bold text-lg border border-gray-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-lg">
          {items.map((item) => (
            <TableRow key={item.id} className="text-left">
              <TableCell className="border border-gray-300">
                {item.productID}
              </TableCell>
              <TableCell className="border border-gray-300">
                {item.prodcutName}
              </TableCell>
              <TableCell className="border border-gray-300">
                {item.quantity}
              </TableCell>
              <TableCell className="border border-gray-300">
                {item.price} $
              </TableCell>
              <TableCell className="border border-gray-300">
                <TableActions
                  item={item}
                  onEdit={() => onEdit(item.productID)}
                  onDelete={() => onDelete(item.productID)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
