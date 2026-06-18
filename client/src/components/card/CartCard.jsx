//rafce
import React from "react";
import { Trash2 } from "lucide-react";
const CartCard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
      <div className="border border-gray-300 p-2">
        {/*card*/}
        <div className="bg-white p-2 rounded-md shadow-md">
          {/*row 1*/}
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center text-center items-center">
                No Image
              </div>

              <div>
                <p className="font-bold">Title</p>
                <p className="text-sm">Description</p>
              </div>
            </div>
            <div className="text-red-600 p-2">
              <Trash2 />
            </div>
          </div>
          {/*row 2*/}
          <div className="flex justify-between">
            <div className="border border-gray-200 rounded-md px-2 py-1">
              <button className="px-2 py-1 bg-gray-200 rounded-md hover:bg-red-300">
                -
              </button>
              <span className="px-4">1</span>
              <button className="px-2 py-1 bg-gray-200 rounded-md hover:bg-green-300">
                +
              </button>
            </div>
            <div className="font-bold text-blue-500">1,000</div>
          </div>
        </div>
        {/*total*/}
        <div className="flex justify-between px-2 mt-4">
          <span>รวม</span>
          <span>5,000</span>
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md shadow-md">
          ดำเนินการชำระเงิน
        </button>
      </div>
    </div>
  );
};

export default CartCard;
