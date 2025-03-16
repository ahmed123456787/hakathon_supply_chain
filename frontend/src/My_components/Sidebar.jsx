import React from "react";
import {
  LayoutDashboard,
  Package,
  MessageCircle,
  Truck,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0]; // Deux premières lettres des deux mots
    } else {
      return name.slice(0, 2).toUpperCase(); // Deux premières lettres du seul mot
    }
  };
  
const user = {
    name: "Supplier",
    email: "Supplier@gmail.com",
  };
const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
  {
    name: "Product Management",
    icon: <Package size={20} />,
    path: "/inventory-managment",
  },
  { name: "AI Agent", icon: <MessageCircle size={20} />, path: "/ai-agent" },
  { name: "Delivery Tracking", icon: <Truck size={20} />, path: "/tracking" },
  {
    name: "Settings & Profile",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];
function Sidebar() {
  return (
    <aside className="h-screen w-[18%] flex flex-col justify-between">
      <nav className="flex flex-col">
        <div className="bg-slate-900 rounded-xl p-5 my-5 mx-2 text-white flex flex-col  space-y-1 justify-center items-start">
          <h1 className="font-bold text-xl">AI Supply Chain</h1>
          <h5 className="">SALAM HACK</h5>
        </div>
        <ul className="space-y-5 p-5">
          {menuItems.map((item, index) => (
            <li key={index} className="flex justify-between cursor-pointer">
              <Link to={item.path}>
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              </Link>
              <ChevronRight size={18} className="text-gray-400" />
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-3 border-t flex items-center gap-3">
        {/* Avatar avec initiales */}
        <div className="w-10 h-10 bg-gray-200 text-slate-900 flex items-center justify-center rounded-full ">
          {getInitials(user.name)}
        </div>
        {/* Nom et email */}
        <div>
          <p className="font-bold text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-900">{user.email}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
