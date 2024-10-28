import React from 'react';

function Product({ products }) {
    console.log([products])
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.email}</p>
          <p>{product.id}$</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Product;