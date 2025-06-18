import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    fetch(`http://localhost:3000/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
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

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (search.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== '') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Sorting
    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCount(1); // reset to first page on filter change
  }, [search, category, sortOrder, products]);

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
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="product-page">
      <div className="page-header">
        <h1>Product Management</h1>
      </div>

      <div className="top-bar">
        <Link to="/addproduct" className="add-product-btn">+ Add New Product</Link>

        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      {loading && <div className="loading-message">Loading products...</div>}
      {error && <div className="error-message">Error: {error}</div>}

      {!loading && !error && filteredProducts.length === 0 ? (
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
                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length > itemsPerPage && (
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
                disabled={endIndex >= filteredProducts.length}
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
