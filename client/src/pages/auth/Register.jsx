//rafce
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

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
  const hdlSubmit = async (e) => {
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

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    if (passwordScore < 3) {
      toast.warning("Password strength is too weak");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Email
          <input className="border" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          Password
          <input className="border" {...register("password")} />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          Confirm Password
          <input className="border" {...register("confirmPassword")} />
          {errors.password && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button className="bg-blue-500">Register</button>
      </form>
    </div>
  );
};

export default Register;
