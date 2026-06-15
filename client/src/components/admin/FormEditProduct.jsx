//rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Mouse Wireless",
  description: "desc",
  price: 90,
  quantity: 5,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  //console.log(products);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("err fetch data", err);
    }
  };
  console.log("form", form);

  const handleOnChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      //console.log(res);
      toast.success("Add product " + res.data.title + " success");
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>แก้ไขสินค้า </h1>
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
        <button className="bg-blue-500">เพิ่มสินค้า</button>
        <hr />
        <br />
      </form>
    </div>
  );
};
export default FormEditProduct;
