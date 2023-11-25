import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelManage from "./HotelManage";
import PassChange from "../Containers/PassChange";
import BillManage from "./BillManage";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/AccountMana.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("hotel-info");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem token có tồn tại không
    const token = sessionStorage.getItem("jwtToken");
    setIsAuthenticated(!!token);

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
      navigate("/dang-nhap");
    } else {
      // Kiểm tra quyền truy cập ở đây, ví dụ kiểm tra role là 'admin'
      const userRole = sessionStorage.getItem("role");
      setIsAdmin(userRole === "admin");
    }
  }, [navigate]);

  const renderContent = () => {
    // Nếu chưa đăng nhập hoặc không phải là admin, hiển thị thông báo
    if (!isAuthenticated || !isAdmin) {
      return navigate("/");
    }

    // Nếu là admin, hiển thị nội dung theo tab
    switch (activeTab) {
      case "hotel-info":
        return <HotelManage />;
      case "statistic-info":
        return <PassChange />;
      case "bill-info":
        return <BillManage />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="navigation-menu">
            <div style={{ textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  fontSize: 25,
                  padding: 15,
                  color: "#275fbe",
                  borderRadius: "50%",
                  border: "1px solid #275fbe",
                }}
              />
              <p style={{ fontSize: 16, fontWeight: 500 }}>
                {sessionStorage.getItem("fullname")}
              </p>
            </div>
            <hr />
            <nav>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <button
                    className={`btn btn_navigation-menu ${
                      activeTab === "hotel-info" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("hotel-info")}
                  >
                    Quản lý khách sạn
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn_navigation-menu ${
                      activeTab === "bill-info" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("bill-info")}
                  >
                    Quản lý hóa đơn
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn_navigation-menu ${
                      activeTab === "statistic-info" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("statistic-info")}
                  >
                    Đổi mật khẩu
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div style={{ padding: "20px" }}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
