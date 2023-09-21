import React from "react";
import "./SearchBar.css";

export default function SearchBar({
  searchPhrase,
  isOnlyStock,
  onFilterTextChange,
  onIsOnlyStockChange,
}) {
  function onCheckBoxChange(event) {
    onIsOnlyStockChange(event.target.checked);
  }
  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="search"
        value={searchPhrase}
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isOnlyStock}
          onChange={onCheckBoxChange}
        />{" "}
        Only products in stock
      </label>
    </form>
  );
}
