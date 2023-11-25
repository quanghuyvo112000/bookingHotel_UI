// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./Footer";
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Logout from "./Components/Logout";
import Bill from "./Containers/Bill";
import ListHotel from "./Components/ListHotel";
import DetailHotel from "./Components/DetailHotel";
import AccountManagement from "./Components/AccountManagement";
import ForgotPassword from "./Components/forgotPassword";
import ResetPassword from "./Components/ResetPassword";
import DetailHotel2 from "./Components/admin/DetailHotel";
import BookRoom from "./Components/BookRoom";
function App() {
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/danh-sach-khach-san" element={<ListHotel />} />
          <Route
            path="/chi-tiet-khach-san/:hotelId"
            element={<DetailHotel />}
          />
          <Route path="/xac-nhan-dat-phong/:roomId" element={<BookRoom />} />
          <Route path="/hoa-don-dat-phong" element={<Bill />} />
          <Route path="/quan-ly-tai-khoan" element={<AccountManagement />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/dashboard/detail-hotel/:hotelId"
            element={<DetailHotel2 />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
