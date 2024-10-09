import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Define the links array
const links = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Users',
    href: '/users',
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href}>
            <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
