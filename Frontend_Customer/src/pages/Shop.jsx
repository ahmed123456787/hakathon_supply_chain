import React, { useState } from "react";
import ProductCard from "../components/Cards";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "../components/Footer";

function Shop() {
  const products = [...Array(24)]; // Liste de 8 produits
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-start items-center">
        <h1 className="font-bold text-4xl">All Products</h1>
      </div>

      <div className="grid grid-cols-4 gap-10 mt-5">
        {currentProducts.map((_, index) => (
          <div key={index} className="w-[300px]">
            <ProductCard />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="bg-slate-200"
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-slate-900 text-white"
                      : "bg-transparent"
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="bg-slate-200"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
