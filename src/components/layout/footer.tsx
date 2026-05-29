import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 mb-4">
              <Zap className="h-5 w-5" />
              <span>AccessiTools</span>
            </Link>
            <p className="text-sm text-gray-500">
              Generate alt text and read documents aloud. Built for creators and ecommerce teams.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#features" className="hover:text-gray-900">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/tools/image-alt-text-generator" className="hover:text-gray-900">Free Alt Text Tool</Link></li>
              <li><Link href="/tools/pdf-to-speech" className="hover:text-gray-900">PDF to Speech</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/alt-text-generator-for-ecommerce" className="hover:text-gray-900">Ecommerce Alt Text</Link></li>
              <li><Link href="/bulk-alt-text-generator-for-images" className="hover:text-gray-900">Bulk Alt Text</Link></li>
              <li><Link href="/read-pdf-aloud" className="hover:text-gray-900">Read PDF Aloud</Link></li>
              <li><Link href="/read-screenshots-aloud" className="hover:text-gray-900">Read Screenshots</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Compare</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/compare/speechify-alternative" className="hover:text-gray-900">vs Speechify</Link></li>
              <li><Link href="/compare/naturalreader-alternative" className="hover:text-gray-900">vs NaturalReader</Link></li>
              <li><Link href="/compare/canva-alt-text-alternative" className="hover:text-gray-900">vs Canva Alt Text</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AccessiTools. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-900">Login</Link>
            <Link href="/signup" className="hover:text-gray-900">Sign Up</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
