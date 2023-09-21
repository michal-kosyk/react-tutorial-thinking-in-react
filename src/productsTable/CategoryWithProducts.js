import React from "react";
import "./CategoryWithProducts.css";

function Product({ product }) {
  return (
    <li className="product">
      <span className={product.stocked ? "" : "out-of-stock"}>
        {product.name}
      </span>
      <span className="price">{product.price}</span>
    </li>
  );
}

function Products({ products }) {
  const productEls = products.map((product, index) => {
    return <Product key={index} product={product} />;
  });
  return <ul className="products">{productEls}</ul>;
}

export default function CategoryWithProducts({ category }) {
  return (
    <div className="product-category">
      <h2>{category.category}</h2>
      <Products products={category.products} />
    </div>
  );
}
