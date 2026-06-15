//rafce
import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCard = () => {
  return (
    <div className="border border-gray-200 rounded-md shadow-md p-2 w-48">
      <div>
        <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
          No Image
        </div>
      </div>
      <div className="py-2">
        <p className="text-xl">Title</p>
        <p className="text-sm text-gray-500">Description</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">15,800</span>
        <button className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
