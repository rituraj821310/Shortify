import {
  FaLink,
  FaUser,
  FaRightFromBracket,
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../context/useAuth";
import { logoutUser } from "../../services/authService";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Logout failed");
    }
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg">
            <FaLink />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Shortify
            </h1>

            <p className="text-xs text-gray-500 -mt-1">
              Smart URL Shortener
            </p>
          </div>
        </NavLink>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10 font-medium">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Analytics
            </NavLink>
          </li>

        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <FaUser className="text-xl text-blue-600" />
                <span>{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-lg"
              >
                <FaRightFromBracket />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
              >
                Get Started
              </NavLink>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;