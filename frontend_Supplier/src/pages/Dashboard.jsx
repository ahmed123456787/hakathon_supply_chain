import Robo from "../assets/Robo.svg";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { getRevenues } from "../api/productApi";
import CardStat from "../myComponents/CardStat";
import { Bell } from "lucide-react";
import Notification from "../myComponents/Notification";

const DashboardPage = () => {
  const [revenue, setReveunue] = useState({
    totalRevenue: 0,
    revenuePercentage: 0,
    currentSales: 0,
    salesPercentage: 0,
    currentTodaySales: 0,
    todaySalesPercentage: 0,
  });

  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const toggleNotification = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const revenueData = await getRevenues(); // Fetch API data
        console.log(revenueData);
        setReveunue({
          totalRevenue: revenueData.currentTotalRevenue,
          revenuePercentage: revenueData.revenuePercentage,
          currentSales: revenueData.currentSales,
          currentTodaySales: revenueData.currentTodaySales,
          todaySalesPercentage: revenueData.todaySalesPercentage,
          salesPercentage: revenueData.salesPercentage,
        }); //
      } catch (error) {
        console.error("Error fetching revenues:", error);
        setTotalRevenues(0); // Fallback in case of error
      }
    };

    fetchSales();
  }, []);

  // Move `data` inside the component so it gets updated dynamically
  const data = [
    {
      title: "Total Revenue",
      value:
        revenue.totalRevenue !== null
          ? `$${revenue.totalRevenue}`
          : "Loading...",
      percentage: `+${revenue.revenuePercentage}% from last month`,
      icon: (
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      ),
    },
    {
      title: "Sales",
      value: revenue.currentSales,
      percentage: `${revenue.salesPercentage}% from last month`,
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    {
      title: "Today Sales",
      value: "+123",
      percentage: `${revenue.todaySalesPercentage}%+ from last month`,
      icon: (
        <>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </>
      ),
    },
  ];

  return (
    <div className="hidden flex-col md:flex bg-gray-100">
      <div>
        <div className="flex flex-col justify-start space-y-3 py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-4xl">Welcome Ahmed</h1>
              <h5 className="font-bold text-gray-500">Dashboard</h5>
            </div>
            <Bell
              className="flex justify-end cursor-pointer"
              onClick={toggleNotification}
            />
            <Notification
              isVisible={isNotificationVisible}
              onClose={() => setNotificationVisible(false)}
            />
          </div>
        </div>
        <div className="bg-slate-300 rounded-lg px-5 flex justify-around items-center">
          <div className="flex flex-col justify-center items-start space-y-7">
            <h1 className="text-4xl font-bold">AI product recommendation.</h1>
            <button className="bg-slate-900 rounded-md text-white h-15 w-25 p-2 font-bold">
              Let's Go
            </button>
          </div>
          <div>
            <img src={Robo} alt="AI" className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-3 w-[130%] gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.map((stat, index) => (
                <CardStat key={index} stat={stat} />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
