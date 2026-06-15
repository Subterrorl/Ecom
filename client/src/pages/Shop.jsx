//rafce
import React from "react";
import ProductCard from "../components/card/ProductCard";

const Shop = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100 h-screen">Searchbar</div>
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="w-1/4 p-4 overflow-y-auto bg-gray-100">Cart</div>
    </div>
  );
};

export default Shop;
