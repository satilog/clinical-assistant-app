"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// import 'tailwindcss/tailwind.css';

export default function LabEventsChart({ id }: { id: any }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentFluid, setCurrentFluid] = useState("");

console.log(id)
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL + `/subject_lab_events?subject_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const uniqueLabels: any = [
          ...new Set(data.map((item: any) => item.label)),
        ];
        setLabels(uniqueLabels);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (selectedLabel) {
      const filtered: any = data.filter(
        (item: any) => item.label === selectedLabel
      );
      setFilteredData(filtered);
      if (filtered.length > 0) {
        setCurrentCategory(filtered[0].category);
        setCurrentFluid(filtered[0].fluid);
      }
    }
  }, [selectedLabel, data]);

  return (
    <Card className="w-full bg-white shadow-md rounded-lg w-full max-h-[calc((100vh-15em)/2)]">
      <CardHeader>
        <CardTitle>Lab Event Data</CardTitle>
        <p className="text-sm">Longest 10 stays</p>
      </CardHeader>
      <div className="h-96 overflow-y-auto">
        <div className="container mx-auto p-4">
          <div className="flex flex-col mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {labels.map((label, index) => (
                    <SelectItem key={index} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedLabel && (
            <div className="mb-4 p-2 border rounded shadow">
              <p>
                <strong>Category:</strong> {currentCategory}
              </p>
              <p>
                <strong>Fluid:</strong> {currentFluid}
              </p>
            </div>
          )}

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <XAxis
                dataKey="charttime"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.2)" }}
                formatter={(value) => [value, "Value"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="valuenum"
                stroke="currentColor"
                className="stroke-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <CardContent></CardContent> */}
    </Card>
  );
}
