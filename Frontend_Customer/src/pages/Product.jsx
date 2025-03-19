import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, getById } from "../api/productApi";
import ProductCard from "../components/Cards";
import Footer from "../components/Footer";
import Product_Details from "../components/ProductDetails";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await getById(id);
        if (response?.data) {
          setProduct(response.data);
          fetchSimilarProducts();
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  async function fetchSimilarProducts() {
    try {
      const res = await getAllProducts();
      setSimilarProducts(res?.slice(0, 4) || []);
    } catch (err) {
      console.error("Error fetching similar products:", err);
    }
  }

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <Skeleton className="h-10 w-3/4 md:w-1/2 rounded-md" />
        <Skeleton className="h-72 w-72 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-md" />
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center font-medium">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 w-full bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8">
        <Product_Details
          title={product?.prodcutName || "No Title"}
          quantity={product?.quantity || 0}
          price={product?.price || 0}
          cost={product?.cost || 0}
          desc={product?.description || "No description available."}
          image={product?.image || "https://placehold.co/300"}
        />
      </div>

      <div className="mt-16 w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🔥 Similar Products
        </h1>
        <div className="flex gap-6">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => <ProductCard product={item} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No similar products found.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Product;
