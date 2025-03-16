import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InventoryTable from "./../myComponents/InventoryTable";
import NewItemForm from "../myComponents/AddItem";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../api/productApi";

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    const item = items.find((item) => item.productID === id);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = async (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productID === updatedItem.productID ? updatedItem : item
      )
    );
    await updateProduct(updatedItem.productID, updatedItem);
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setItems(items.filter((item) => item.productID !== id));
  };

  const handleAddItem = async (newItem) => {
    await addProduct(newItem);
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
        <Button
          className="mb-4 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          + New Item
        </Button>
      </div>
      <InventoryTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <NewItemForm
          onClose={() => setIsModalOpen(false)}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
