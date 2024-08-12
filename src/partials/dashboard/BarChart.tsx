"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { SERVER_URL } from '@/lib/constants';

export default function StatBarChart({ pathName, fieldName }: { pathName: string, fieldName: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch(process.env.NEXT_PUBLIC_API_URL + pathName)
    fetch(SERVER_URL + pathName)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          name: item[fieldName],
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
