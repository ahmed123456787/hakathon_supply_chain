import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { fr } from "date-fns/locale";

const NewItemForm = ({ onClose, onAddItem, onUpdateItem, editingItem=null }) => {
  const [formData, setFormData] = useState(
    editingItem || {
      id:null,
      name: "",
      quantity: "",
      price: "",
      weight: "",
      description: "",
      primaryImage: null,
      secondaryImages: [null],
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "primary") {
      setFormData({ ...formData, primaryImage: file });
    } else {
      setFormData({
        ...formData,
        secondaryImages: [...formData.secondaryImages, file],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateItem(formData);
      onClose();
    } else {
      if (
        !formData.name ||
        !formData.quantity ||
        !formData.price ||
        !formData.weight
      ) {
        alert("Product Name, Quantity,Weight, and Price are required!");
        return;
      }
      onAddItem({ ...formData });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-100 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4  text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold text-center ">
          {editingItem ? "Edit Item" : "New Item"}
        </h2>

        {/* Primary Image Upload */}
        <div className="flex   flex-col ">
          <label className="block font-semibold text-lg">Primary Image</label>
          <div className="flex justify-between items-center ">
            <p className="text-xsm text-gray-500 w-[80%] ">
              Choose a high-quality image to showcase your product at its best!
            </p>

            <div className="w-20 h-20 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100">
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
            onChange={(e) => handleFileChange(e, "primary")}
          />
        </div>

        {/* Product Fields */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-slate-900 ">
            Product Name
          </label>
          <Input
            name="name"
            placeholder="E.g. Samsung S25 Ultra 5G"
            value={formData.name}
            className="mb-2"
            onChange={handleChange}
          />
          <label htmlFor="quantity" className="text-slate-900 mb-3">
            Quantity
          </label>
          <Input
            name="quantity"
            type="number"
            placeholder="20"
            value={formData.quantity}
            className="mb-2 flex justify-between"
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <Input
            name="price"
            type="number"
            placeholder="E.g.50 USD"
            value={formData.price}
            className="mb-2 "
            onChange={handleChange}
          />
          <label htmlFor="weight"> Weight</label>
          <Input
            name="weight"
            type="number"
            placeholder="E.g. 200"
            value={formData.weight}
            className="mb-2"
            onChange={handleChange}
          />
          <label htmlFor="description"> Description</label>
          <Textarea
            name="description"
            placeholder="Type your description here"
            className="mb-3"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Secondary Images Upload */}
          <div className="mb-4">
            <label className="block font-semibold text-slate-900">
              Secondary Images
            </label>
            <div className="flex gap-2">
              {/* {formData.secondaryImages.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt="Secondary"
                  className="w-12 h-12 object-cover rounded-md border"
                />
              ))} */}
              <div className="w-12 h-12 border rounded-md flex items-center justify-center cursor-pointer bg-gray-100">
                <Upload size={20} className="text-gray-400" />
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "secondary")}
              />
            </div>
          </div>

          {/* Buttons */}
          <Button type="submit" className="w-full bg-slate-900 text-white py-2 mb-2" onClick={handleSubmit}>
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
