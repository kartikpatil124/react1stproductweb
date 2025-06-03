import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    fetch(`http://localhost:3000/products`)
      .then((res) => {
        console.log('Response status:', res.status); // Debug line
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
        console.log('Products loaded:', data); // Debug line
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          alert("Product deleted successfully!");
          fetchProducts();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (product) => {
    navigate('/addproduct', { state: product });
  };

  const startIndex = (count - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="product-page">
      <div className="page-header">
        <h1>Product Management</h1>
      </div>

      <Link to="/addproduct" className="add-product-btn">
        + Add New Product
      </Link>

      {loading && <div className="loading-message">Loading products...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      
      {!loading && !error && products.length === 0 ? (
        <div className="empty-message">No products found</div>
      ) : (
        <>
          <div className="product-container">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p className="product-price">${product.price}</p>
                  <p className="product-category">{product.category}</p>
                  <div className="product-actions">
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length > itemsPerPage && (
            <div className="pagination-container">
              <button 
                className="pagination-btn" 
                onClick={() => setCount(count > 1 ? count - 1 : 1)} 
                disabled={count === 1}
              >
                Previous
              </button>
              <span className="page-indicator">Page {count}</span>
              <button 
                className="pagination-btn" 
                onClick={() => setCount(count + 1)} 
                disabled={endIndex >= products.length}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Product;
