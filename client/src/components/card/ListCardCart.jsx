//rafce
import React from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";

const ListCardCart = () => {
  const carts = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  return (
    <div className="bg-gray-100 rounded-md p-4">
      {/*Header */}
      <div className="flex gap-4 mb-4">
        <ListCheck size={30} />
        <p className="text-xl font-bold">รายการสินค้า {carts.length} รายการ</p>
      </div>
      {/*List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/*Left */}
        <div className="col-span-2">
          {/*card*/}
          {carts.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
              {/*row 1*/}
              <div className="flex justify-between mb-2">
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-16 h-16"
                      src={item.images[0].url}
                      alt=""
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center text-center items-center">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">
                      {item.price} x {item.count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*Right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-xl font-bold">ยอดรวม</p>
          <div className="flex justify-between">
            <span>รวมสุทธิ์</span>
            <span className="text-xl">{getTotalPrice()}</span>
          </div>
          <div className="flex flex-col gap-3">
            <Link>
              <button className="bg-green-500 rounded-md p-2  w-full text-white py-2 shadow-md hover:bg-green-700 cursor-pointer">
                สั่งซื้อ
              </button>
            </Link>
            <Link to={"/shop"}>
              <button className="bg-red-500 rounded-md p-2  w-full text-white py-2 shadow-md hover:bg-red-700 cursor-pointer">
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCardCart;
