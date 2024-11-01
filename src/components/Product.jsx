import React from 'react';
import SingleProduct from './SingleProduct';
function Product({ products }) {
  console.log([products])


  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <SingleProduct product={product}></SingleProduct>
        </div>
      ))}
    </div>
  );
}

export default Product;