import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Label,
} from "recharts";

interface RoomChartProps {
  data: { date: string; count: number }[];
}

const RoomChart: React.FC<RoomChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      <Label value="Số lượng phòng" position="top" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RoomChart;
