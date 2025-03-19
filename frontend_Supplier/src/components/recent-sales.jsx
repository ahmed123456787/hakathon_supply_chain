import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";
export function RecentSales() {
  const [salesData, setSalesData] = useState([]);
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0]; // Deux premières lettres des deux mots
    } else {
      return name.slice(0, 2).toUpperCase(); // Deux premières lettres du seul mot
    }
  };
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5298/api/Order/GetRecentSalesAsync"
        );
        const formattedData = response.data.map((sale) => ({
          name: sale.name,
          email: sale.email,
          amount: `+$${sale.totalAmount.toFixed(2)}`, // Formater le montant
          fallback: getInitials(sale.name),
        }));
        console.log(formattedData);
        setSalesData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des ventes :", error);
      }
    };

    fetchSales();
  }, []);
  return (
    <div className="space-y-8">
      {salesData.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
