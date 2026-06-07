//rafce
import React, { useState, useEffect } from "react";
import { createCategory, listCategory, removeCategory } from "../../api/CategoryAPI";
import useEcomStore from "../../store/ecom-store";
import { ToastContainer, toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory(token);
  }, []);

  const getCategory = async () => {
    try {
      const res = await listCategory(token);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success("Add category " + res.data.name + " success");
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    console.log(id);
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success("delete " + res.data.name + " success");
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} className="border" type="text" />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{item.name}</span>

            <button className="bg-red-500" onClick={() => handleRemove(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
