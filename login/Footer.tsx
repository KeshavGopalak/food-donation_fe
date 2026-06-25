import Link from 'next/link';

export default function LoginFooter() {
  return (
    <footer className="bg-textwhite border-t border-gray-200 px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-7xl mx-auto">
        <div className="text-sm text-gray-700 mb-4 md:mb-0">
          <p className="font-semibold">Vitality Logistics</p>
          <p className="text-gray-600">© 2024 Vitality Logistics. Supporting global food redistribution.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="#" className="text-gray-600 hover:text-textgreen transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-600 hover:text-textgreen transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-600 hover:text-textgreen transition-colors">
            Accessibility
          </Link>
          <Link href="#" className="text-gray-600 hover:text-textgreen transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}