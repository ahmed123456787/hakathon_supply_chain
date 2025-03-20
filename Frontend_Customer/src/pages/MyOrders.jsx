import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getCustomerOrder } from "../api/ordersApi";
import deliveryMen from "../assets/delivery-men.svg";
import Footer from "../components/Footer";
import OrderItem from "../components/OrderItem";
import Sidebar from "../components/Sidebar";

// Mapping numeric order statuses to string labels
const orderStatusMap = {
  1: "pending",
  2: "confirmed",
  3: "on-delivery",
  4: "canceled",
};

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getCustomerOrder(1);
        console.log("Fetched Orders:", fetchedOrders); // Debugging
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtering orders based on the selected tab
  const filteredOrders = Array.isArray(orders)
    ? selectedTab === "all"
      ? orders
      : orders.filter((order) => {
          const statusText = orderStatusMap[order.orderStatus]?.toLowerCase() || "unknown";
          console.log("Order Status:", order.orderStatus, "Mapped Status:", statusText);
          return statusText === selectedTab;
        })
    : [];

  return (
    <div className="flex-col">
      {/* Header Section */}
      <div className="flex justify-evenly items-center rounded-lg bg-soft-gray mt-5 mb-10">
        <div className="flex flex-col justify-center items-start space-y-5 w-[30%]">
          <h1 className="text-5xl font-extrabold">My Orders</h1>
        </div>
        <div>
          <img src={deliveryMen} alt="Delivery Men" className="object-contain w-[650px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-6 space-x-6">
        <Sidebar />
        <div className="w-full space-y-5">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="space-y-5 flex-col">
              {/* Tabs Navigation */}
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="on-delivery">On Delivery</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>

              {/* Orders Display */}
              <TabsContent value={selectedTab}>
                {loading ? (
                  <p className="text-gray-500 text-center mt-4">Loading orders...</p>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => <OrderItem key={order.orderID} order={order} />)
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
