"use client";

import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarChart from "@/partials/dashboard/BarChart";
import ICUPatientList from "@/partials/dashboard/ICUPatientList";

// import { CalendarDateRangePicker } from "@/components/components/date-range-picker";
// import { MainNav } from "@/components/components/main-nav";
// import { Overview } from "@/components/components/overview";
// import { RecentSales } from "@/components/components/recent-sales";
// import { Search } from "@/components/components/search";
// import TeamSwitcher from "@/components/components/team-switcher";
// import { UserNav } from "@/components/components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPartial() {
  return (
    <div className="w-full min-h-[calc(100vh-9em)]">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-5">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
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
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 p-4">
              <Tabs defaultValue={"admin_loc"} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="admin_loc">
                    Admission Locations
                  </TabsTrigger>
                  <TabsTrigger value="diagnosed_codes">
                    Diagnosed Codes
                  </TabsTrigger>
                  <TabsTrigger value="care_units">Care Units</TabsTrigger>
                </TabsList>
                <TabsContent value="admin_loc" className="space-y-4">
                  <CardContent className="pl-2">
                    <BarChart
                      pathName="/admission_locations"
                      fieldName="admission_location"
                    />
                  </CardContent>
                </TabsContent>
                <TabsContent value="diagnosed_codes" className="space-y-4">
                  <CardContent className="pl-2">
                    <BarChart
                      pathName="/diagnosed_codes?limit=10"
                      fieldName="long_title"
                    />
                  </CardContent>
                </TabsContent>
                <TabsContent value="care_units" className="space-y-4">
                  <CardContent className="pl-2">
                    <BarChart
                      pathName="/care_units?limit=10"
                      fieldName="careunit"
                    />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>ICU Patients</CardTitle>
              </CardHeader>
              <div className="h-[calc(7*4rem)] overflow-y-auto">
                <ICUPatientList />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
