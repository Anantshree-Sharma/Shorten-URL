import { Link2, Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUrl } from "../Context/urlContext";
import { useEffect, useState } from "react";

function Header() {
  const { setUser, setIsAuth, isAuth } = useUrl();

  const navigate = useNavigate();
  const { hash } = useLocation();

  const [active, setActive] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (hash) {
      const cleanHash = hash.replace("#", "");
      setActive(cleanHash.charAt(0).toUpperCase() + cleanHash.slice(1));
    }
  }, [hash]);

  const navItems = !isAuth
    ? [
        { name: "Home", path: "/#home", isHash: "true" },
        { name: "Features", path: "/#features", isHash: "true" },
        { name: "About", path: "/#about", isHash: "true" },
        { name: "Contact", path: "/#contact", isHash: "true" },
      ]
    : [
        { name: "Home", path: "/url" },
        { name: "Analytics", path: "/all-urls" },
      ];

  //Handles Logout
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setTimeout(() => {
          setUser(null);
          setIsAuth(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setTimeout(() => {
        setLogoutLoading(false);
      }, 1000);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (callback) => {
    setIsMobileMenuOpen(false);
    if (callback) callback();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-orange-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 rounded flex items-center justify-center">
            <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <span className="text-lg sm:text-xl lg:text-2xl font-semibold">
            ShortLink
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {navItems.map((item) =>
            item.isHash ? (
              <a
                onClick={() => setActive(item.name)}
                key={item.path}
                href={item.path}
                className={`text-sm lg:text-base text-gray-600 hover:text-orange-400 transition-colors ${
                  active === item.name ? "text-orange-400 font-semibold" : ""
                }`}
              >
                {item.name}
              </a>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm lg:text-base text-gray-600 hover:text-orange-400 transition-colors ${
                    isActive ? "text-orange-400 font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3 lg:space-x-4">
          {!isAuth && (
            <>
              <button
                onClick={() => {
                  setActive("");
                  navigate("/login");
                }}
                className="text-sm lg:text-base text-gray-600 hover:text-orange-400 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActive("");
                  navigate("/signup");
                }}
                className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
              >
                Get Started
              </button>
            </>
          )}
          {isAuth && (
            <button
              onClick={() => handleMobileNavClick(handleLogout)}
              disabled={logoutLoading}
              className="w-full px-2 sm:px-3 py-2 bg-orange-400 text-white text-sm sm:text-base font-medium rounded hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {logoutLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-orange-300 border-t-white rounded-full animate-spin"></div>
                  Logging out
                </span>
              ) : (
                <span>Logout</span>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-orange-400 transition-colors"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6">
            <Menu
              className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0 rotate-90"
                  : "opacity-100 rotate-0"
              }`}
            />
            <X
              className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-orange-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 sm:px-4 py-2 space-y-1">
          {/* Mobile Navigation Links */}
          {navItems.map((item, index) =>
            item.isHash ? (
              <a
                key={item.path}
                href={item.path}
                onClick={() => handleMobileNavClick(() => setActive(item.name))}
                className={`block px-2 sm:px-3 py-2 text-sm sm:text-base font-medium text-gray-600 hover:text-orange-400 hover:bg-orange-50 rounded transition-all duration-200 transform ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                } ${
                  active === item.name
                    ? "text-orange-400 font-semibold bg-orange-50"
                    : ""
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {item.name}
              </a>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => handleMobileNavClick()}
                className={({ isActive }) =>
                  `block px-2 sm:px-3 py-2 text-sm sm:text-base font-medium text-gray-600 hover:text-orange-400 hover:bg-orange-50 rounded transition-all duration-200 transform ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  } ${
                    isActive ? "text-orange-400 font-semibold bg-orange-50" : ""
                  }`
                }
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {item.name}
              </NavLink>
            )
          )}

          {/* Mobile Buttons */}
          <div
            className={`pt-3 sm:pt-4 border-t border-orange-100 space-y-2 transition-all duration-300 transform ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navItems.length * 50 + 100}ms`
                : "0ms",
            }}
          >
            {!isAuth && (
              <>
                <button
                  onClick={() =>
                    handleMobileNavClick(() => {
                      setActive("");
                      navigate("/login");
                    })
                  }
                  className="w-full text-left px-2 sm:px-3 py-2 text-sm sm:text-base font-medium text-gray-600 hover:text-orange-400 hover:bg-orange-50 rounded transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() =>
                    handleMobileNavClick(() => {
                      setActive("");
                      navigate("/signup");
                    })
                  }
                  className="w-full px-2 sm:px-3 py-2 bg-orange-400 text-white text-sm sm:text-base font-medium rounded hover:bg-orange-500 transition-colors duration-200"
                >
                  Get Started
                </button>
              </>
            )}
            {isAuth && (
              <button
                onClick={() => handleMobileNavClick(handleLogout)}
                disabled={logoutLoading}
                className="w-full px-2 sm:px-3 py-2 bg-orange-400 text-white text-sm sm:text-base font-medium rounded hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {logoutLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-orange-300 border-t-white rounded-full animate-spin"></div>
                    Logging out
                  </span>
                ) : (
                  <span>Logout</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
