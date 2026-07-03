//rafce
import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";

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

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("update status success");
      })
      .catch((err) => console.log(err.response));
  };

  const handleChangeUserRole = (userId, userRole) => {
    //console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("update role success");
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

              <td>
                <select
                  onChange={(e) =>
                    handleChangeUserRole(user.id, e.target.value)
                  }
                  value={user.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>

              <td>{user.enabled ? "Active" : "Disable"}</td>
              <td>
                <button
                  onClick={() => handleChangeUserStatus(user.id, user.enabled)}
                  className="bg-yellow-300 p-1 rounded-md shadow-md cursor-pointer hover:bg-yellow-400"
                >
                  {user.enabled ? "Disable" : "Active"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
