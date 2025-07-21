import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "./Error";
import { useUrl } from "../Context/urlContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast, Slide, ToastContainer } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuth, user } = useUrl();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const postlogin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();

        if (result.error) {
          toast.error(result.error, {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
            hideProgressBar: true,
            transition: Slide,
          });
          return;
        }
        setIsAuth(true);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: false,
          hideProgressBar: true,
          transition: Slide,
        });
      } finally {
        setLoading(false);
      }
    };
    postlogin();
  };

  useEffect(() => {
    if (user) {
      navigate("/url"); // Redirect to dashboard or URL page
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <p className="mt-2 text-gray-600">Welcome back to ShortLink</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-orange-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-4 sm:px-6 py-2.5 sm:py-3 lg:py-3.5 bg-orange-400 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 w-full"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-200 border-t-white rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Signing In </span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <Error error={error} onClose={() => setError("")} />

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to={"/signup"}
                className="text-orange-400 hover:text-orange-500 font-semibold underline"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
