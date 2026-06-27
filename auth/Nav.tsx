import Link from "next/link";

export default function LoginNav() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-darkgreen rounded-sm"></div>
        <span className="text-lg font-semibold text-gray-900">Vitality Logistics</span>
      </div>
      <Link href="/register">
        <button className="bg-textgreen hover:bg-darkgreen hover:text-textwhite bg-textwhite px-6 py-2 rounded-lg font-medium transition-colors">
          Register
        </button>
      </Link>
    </nav>
  );
}