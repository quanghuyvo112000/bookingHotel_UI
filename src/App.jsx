// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./Components/Menu";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Logout from "./Components/Logout";
import Bill from "./Components/Bill";
import ListHotel from "./Components/ListHotel";
import DetailHotel from "./Components/DetailHotel";
import BookingConfirmation from "./Components/BookingConfirmation";
import AccountManagement from "./Components/AccountManagement";
function App() {

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dang-nhap" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/danh-sach-khach-san" element={<ListHotel/>}/>
          <Route path="/chi-tiet-khach-san/:hotelId" element={<DetailHotel/>}/>
          <Route path="/xac-nhan-dat-phong" element={<BookingConfirmation/>}/>
          <Route path="/hoa-don-dat-phong" element={<Bill/>}/>
          <Route path="/quan-ly-tai-khoan" element={<AccountManagement/>}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
