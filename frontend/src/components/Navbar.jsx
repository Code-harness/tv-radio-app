import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">TV + Radio</Link>
      <div>
        <Link to="/channels" className="mr-4 hover:text-red-500">Channels</Link>
      </div>
    </nav>
  );
}