// import React from 'react'
// import { Link, Outlet } from 'react-router'

// const Dashboard = () => {
//   return (
//     <div>
//       <nav>
//         <Link to = '/admin/food-management'>Food Management</Link>
//         <Link to = '/admin/user-management'>User Management</Link>
//         <Link to = '/admin/order-management'>Order Management</Link>
//       </nav>

//       <main>
//       <Outlet />
//       This is Admin Dashboard gng
//       </main>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'

const Dashboard = () => {
  const location = useLocation()

  // Helper function to apply active styles to the current link
  const linkStyle = (path) => {
    const baseStyle = "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
    const isActive = location.pathname === path
    
    return isActive 
      ? `${baseStyle} bg-orange-500 text-white shadow-md shadow-orange-500/20` 
      : `${baseStyle} text-slate-600 hover:bg-slate-100 hover:text-slate-900`
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div className="px-6 py-6">
          {/* Logo / Brand Title */}
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              🍳
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">AdminPanel</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <Link to="/admin/food-management" className={linkStyle('/admin/food-management')}>
              <span>🍔 Food Management</span>
            </Link>
            <Link to="/admin/user-management" className={linkStyle('/admin/user-management')}>
              <span>👥 User Management</span>
            </Link>
            <Link to="/admin/order-management" className={linkStyle('/admin/order-management')}>
              <span>📦 Order Management</span>
            </Link>
          </nav>
        </div>

        {/* Optional Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
          © 2026 Admin Dashboard Gng
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-lg font-semibold text-slate-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">Admin Mode</span>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* The routed content renders here */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[calc(100vh-12rem)]">
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}

export default Dashboard