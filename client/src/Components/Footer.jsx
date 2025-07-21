import { Link2 } from "lucide-react";

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-orange-100 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-orange-400 rounded flex items-center justify-center shadow-sm">
              <Link2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              ShortLink
            </span>
          </div>
          <div className="flex space-x-6 text-gray-600">
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Support
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-100 text-center text-gray-600">
          <p>&copy; 2025 ShortLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
