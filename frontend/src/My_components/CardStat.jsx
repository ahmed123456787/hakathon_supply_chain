import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CardStat = ({ stat }) => {
  const { title, value, percentage, icon } = stat;
  console.log(title, value, percentage, icon);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-3 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
          {icon}
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{percentage}</p>
      </CardContent>
    </Card>
  );
};

export default CardStat;
