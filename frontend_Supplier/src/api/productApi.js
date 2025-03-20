import api from "./init";

<<<<<<< HEAD
=======

>>>>>>> 78bdf208b0c299e4fb92017f2e8054dd96561c1d
export const getAllProducts = async () => {
  try {
    const response = await api.get("/api/Product/GetAllProductsForSupplier/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};
<<<<<<< HEAD
export const getMonthsOverview = async () => {
  try {
    const response = await api.get("/api/Order/GetProductsForAllMonthsAsync");
    return response.data;
  } catch (error) {
    console.error("Error fetching months overview:", error);
    throw error;
  }
};
export const getRevenues = async () => {
  try {
    const response = await api.get("/api/Order/GetTotalRevenuesAsync");
    print(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching total revenues:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/api/Product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  // console.log(id);
  const newProduct = {
    productID: updatedProduct.productID,
    prodcutName: updatedProduct.prodcutName,
    Quantity: updatedProduct.quantity,
    Price: updatedProduct.price,
    // weight: updatedProduct.weight,
    SupplierID: 1,
  };
  console.log("updated", newProduct);
  console.log("id", id);
  try {
    const response = await api.put(
      `/api/Product/${id}?ProductID=${newProduct.productID}&ProdcutName=${newProduct.prodcutName}&Price=${newProduct.Price}&Quantity=${newProduct.Quantity}&SupplierID=${newProduct.SupplierID}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
export const addProduct = async (product) => {
  try {
    const newProduct = {
      prodcutName: product.prodcutName,
      Quantity: product.quantity,
      Price: product.price,
      Weight: product.weight,
      Description: product.description || "",
      Cost: product.cost || 0,
      Image: product.image || "",
      SupplierID: 1,
    };
    const response = await api.post(
      `/api/Product?ProdcutName=${newProduct.prodcutName}&Price=${newProduct.Price}&Quantity=${newProduct.Quantity}&Weight=${newProduct.Weight}&Description=${newProduct.Description}&Cost=${newProduct.Cost}&Image=${newProduct.Image}&SupplierID=${newProduct.SupplierID}`,
      newProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
=======

>>>>>>> 78bdf208b0c299e4fb92017f2e8054dd96561c1d
