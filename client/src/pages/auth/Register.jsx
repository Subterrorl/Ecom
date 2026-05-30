//rafce
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Password does not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (err) {
      const errMsG = err.response?.data?.error;
      toast.error(errMsG);
      console.log(err.response);
    }
  };

  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>
        Email
        <input className="border" onChange={handleOnChange} name="email" type="email" />
        Password
        <input className="border" onChange={handleOnChange} name="password" type="text" />
        Confirm Password
        <input className="border" onChange={handleOnChange} name="confirmPassword" type="text" />
        <button className="bg-blue-500">Register</button>
      </form>
    </div>
  );
};

export default Register;
