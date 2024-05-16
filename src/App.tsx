import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <section className="flex flex-col justify-center text-center mt-20">
      <h1 className="text-2xl pb-10"> Página de certificados de Usuario</h1>
      <Link
        className="m-auto text-white bg-blue-700 text-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        to="/certificados"
      >
        Empezar
      </Link>
      <Outlet />
    </section>
  );
}
