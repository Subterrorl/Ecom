//rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduce = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  //console.log(products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const handleOnChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      //console.log(res);
      toast.success("Add product " + res.data.title + " success");
      setForm(initialState);
      getProduct(20);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ยืนยันการลบข้อมูล")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("ลบสินค้า " + res.data.title + " แล้ว");
        getProduct(20);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />

        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />

        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />

        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            {" "}
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        <UploadFile form={form} setForm={setForm} />
        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 text-white">
          เพิ่มสินค้า
        </button>
        <hr />
        <br />
        <table className="table w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัพเดท</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:h-28">
            {products.map((item, index) => {
              //console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <div className="flex items-center justify-center">
                      {item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          className="w-24 h-24 rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-lg shadow-md bg-gray-200 flex items-center justify-center">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-center">{item.title}</td>
                  <td className="text-center">{item.description}</td>
                  <td className="text-center">{numberFormat(item.price)}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.sold}</td>
                  <td className="text-center">{dateFormat(item.updatedAt)}</td>
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <p className="bg-yellow-500 rounded-md p-1 shadow-md  hover:scale-105  hover:-translate-y-1 hover:duration-200">
                        <Link to={"/admin/product/" + item.id}>
                          <Pencil />
                        </Link>
                      </p>
                      <p
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 rounded-md p-1 shadow-md  hover:scale-105  hover:-translate-y-1 hover:duration-200"
                      >
                        <Trash />
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduce;
