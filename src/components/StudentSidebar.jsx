import React, { useState } from "react";

import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  User,
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StudentSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Mobile sidebar state
  const [isOpen, setIsOpen] = useState(false);

  // Open sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  // Close sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Logout
  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/login");
  };

  // Close sidebar after clicking a navigation link
  const handleNavigation = () => {
    closeSidebar();
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="student-mobile-menu-toggle"
        onClick={openSidebar}
        aria-label="Open student menu"
        aria-expanded={isOpen}
      >
        <Menu size={25} />
      </button>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="student-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Student Sidebar */}
      <aside
        className={`student-sidebar ${isOpen ? "open" : ""}`}
      >
        {/* Sidebar Header */}
        <div className="student-brand">

          <div className="student-brand-icon">
            <GraduationCap size={27} />
          </div>

          <div>
            <h2>ScholarConnect</h2>
            <span>Student Portal</span>
          </div>

          {/* Mobile Close Button */}
          <button
            className="student-mobile-close"
            onClick={closeSidebar}
            aria-label="Close student menu"
          >
            <X size={23} />
          </button>

        </div>

        {/* Main Menu */}
        <div className="student-menu-label">
          MAIN MENU
        </div>

        <NavLink
          to="/student/dashboard"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `student-menu-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/student/scholarships"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `student-menu-item ${isActive ? "active" : ""}`
          }
        >
          <GraduationCap size={19} />
          <span>Browse Scholarships</span>
        </NavLink>

        <NavLink
          to="/student/applications"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `student-menu-item ${isActive ? "active" : ""}`
          }
        >
          <FileText size={19} />
          <span>My Applications</span>
        </NavLink>

        <NavLink
          to="/student/notifications"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `student-menu-item ${isActive ? "active" : ""}`
          }
        >
          <Bell size={19} />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/student/profile"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `student-menu-item ${isActive ? "active" : ""}`
          }
        >
          <User size={19} />
          <span>My Profile</span>
        </NavLink>

        {/* Sidebar Bottom */}
        <div className="student-sidebar-bottom">
          <button onClick={handleLogout}>
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}