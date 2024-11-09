import React from 'react';
import SingleProduct from './SingleProduct';
function Product({ products }) {
  console.log([products])


  return (
    <>
      {products.map((product) => (
          <SingleProduct product={product}></SingleProduct>
      ))}
</>
  );
}

export default Product;