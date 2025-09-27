import React, { useState } from 'react';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: '$999', description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: '$699', description: 'Latest smartphone model' },
    { id: 3, name: 'Headphones', price: '$199', description: 'Wireless noise-canceling headphones' },
    { id: 4, name: 'Tablet', price: '$399', description: '10-inch tablet with stylus' },
  ]);

  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    margin: '1rem 0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #ddd'
  };

  const priceStyle = {
    color: '#2196F3',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  };

  return (
    <div style={containerStyle}>
      <h2>🛍️ Products Catalog</h2>
      <p>This microfrontend displays our product catalog independently.</p>

      <div style={gridStyle}>
        {products.map(product => (
          <div key={product.id} style={cardStyle}>
            <h3>{product.name}</h3>
            <div style={priceStyle}>{product.price}</div>
            <p>{product.description}</p>
            <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;