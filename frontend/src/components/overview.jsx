"use client";

import { useMemo, useState,useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getMonthsOverview } from "../api/productApi";
export function Overview() {
  const [data,setData]=useState([])
  useEffect(()=>{
    async function fetchingdata() {
      const fetchedData=await getMonthsOverview()
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const  fromattedData=fetchedData.map((item) => ({
        name: months[item.month - 1], // Convert month number to name
        total: item.orders, // Use orders as total
      }));
      setData(fromattedData)
    }
    fetchingdata();
  },[])


  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
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
          tickFormatter={(value) => `$${value}`}
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
