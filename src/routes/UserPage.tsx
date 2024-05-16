import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../type";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <main className="flex flex-col justify-center text-center mt-20 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold pb-10">
        Página de certificados de Usuario
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre Y Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Saldo
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {user.nombre} {user.apellido}
                </th>
                <td className="px-6 py-4">$ {user.saldo}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/certificados/${user.id}`}
                    className="m-auto text-white bg-blue-700 text-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Imprimir
                  </Link>
                  <Outlet />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
