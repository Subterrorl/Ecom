//rafce
import React from "react";
import { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log("res", res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
      {/**คลุม table */}
      <div className="space-y-4">
        {/**Card */}
        {orders?.map((item, index) => {
          //console.log("item", item);
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/**header */}
              <div className="flex justify-between mb-2">
                {/**left */}
                <div>
                  <p className="text-sm">Order data</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                {/**right */}
                <div>
                  <span
                    className={`px-2 py-1 rounded-md ${getStatusColor(item.orderStatus)}`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>
              {/**table */}
              <div>
                <table className="border border-gray-300 w-full table-fixed">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {item.products?.map((product, index) => {
                      console.log("product", product);
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{numberFormat(product.product.price)}</td>
                          <td>{product.count}</td>
                          <td>
                            {numberFormat(
                              product.count * product.product.price,
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/**total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{numberFormat(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
