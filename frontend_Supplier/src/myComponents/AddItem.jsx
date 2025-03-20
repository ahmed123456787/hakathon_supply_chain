import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";

const NewItemForm = ({
  onClose,
  onAddItem,
  onUpdateItem,
  editingItem = null,
}) => {
  const [formData, setFormData] = useState(
    editingItem || {
      productID: null,
      prodcutName: "",
      quantity: "",
      price: "",
      weight: 0,
      description: "",
      primaryImage: null,
    }
  );

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, primaryImage: file });
    }
  };
  console.log(editingItem)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.prodcutName ||
      !formData.quantity ||
      !formData.price ||
      !formData.weight
    ) {
      alert("Product Name, Quantity, Weight, and Price are required!");
      return;
    }

    const data = new FormData();
    data.append("productID", formData.productID);
    data.append("productName", formData.prodcutName);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("weight", formData.weight);
    data.append("description", formData.description);
    if (formData.primaryImage) {
      data.append("primaryImage", formData.primaryImage);
    }

    if (editingItem) {
      onUpdateItem(data);
    } else {
      onAddItem(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white px-5 py-2 rounded-lg shadow-lg w-100 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold text-center">
          {editingItem ? "Edit Item" : "New Item"}
        </h2>

        {/* Primary Image Upload */}
        <div className="flex flex-col">
          <label className="block font-semibold text-lg">Primary Image</label>
          <div className="flex justify-between items-center">
            <p className="text-xsm text-gray-500 w-[80%]">
              Choose a high-quality image to showcase your product at its best!
            </p>

            <div
              className="w-20 h-20 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100"
              onClick={() => fileInputRef.current.click()}
            >
              {formData.primaryImage ? (
                <img
                  src={URL.createObjectURL(formData.primaryImage)}
                  alt="Primary"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Upload size={24} className="text-gray-400" />
              )}
            </div>
          </div>

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Product Fields */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name</label>
          <Input
            name="productName"
            placeholder="E.g. Samsung S25 Ultra 5G"
            value={formData.productName}
            className="mb-2"
            onChange={handleChange}
          />

          <label htmlFor="quantity">Quantity</label>
          <Input
            name="quantity"
            type="number"
            placeholder="20"
            value={formData.quantity}
            className="mb-2"
            onChange={handleChange}
          />

          <label htmlFor="price">Price</label>
          <Input
            name="price"
            type="number"
            placeholder="E.g. 50 USD"
            value={formData.price}
            className="mb-2"
            onChange={handleChange}
          />

          <label htmlFor="weight">Weight</label>
          <Input
            name="weight"
            type="number"
            placeholder="E.g. 200g"
            value={formData.weight}
            className="mb-2"
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <Textarea
            name="description"
            placeholder="Type your description here"
            className="mb-3"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Buttons */}
          <Button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 mb-4"
          >
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
          <Button
            className="w-full bg-gray-200 text-slate-900 py-2"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewItemForm;
