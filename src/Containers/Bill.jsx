import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faHotel,
  faCalendarDays,
  faClock,
  faPersonShelter,
  faTrash,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

import "../css/BookingConfirmation.css";

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const userId = sessionStorage.getItem("idUser");

  const token = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/getAll?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBills(response.data.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [userId, token]);

  const typeIdOptions = {
    TR01: "Standard",
    TR02: "Superior",
    TR03: "Deluxe",
    TR04: "Suite",
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // format tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xóa hóa đơn
  const handleCancelBooking = async (billId) => {
    try {
      debugger;
      const response = await axios.delete(
        `https://localhost:7211/Bill/delete`,
        {
          data: { id: billId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Nếu xóa thành công, cập nhật danh sách hóa đơn
      if (response.data.state) {
        setIsBookingSuccess(true);
        const updatedBills = bills.filter((bill) => bill.id !== billId);
        setBills(updatedBills);
      } else {
        console.error("Lỗi xóa hóa đơn:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi xóa hóa đơn:", error);
    }
  };

  //   đóng popup
  const handleClosePopup = () => {
    setIsBookingSuccess(false);
  };

  return (
    <div style={{ marginBottom: 100 }} className="container">
      <br />
      {bills.length > 0 ? (
        <div className="row">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4"
            >
              <div className="card">
                <div className="card-body">
                  <h4 style={{ fontSize: 16 }}>
                    {" "}
                    {bill.room && bill.room.hotel
                      ? bill.room.hotel.name
                      : "Không có tên"}
                  </h4>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faLocationDot}
                    />{" "}
                    {bill.room && bill.room.hotel
                      ? bill.room.hotel.address
                      : "Không có địa chỉ"}
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faHotel}
                    />{" "}
                    Kiểu phòng: {typeIdOptions[bill.room.typeRoomId]}
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faBed}
                    />{" "}
                    Kiểu giường: {bill.room.bed}
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faCalendarDays}
                    />{" "}
                    Ngày nhận phòng: {formatDate(bill.date)}
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faClock}
                    />{" "}
                    Số ngày thuê: {bill.period} ngày
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faPersonShelter}
                    />{" "}
                    Số lượng phòng thuê: {bill.amount} phòng
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      style={{
                        color: "#0264c8",
                      }}
                      icon={faMoneyBill}
                    />{" "}
                    Tổng thanh toán: {formatCurrency(bill.total)}
                  </p>
                  <div>
                    {bill.status === false && (
                      <p>
                        Trạng thái:{" "}
                        <span style={{ color: "red" }}>Đang chờ phê duyệt</span>
                      </p>
                    )}
                    {bill.status === true && (
                      <p>
                        Trạng thái:{" "}
                        <span style={{ color: "green" }}>Đã phê duyệt</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-danger ml-auto"
                      disabled={bill.status === true}
                      onClick={() => handleCancelBooking(bill.id)}
                    >
                      {" "}
                      Hủy phòng
                    </button>
                  </div>
                  {isBookingSuccess && (
                    <div className="popup">
                      <FontAwesomeIcon
                        style={{
                          fontSize: 50,
                          color: "red",
                          textAlign: "center",
                          marginBottom: 15,
                        }}
                        icon={faTrash}
                      />
                      <p>Hủy phòng thành công!</p>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClosePopup}
                      >
                        Đóng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No bills found for the given UserId.</p>
      )}
    </div>
  );
};

export default Bill;
