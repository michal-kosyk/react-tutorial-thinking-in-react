import React, { useState } from "react";
import CategoryWithProducts from "./CategoryWithProducts";
import SearchBar from "./SearchBar";

import fetchProducts from "./DataStore";
import "./FilterableProductsTable.css";

function categoriesWithProducts(data) {
  const result = []; // [{ category: 'a', products: []}, { category: 'b', products: [] }]
  data.forEach((product) => {
    const category = product.category;
    if (result.length === 0) {
      result.push({ category, products: [product] });
    } else {
      const categoryWithProducts = result.find(
        (categoryWithProducts) =>
          categoryWithProducts.category === product.category
      );
      if (categoryWithProducts) {
        categoryWithProducts.products.push(product);
      } else {
        result.push({ category, products: [product] });
      }
    }
  });
  return result;
}

function categoryEls(productData) {
  return categoriesWithProducts(productData).map((category, index) => {
    return <CategoryWithProducts key={index} category={category} />;
  });
}

export default function FilterableProductsTable() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isOnlyStock, setIsOnlyStock] = useState(false);
  const productsRepo = fetchProducts().getProducts({
    name: searchPhrase,
    stocked: isOnlyStock,
  });

  return (
    <div className="filterable-products-table">
      <SearchBar
        searchPhrase={searchPhrase}
        isOnlyStock={isOnlyStock}
        onFilterTextChange={setSearchPhrase}
        onIsOnlyStockChange={setIsOnlyStock}
      />
      <div className="products-table">
        <div className="products-table-header">
          <h2>Name</h2>
          <h2>Price</h2>
        </div>
        {categoryEls(productsRepo)}
      </div>
    </div>
  );
}
