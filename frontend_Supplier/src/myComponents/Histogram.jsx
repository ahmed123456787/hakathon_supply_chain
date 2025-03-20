import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Histogram = ({ data }) => {
  return (
    <div>
      {/* Add title */}
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
        <Bar dataKey="count" fill="#000000" />
      </BarChart>
      <h3 style={{ textAlign: "center" }}>Stock Risk Distribution</h3>{" "}
    </div>
  );
};

export default Histogram;
