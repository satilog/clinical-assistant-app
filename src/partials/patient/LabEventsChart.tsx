"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
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
import dayjs from "dayjs";

export default function LabEventsChart({ id }: { id: any }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentFluid, setCurrentFluid] = useState("");
  const [refRange, setRefRange] = useState({ lower: 0, upper: 0 });

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
  }, [id]);

  useEffect(() => {
    if (selectedLabel) {
      const filtered: any = data.filter(
        (item: any) => item.label === selectedLabel
      );
      setFilteredData(filtered);
      if (filtered.length > 0) {
        setCurrentCategory(filtered[0].category);
        setCurrentFluid(filtered[0].fluid);
        setRefRange({
          lower: filtered[0].ref_range_lower,
          upper: filtered[0].ref_range_upper,
        });
      }
    }
  }, [selectedLabel, data]);

  return (
    <Card className="w-full h-full bg-white shadow-md rounded-lg">
      <CardHeader className="pb-0 flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Lab Event Data</CardTitle>
          <div className="mb-4">
            <p>
              <strong>Category:</strong>{" "}
              {selectedLabel ? currentCategory : "N/A"}
            </p>
            <p>
              <strong>Fluid:</strong> {selectedLabel ? currentFluid : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Select onValueChange={setSelectedLabel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a label" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Labels</SelectLabel>
                {labels.map((label, index) => (
                  <SelectItem key={index} value={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <div className="h-full overflow-y-auto">
        <div className="container mx-auto p-4">
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={filteredData}>
              <XAxis
                dataKey="charttime"
                tickFormatter={(tick) => dayjs(tick).format("MMM YYYY")}
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
                labelFormatter={(label) =>
                  `Time: ${dayjs(label).format("MMM YYYY")}`
                }
              />
              <ReferenceLine
                y={refRange.lower}
                stroke="red"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={refRange.upper}
                stroke="red"
                strokeDasharray="3 3"
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
    </Card>
  );
}
