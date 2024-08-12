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
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPartial() {
  const [stats, setStats] = useState<any>([]);

  // [
  //   {
  //     total_patients: 299712,
  //     total_hospital_admissions: 431231,
  //     total_transfers: 1890972,
  //     total_diagnosis_made: 109282,
  //     average_length_of_icu_stay_days: 3.4519307599257583,
  //     total_icu_admission: 73181,
  //   },
  // ];
  useEffect(() => {
    // fetch(process.env.NEXT_PUBLIC_API_URL + `/icu_patients`)
    fetch(SERVER_URL + `/get_major_stats`)
      .then((response) => response.json())
      .then((data) => {
        setStats(data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-9em)]">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-5">
          <div className="flex items-center justify-between space-y-2">
            {/* <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2> */}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Patients
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
                <div className="text-2xl font-bold">{stats.total_patients}</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hospital Admissions
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
              <div className="text-2xl font-bold">{stats.total_hospital_admissions}</div>
                <p className="text-xs text-muted-foreground">
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transfers</CardTitle>
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
                <div className="text-2xl font-bold">{stats.total_transfers}</div>
                <p className="text-xs text-muted-foreground">
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Diagnoses
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
                <div className="text-2xl font-bold">{stats.total_diagnosis_made}</div>
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
                <CardTitle>ICU Patients ({stats.total_icu_admission})</CardTitle>
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
