//rafce
import React, { use, useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    //console.log("order and orderstatus", orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        //console.log(res);
        toast.success("Updata status Success!!");
        handleGetOrder(token);
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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="text-center">ลำดับ</th>
            <th>ชื่อผู้ใช้</th>
            <th>สินค้า</th>
            <th>รวม</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody className="">
          {orders?.map((item, index) => {
            //console.log("item", item);
            return (
              <tr key={index} className="border border-gray-300">
                <td className="text-center">{index + 1}</td>
                <td>
                  <p>{item.orderedBy.email}</p>
                  <p>{item.orderedBy.address}</p>
                </td>
                <td className=" py-4">
                  <ul>
                    {item.products?.map((product, index) => (
                      <div key={index}>
                        <li>
                          {product.product.title}{" "}
                          <span className="text-sm">
                            {product.count} x {product.product.price}
                          </span>
                        </li>
                      </div>
                    ))}
                  </ul>
                </td>
                <td>{item.cartTotal}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-md ${getStatusColor(item.orderStatus)}`}
                  >
                    {item.orderStatus}
                  </span>
                </td>
                <td>
                  <select
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                  >
                    <option>Not Process</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
