import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Sidebar from "../components/Sidebar";
import OrderItem from "../components/OrderItem";
import deliveryMen from "../assets/delivery-men.svg";
import Footer from "../components/Footer";

const orders = [
  { id: "22345619", status: "Confirmed", date: "2025-03-14", arrival: "Today", total: 1038 },
  { id: "22345618", status: "Pending", date: "2025-03-10", arrival: "Tomorrow", total: 540 },
  { id: "22345617", status: "On Delivery", date: "2025-03-08", arrival: "In 2 days", total: 250 },
  { id: "22345616", status: "Canceled", date: "2025-03-05", arrival: "Never", total: 0 },
];

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  // Fonction de filtrage
  const filteredOrders =
    selectedTab === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase().replace(" ", "-") === selectedTab);

  return (
    <div className="flex-col">
      {/* Bannière */}
      <div className="flex justify-evenly items-center rounded-lg bg-soft-gray mt-5 mb-10 ">
        <div className="flex flex-col justify-center items-start space-y-5 w-[30%]">
          <h1 className="text-5xl font-extrabold ">My Orders</h1>
        </div>
        <div>
          <img src={deliveryMen} alt="" className="object-contain w-[650px]" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex p-6 space-x-6">
        <Sidebar />
        <div className="w-full space-y-5">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="space-y-5 flex-col">
              {/* Tabs */}
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="on-delivery">On Delivery</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>

              {/* Contenu filtré */}
              <TabsContent value={selectedTab}>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => <OrderItem key={order.id} order={order} />)
                ) : (
                  <p className="text-gray-500 text-center mt-4">No orders found.</p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
