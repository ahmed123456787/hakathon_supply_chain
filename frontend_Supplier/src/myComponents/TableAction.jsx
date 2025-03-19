import { Button } from "@/components/ui/button";
import { ExternalLink, Pencil, Trash } from "lucide-react";

const TableActions = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex gap-1">
      <Button variant="ghost" size="icon" className="bg-white text-gray-800">
        <ExternalLink size={12} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-white text-gray-800"
        onClick={() => onEdit(item.id)}
      >
        <Pencil size={12} />
      </Button>
      {/* <Button variant="ghost" size="icon" className="bg-white text-gray-800">
        <EyeOff size={16} />
      </Button> */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-white text-gray-800"
        onClick={() => onDelete(item.id)}
      >
        <Trash size={12} />
      </Button>
    </div>
  );
};

export default TableActions;
