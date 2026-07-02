import React, { useEffect, useEffectEvent } from "react";
import { NavLink } from "react-router";
import { getUser, logoutUser } from "../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { AuthSuccess, LogoutSuccess } from "../redux/features/authSlice";


const Navbar = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // Active link styling helper
  const linkStyles = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = async () => {
    await logoutUser();
    dispatch(LogoutSuccess());
  };

  
  useEffect(async()=>{
    const res = await getUser();
    console.log(res);
    dispatch(AuthSuccess(res.user));
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo / Brand Name */}
      <div className="text-white font-bold text-xl tracking-wider">MyApp</div>

      {/* Navigation Links & Actions */}
      <div className="flex items-center gap-4">
        <NavLink to="/" className={linkStyles}>
          Home
        </NavLink>

        <NavLink to="/menu" className={linkStyles}>
          Menu
        </NavLink>
        
        {/* if user is logged in and authenticated show only logout else display login only */}
        {user && isAuthenticated ? (
          <>
          <NavLink to="/cart" className={linkStyles}>
              Cart
            </NavLink>


          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
            </NavLink>{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;