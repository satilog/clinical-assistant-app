"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Overview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.API_URL + "/admission_locations")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          name: item.admission_location,
          total: item.n,
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          interval={0}
          height={80}
          dy={10}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }}
          formatter={(value, name, props) => [value, 'Total']}
          labelFormatter={(label) => `Location: ${label}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
