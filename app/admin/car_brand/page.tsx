import Link from 'next/link';

export default function CarBrand() {
  return (
    <nav className="flex flex-col h-full p-4 bg-gray-800 text-white">
      <h2 className="mb-4 text-lg font-bold">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/dashboard">
            <a className="block p-2 hover:bg-gray-700 rounded">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <a className="block p-2 hover:bg-gray-700 rounded">Users</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            <a className="block p-2 hover:bg-gray-700 rounded">Settings</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
