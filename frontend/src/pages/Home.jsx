import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to TV + Radio</h1>
        <p className="text-gray-400 text-lg">
          Watch live TV and listen to radio streams instantly!
        </p>
      </div>
    </div>
  );
}