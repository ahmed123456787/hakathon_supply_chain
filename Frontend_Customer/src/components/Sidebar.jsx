import { Card } from "@/components/ui/card";
import { Box, Heart, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Card className="p-4 w-80 ">
      <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
      <ul className="space-y-2">
        <li className="flex space-x-5">
          <Box />{" "}
          <Link to="/orders" className="text-blue-500">
            My Orders
          </Link>
        </li>
        <li className="flex space-x-5">
          <MapPin />
          <Link to="/addresses">My Addresses</Link>
        </li>
        <li className="flex space-x-5">
          <User />
          <Link to="/account">My Account</Link>
        </li>
        <li className="flex space-x-5">
          <Heart />
          <Link to="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </Card>
  );
};

export default Sidebar;
