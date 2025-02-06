// ManageProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", img: "" });
  const [editProduct, setEditProduct] = useState({ id: "", price: "" });
  const [deleteProductId, setDeleteProductId] = useState(""); // Added state for delete dropdown


  useEffect(() => {
    // Fetch products from the database when the component loads
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // Add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      axios.post("http://localhost:5000/api/products", newProduct)
        .then((response) => {
          setProducts([...products, response.data]);
          setNewProduct({ name: "", price: "", img: "" }); // Clear the input fields
        })
        .catch((err) => {
          console.error("Error adding product:", err);
        });
    }
  };

  // Edit product price
  const handleEditProduct = () => {
    if (editProduct.id && editProduct.price) {
      axios.put(`http://localhost:5000/api/products/${editProduct.id}`, { price: editProduct.price })
        .then((response) => {
          const updatedProducts = products.map((product) =>
            product._id === editProduct.id ? response.data : product
          );
          setProducts(updatedProducts);
          setEditProduct({ id: "", price: "" }); // Clear the edit fields
        })
        .catch((err) => {
          console.error("Error editing product:", err);
        });
    }
  };

  // Delete product
  const handleDeleteProduct = () => {
    if (!deleteProductId) return; // Ensure a product is selected before deleting

    axios.delete(`http://localhost:5000/api/products/${deleteProductId}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== deleteProductId));
        setDeleteProductId(""); // Clear the selected product after deletion
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>

      <div className="options">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="options">
        <h3>Edit Product Price</h3>
        <select
          value={editProduct.id}
          onChange={(e) => {
            const selectedProduct = products.find(
              (product) => product._id === e.target.value
            );
            setEditProduct({ ...editProduct, id: selectedProduct._id, price: selectedProduct.price });
          }}
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>

        {editProduct.id && (
          <>
            <input
              type="number"
              placeholder="New Price"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
            <button onClick={handleEditProduct}>Save Changes</button>
          </>
        )}
      </div>

      <div className="options">
        <h3>Delete Product</h3>
        <select
          value={deleteProductId}
          onChange={(e) => setDeleteProductId(e.target.value)}
        >
          <option value="">Select Product to Delete</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteProduct} disabled={!deleteProductId}>
          Delete Product
        </button>
      </div>

      <div className="product-list">
        <h3>Existing Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ₹{product.price} per kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageProducts;
