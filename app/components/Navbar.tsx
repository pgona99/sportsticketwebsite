import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">🎫</div>
            <h1 className="text-xl font-bold">SportTicket</h1>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#events" className="hover:text-blue-400 transition">
              Events
            </a>
            <a href="#cart" className="hover:text-blue-400 transition">
              Cart
            </a>
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
