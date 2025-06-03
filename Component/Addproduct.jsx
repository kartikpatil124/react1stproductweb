import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './AddProduct.css';

const Addproduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state;

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editProduct ? 'PUT' : 'POST';
    const url = editProduct
      ? `http://localhost:3000/products/${editProduct.id}`
      : 'http://localhost:3000/products';

    fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        alert(`Product ${editProduct ? 'updated' : 'added'} successfully!`);
        navigate('/product');
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to submit product.');
      });
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1>{editProduct ? 'Edit Product' : 'Add New Product'}</h1>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Name</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {editProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <Link to="/product" className="back-btn">
        ← Back to Products
      </Link>
    </div>
  );
};

export default Addproduct;