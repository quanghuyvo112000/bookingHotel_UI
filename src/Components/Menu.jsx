import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/Menu.css";

const Menu = () => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("token") !== null;
  const userRole = sessionStorage.getItem("role");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const fullname = sessionStorage.getItem("fullname");

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link
          to="/"
          className={`navbar-brand ${location.pathname === "/" ? "active" : ""}`}
        >
          Trang chủ
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to={userRole === "admin" ? "/dashboard" : "/about"}
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}
                                   ${location.pathname === "/dashboard"   ? "active" : ""}`}
            >
              {userRole === "admin" ? "Dashboard" : "About"}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav justify-content-end">
          {isLoggedIn ? (
            <li className="nav-item">
              <div className="nav-link menu2" onClick={toggleSubMenu}>
               Xin chào! {fullname}
               {showSubMenu && (
                    <ul className="submenu ">
                        <h4 style={{fontSize: 16, paddingTop: 10, marginLeft: -20}}>Tài khoản</h4>
                        {userRole === "user" && (
                        <li className="submenu-item">
                            <Link to="/quan-ly-tai-khoan">
                              Quản lý tài khoản
                            </Link>
                        </li>
                        )}
                        {(userRole === "user" || userRole === "admin") && (
                        <li className="submenu-item">
                            <Link to="/logout">
                            Đăng xuất
                            </Link>
                        </li>
                        )}
                    </ul>
                )}
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                to="/dang-nhap"
                className={`nav-link ${location.pathname === "/dang-nhap" ? "active" : ""}`}
              >
                Đăng nhập
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
