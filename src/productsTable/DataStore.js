const rawData = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

class ProductsRepo {
  filtersMap = {
    category: "filterProductsByStringProperty",
    name: "filterProductsByStringProperty",
    price: "filterProductsByStringProperty",
    stocked: "filterProductsByPositiveToggle",
  };

  products = [];

  constructor(products) {
    this.products = products ? products : [];
  }

  forEach(eachFn) {
    return this.products.forEach(eachFn);
  }

  map(mapFn) {
    return this.products.map(mapFn);
  }

  getProducts(options) {
    if (this.products.length === 0) {
      return new ProductsRepo(this.#getProductsData()).getProducts(options);
    }

    if (options) {
      const filterFns = [];
      for (const [attribute, value] of Object.entries(options)) {
        // attribute: "name",  value: "app"
        const filterFn = this.filtersMap[attribute];
        if (filterFn === undefined)
          throw new Error("FilterFunctionNotFoundError");
        filterFns.push([filterFn, attribute, value]);
      }
      return this.#filterProducts(filterFns);
    } else {
      return this;
    }
  }

  #getProductsData() {
    return rawData;
  }

  filterProductsByStringProperty(key, value) {
    if (value === "") return this.products;

    const results = this.products.filter((product) =>
      product[key].match(new RegExp(`(${value})`, "i"))
    );

    return new ProductsRepo(results);
  }

  filterProductsByPositiveToggle(key, value) {
    if (!value) return this.products;
    const results = this.products.filter((product) => product[key]);
    return new ProductsRepo(results);
  }

  #filterProducts(filterFns) {
    if (filterFns.length === 0) return this;
    const currentFilterFn = filterFns[0];

    const funcName = currentFilterFn[0];
    const attr = currentFilterFn[1];
    const value = currentFilterFn[2];

    return new ProductsRepo(this[funcName](attr, value)).#filterProducts(
      filterFns.slice(1)
    );
  }
}

export default function fetchProducts() {
  return new ProductsRepo();
}
