import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/Menu.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../image/Logo.png';

const Menu = () => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("jwtToken") !== null;
  const userRole = sessionStorage.getItem("role");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const fullname = sessionStorage.getItem("fullname");

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const renderAuthenticatedMenu = () => (
    <li className="nav-item">
      <div className="nav-link menu2" onClick={toggleSubMenu}>
        Xin chào! {fullname}
        {showSubMenu && (
          <ul className="submenu ">
            <h4 style={{ fontSize: 16, paddingTop: 10, marginLeft: -20 }}>
              Tài khoản
            </h4>
            {userRole === "user" && (
              <li className="submenu-item">
                <Link to="/quan-ly-tai-khoan">Quản lý tài khoản</Link>
              </li>
            )}
            {(userRole === "user" || userRole === "admin") && (
              <li className="submenu-item">
                <Link to="/logout">Đăng xuất</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </li>
  );

  const renderLoginLink = () => (
    <li className="nav-item">
      <Link
        to="/dang-nhap"
        className={`nav-link ${
          location.pathname === "/dang-nhap" ? "active" : ""
        }`}
      >
        Đăng nhập
      </Link>
    </li>
  );

  const renderMenuItem = (to, label) => (
    <li className="nav-item">
      <Link
        to={to}
        className={`nav-link ${location.pathname === to ? "active" : ""}`}
      >
        {label}
      </Link>
    </li>
  );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav-menu-hotel">
        <div className="container">
          <Link
            to="/"
            className={`navbar-brand ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <img
              style={{ width: '20%', height: '20%', borderRadius: 20 }}
              src={logo}
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {userRole === "admin"
                ? renderMenuItem("/dashboard", "Dashboard")
                : renderMenuItem("/about", "About")}
              {renderMenuItem("/contact", "Hợp tác với chúng tôi")}
            </ul>
            <ul className="navbar-nav justify-content-end">
              {isLoggedIn ? renderAuthenticatedMenu() : renderLoginLink()}
            </ul>
          </div>
        </div>
      </nav>
    );
  
  
};

export default Menu;
