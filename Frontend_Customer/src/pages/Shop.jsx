import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/Cards";
import Footer from "../components/Footer";

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
        console.log(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    })();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-center items-center py-10">
        <h1 className="font-bold text-5xl text-gray-800">All Products</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {currentProducts.map((product, index) => (
            <div key={index} className="w-full">
              <ProductCard
                product={product}
                addToCart={() => addToCart(product)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent className="flex space-x-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800"
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
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
