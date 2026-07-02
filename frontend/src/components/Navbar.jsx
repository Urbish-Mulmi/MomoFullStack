import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getUser, logoutUser } from "../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { AuthSuccess, LogoutSuccess } from "../redux/features/authSlice";
import { clearCart } from "../redux/features/cartSlice";



const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const linkStyles = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = async () => {
    await logoutUser();
    dispatch(LogoutSuccess());
    navigate("/");
    dispatch(clearCart());
    setMenuOpen(false);
  };

  
  useEffect(async()=>{
    const res = await getUser();
    console.log(res);
    dispatch(AuthSuccess(res.user));
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl tracking-wider">MyApp</div>

        {/* Hamburger button - only below 450px */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="min-[450px]:hidden text-gray-300 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Inline links - only from 450px up */}
        <div className="hidden min-[450px]:flex flex-wrap items-center gap-3 sm:gap-4">
          <NavLink to="/" className={linkStyles}>
            Home
          </NavLink>

          <NavLink to="/menu" className={linkStyles}>
            Menu
          </NavLink>

          {user && isAuthenticated ? (
            <>
              <NavLink to="/cart" className={linkStyles}>
                Cart
              </NavLink>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyles}>
                Login
              </NavLink>
              <NavLink to="/sign-up" className={linkStyles}>
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Dropdown menu - only below 450px */}
      {menuOpen && (
        <div className="min-[450px]:hidden mt-3 flex flex-col items-start gap-1 border-t border-gray-800 pt-3">
          <NavLink to="/" className={linkStyles} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/menu" className={linkStyles} onClick={() => setMenuOpen(false)}>
            Menu
          </NavLink>

          {user && isAuthenticated ? (
            <>
              <NavLink to="/cart" className={linkStyles} onClick={() => setMenuOpen(false)}>
                Cart
              </NavLink>

              <button
                onClick={handleLogout}
                className="mt-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyles} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/sign-up" className={linkStyles} onClick={() => setMenuOpen(false)}>
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;