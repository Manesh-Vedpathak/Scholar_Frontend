import React, { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  FileText,
  GraduationCap,
  LogOut,
  FileBarChart,
  Menu,
  X
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function AdminSidebar({
  activePage,
  variant = "management"
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const isAdminStyle = variant === "admin";

  const styles = isAdminStyle
    ? {
        sidebar: "admin-sidebar",
        brand: "admin-brand",
        brandIcon: "admin-brand-icon",
        menuLabel: "admin-menu-label",
        item: "admin-menu-item",
        bottom: "admin-sidebar-bottom",
        logout: "admin-logout"
      }
    : {
        sidebar: "management-sidebar",
        brand: "management-brand",
        brandIcon: "management-brand-icon",
        menuLabel: "management-menu-label",
        item: "management-menu-item",
        bottom: "management-sidebar-bottom",
        logout: ""
      };

  const links = [
    {
      key: "dashboard",
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      key: "applications",
      label: "Applications",
      to: "/admin/applications",
      icon: FileText
    },
    {
      key: "students",
      label: "Students",
      to: "/admin/students",
      icon: Users
    },
    {
      key: "scholarships",
      label: "Scholarships",
      to: "/admin/scholarships",
      icon: GraduationCap
    },
    {
      key: "reports",
      label: "Reports",
      to: "/admin/reports",
      icon: FileBarChart
    }
  ];

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className="admin-mobile-menu-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open admin menu"
        aria-expanded={isOpen}
      >
        <Menu size={25} />
      </button>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <GraduationCap size={27} />
          </div>

          <div>
            <h2>ScholarConnect</h2>
            <span>Admin Portal</span>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="admin-mobile-close"
            onClick={closeSidebar}
            aria-label="Close admin menu"
          >
            <X size={23} />
          </button>
        </div>

        {/* Main Menu */}
        <div className={styles.menuLabel}>
          MAIN MENU
        </div>

        {links.map(({ key, label, to, icon: Icon }) => {
          const active = activePage
            ? activePage === key
            : location.pathname === to;

          return (
            <Link
              key={key}
              to={to}
              onClick={closeSidebar}
              className={`${styles.item}${
                active ? " active" : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={19} />

              {isAdminStyle ? (
                <span>{label}</span>
              ) : (
                label
              )}
            </Link>
          );
        })}

        {/* Sidebar Bottom */}
        <div className={styles.bottom}>
          <button
            type="button"
            onClick={handleLogout}
            className={styles.logout || undefined}
          >
            <LogOut size={19} />

            {isAdminStyle ? (
              <span>Logout</span>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </aside>
    </>
  );
}