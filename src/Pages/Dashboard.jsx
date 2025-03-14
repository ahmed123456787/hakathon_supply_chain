import { Button } from "@/components/ui/button";
import Robo from "../assets/Robo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { MainNav } from "@/components/main-nav";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div>
          <div className=" flex flex-col  justify-start space-y-3 py-4 px-6">
            <h1 className="font-bold text-4xl">Welcome Ahmed</h1>
            <h5 className="font-bold text-gray-500">Dashboard</h5>
          </div>
          <div className="bg-slate-300 rounded-lg px-5 flex justify-around items-center">
            <div className="flex flex-col justify-center items-start space-y-7 ">
              <h1 className="text-4xl font-bold ">
                AI product recommendation.
              </h1>
              <button className="bg-slate-900 rounded-md text-white h-15 w-25 p-2 font-bold ">
                Let's Go
              </button>
            </div>
            <img src={Robo} alt="AI" className="" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Total Revenue",
                    value: "$45,231.89",
                    percentage: "+20.1% from last month",
                    icon: (
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    ),
                  },
                  {
                    title: "Subscriptions",
                    value: "+2350",
                    percentage: "+180.1% from last month",
                    icon: (
                      <>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </>
                    ),
                  },
                  {
                    title: "Sales",
                    value: "+12,234",
                    percentage: "+19% from last month",
                    icon: (
                      <>
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </>
                    ),
                  },
                  {
                    title: "Active Now",
                    value: "+573",
                    percentage: "+201 since last hour",
                    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
                  },
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        {stat.icon}
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.percentage}
                      </p>
                    </CardContent>
                  </Card>
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
    </>
  );
}
