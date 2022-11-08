import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    english: 4000,
    hindi: 2400,
    marathi: 3000,
    science1: 1398,
    science2 : 1233,
    maths1 : 1243,
    maths2: 4567,
    amt: 2400,
  },
];

export default function ReportsBarChart(params) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="english" fill="#8884d8" />
          <Bar dataKey="hindi" fill="#82ca9d" />
          <Bar dataKey="marathi" fill="#82ca9d" />
          <Bar dataKey="science1" fill="#82ca9d" />
          <Bar dataKey="science2" fill="#82ca9d" />
          <Bar dataKey="maths1" fill="#82ca9d" />
          <Bar dataKey="maths2" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
