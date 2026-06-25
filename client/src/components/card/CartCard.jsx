//rafce
import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity,
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct,
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  return (
    <div>
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
      {/*Border*/}
      <div className="border border-gray-300 p-2">
        {/*card*/}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
            {/*row 1*/}
            <div className="flex justify-between mb-2">
              <div className="flex gap-2 items-center">
                {item.images && item.images.length > 0 ? (
                  <img className="w-16 h-16" src={item.images[0].url} alt="" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center text-center items-center">
                    No Image
                  </div>
                )}

                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
              <div
                onClick={() => actionRemoveProduct(item.id)}
                className="text-red-600 p-2"
              >
                <Trash2 />
              </div>
            </div>
            {/*row 2*/}
            <div className="flex justify-between">
              <div className="border border-gray-200 rounded-md px-2 py-1">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-red-300"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-green-300"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="font-bold text-blue-500">
                {item.price * item.count}
              </div>
            </div>
          </div>
        ))}
        {/*total*/}
        <div className="flex justify-between px-2 mt-4">
          <span>รวม</span>
          <span>{getTotalPrice()}</span>
        </div>
        <Link to={"/cart"}>
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md shadow-md">
            ดำเนินการชำระเงิน test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
