//rafce
import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="text-center">ลำดับ</th>
            <th>Email</th>

            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id} className="border border-gray-300">
              <td className="py-4 text-center">{index + 1}</td>
              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>{user.enabled ? "Active" : "Disable"}</td>
              <td>action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
