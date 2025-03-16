import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewItemForm from "../My_components/AddItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Pencil, EyeOff, Trash, Plus } from "lucide-react";

const InventoryManagement = () => {
  const [items, setItems] = useState([
    { id: 11300, name: "Torch", quantity: 100, weight: 4, price: 5 },
    { id: 11301, name: "Shoes", quantity: 50, weight: 2, price: 30 },
  ]);
  const [editingItem, setEditingItem] = useState(null); // Stocke l'élément à modifier

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleUpdateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Inventory management</h1>

        <Button
          className="mb-4 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} /> New Item
        </Button>
      </div>
      <br />
      <br />
      <div className="overflow-x-auto ">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader className="bg-gray-100 text-left">
            <TableRow>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                ID
              </TableHead>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                Item
              </TableHead>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                Qnt
              </TableHead>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                Price / Unit
              </TableHead>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                Weight / Unit
              </TableHead>
              <TableHead className="font-bold text-lg text-balck border border-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-lg">
            {items.map((item) => (
              <TableRow key={item.id} className="text-left">
                <TableCell className="border border-gray-300">
                  {item.id}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {item.name}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {item.quantity}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {item.price} $
                </TableCell>
                <TableCell className="border border-gray-300">
                  {item.weight} kg
                </TableCell>
                <TableCell className="border border-gray-300  flex justify-start">
                  <div className="">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-1 bg-white text-gray-800"
                    >
                      <ExternalLink size={16} /> {/* Icône Voir (↗️) */}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-1 bg-white text-gray-800"
                      onClick={() => handleEdit(item)} 
                    >
                      <Pencil size={16} /> {/* Icône Modifier (✏️) */}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-1 bg-white text-gray-800"
                    >
                      <EyeOff size={16} /> {/* Icône Désactiver (œil barré) */}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-1 bg-white text-gray-800"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash size={16} className="" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isModalOpen && (
          <NewItemForm
            className=""
            onClose={() => setIsModalOpen(false)}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem} 
            editingItem={editingItem} 
          />
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
