import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faBath,
  faPiggyBank,
  faBed,
  faWifi,
  faSquareParking,
  faWaterLadder,
  faUtensils,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/BookingConfirmation.css";

const BookRoom = () => {
  const navigate = useNavigate();

  const numRooms = sessionStorage.getItem("numRooms");
  const { roomId } = useParams();
  const [roomDetail, setRoomDetail] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(parseInt(numRooms));
  const [formattedCheckInDate, setFormattedCheckInDate] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const numNights = sessionStorage.getItem("numNights");

  //   Tạo hóa đơn
  const handleBooking = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token không có sẵn.");
        return;
      }

      const userId = sessionStorage.getItem("idUser");
      const checkInDate = sessionStorage.getItem("checkInDate"); // Lấy userId từ sessionStorage hoặc nơi bạn lưu trữ

      if (roomDetail.amount < numberOfRooms) {
        alert("Số lượng phòng không đủ!. Vui lòng chọn lại số lượng phòng");
        return;
      }
      const response = await axios.post(
        "https://localhost:7211/Bill/add",
        {
          id: "B",
          period: numNights,
          roomId: roomDetail.id,
          userId: userId,
          date: checkInDate,
          total: totalPrice,
          amountRoom: numberOfRooms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsBookingSuccess(true);
        // Thực hiện các bước khác nếu cần thiết khi đặt phòng thành công
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đặt phòng:", error.message);
    }
  };

  //   format checkInDate
  useEffect(() => {
    const checkInDate = sessionStorage.getItem("checkInDate");

    if (checkInDate) {
      // Chia chuỗi thành mảng [yyyy, mm, dd]
      const dateParts = checkInDate.split("-");

      // Định dạng lại thành chuỗi 'dd/mm/yyyy'
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      setFormattedCheckInDate(formattedDate);
    }
  }, []);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        // Lấy token từ sessionStorage hoặc nơi bạn lưu trữ token
        const token = sessionStorage.getItem("jwtToken");

        // Kiểm tra xem token có tồn tại hay không
        if (!token) {
          console.error("Token không có sẵn.");
          return;
        }

        // Gửi yêu cầu API để lấy chi tiết phòng
        const response = await axios.get(
          `https://localhost:7211/Room/getDetail?id=${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Lấy dữ liệu từ phản hồi và cập nhật state
        setRoomDetail(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng:", error.message);
      }
    };

    // Gọi hàm fetchRoomDetail khi roomId thay đổi
    fetchRoomDetail();
  }, [roomId]);

  const typeIdOptions = {
    TR01: "Standard",
    TR02: "Superior",
    TR03: "Deluxe",
    TR04: "Suite",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const iconMappings = {
    "Vòi Tắm Đứng": faBath,
    WiFi: faWifi,
    "Đỗ xe": faSquareParking,
    "Hồ bơi": faWaterLadder,
    "Nhà hàng": faUtensils,
  };

  // Hàm để tách chuỗi dịch vụ thành mảng
  const splitServices = (services) => {
    if (!services) {
      return [];
    }
    return services.split(",").map((service) => service.trim());
  };

  // % được giảm
  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice <= 0) {
      return 0;
    }

    const percentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    return percentage.toFixed(2);
  };

  // Tính tổng tiền
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (roomDetail && (roomDetail.price || roomDetail.priceDiscount)) {
        if (roomDetail.priceDiscount > 0) {
          setTotalPrice(numberOfRooms * roomDetail.priceDiscount * numNights);
        } else {
          setTotalPrice(numberOfRooms * roomDetail.price * numNights);
        }
      }
    };

    calculateTotalPrice();
  }, [numberOfRooms, roomDetail, numNights]);

  //   tăng giảm phòng
  const handleDecrease = () => {
    if (numberOfRooms > 1) {
      setNumberOfRooms(numberOfRooms - 1);
    }
  };

  const handleIncrease = () => {
    setNumberOfRooms((prevNumberOfRooms) => prevNumberOfRooms + 1);
  };

  //   đóng popup
  const handleClosePopup = () => {
    setIsBookingSuccess(false);
    navigate("/quan-ly-tai-khoan");
  };

  return (
    <div style={{ marginBottom: 100 }}>
      {roomDetail ? (
        <div>
          <h4 style={{ fontSize: 18 }}>Xác nhận thông tin đặt phòng</h4>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div
                  key={roomDetail.id}
                  className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <div style={{ marginTop: 10 }} className="card">
                    <div className="card-body">
                      <div className="row">
                        <div
                          style={{ padding: 10 }}
                          className="col-12 col-sm-12 col-md-12 col-lg-3"
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 10,
                            }}
                            src={roomDetail.image}
                            className="card-img-top img-getRoom"
                            alt={roomDetail.name}
                          />
                        </div>
                        <div
                          style={{
                            border: "1px solid #d2d2d2",
                            borderRadius: "0.375rem",
                            padding: 15,
                          }}
                          className="col-12 col-sm-12 col-md-12 col-lg-6"
                        >
                          <h4 style={{ fontSize: 18, marginBottom: 15 }}>
                            {roomDetail.hotel.name}
                          </h4>
                          <h4 style={{ fontSize: 16 }}>
                            Kiểu phòng {typeIdOptions[roomDetail.typeRoomId]} -{" "}
                            <FontAwesomeIcon
                              icon={faBed}
                              style={{ color: "#0264c8", marginRight: 5 }}
                            />{" "}
                            {roomDetail.bed}
                          </h4>
                          <p className="card-text">
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                marginTop: 15,
                              }}
                            >
                              Tiện ích phòng
                            </p>
                            <div className="row">
                              {splitServices(roomDetail.services).map(
                                (service, index) => (
                                  <div key={index} className="col-6">
                                    <p
                                      style={{
                                        fontSize: 14,
                                        backgroundColor: "#f2f3f3",
                                        borderRadius: "999px",
                                        padding: "5px 15px",
                                        textAlign: "center",
                                        fontWeight: 500,
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={iconMappings[service]}
                                        style={{
                                          color: "#0264c8",
                                          marginRight: 15,
                                        }}
                                      />
                                      <span>{service}</span>
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </p>
                        </div>
                        <div
                          style={{ textAlign: "center" }}
                          className="col-12 col-sm-12 col-md-12 col-lg-3"
                        >
                          <p
                            style={{
                              textAlign: "center",
                              color:
                                roomDetail.priceDiscount !== 0 ? "" : "red",
                              fontWeight:
                                roomDetail.priceDiscount !== 0 ? "" : "500",
                              textDecoration:
                                roomDetail.priceDiscount !== 0
                                  ? "line-through"
                                  : "none",
                            }}
                            className="card-text"
                          >
                            Giá: {formatCurrency(roomDetail.price)} / đêm
                          </p>
                          {roomDetail.priceDiscount !== 0 && (
                            <div style={{ textAlign: "center" }}>
                              <p style={{ color: "green", fontSize: 12 }}>
                                <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                {calculateDiscountPercentage(
                                  roomDetail.price,
                                  roomDetail.priceDiscount
                                )}{" "}
                                %
                              </p>
                              <p
                                style={{ color: "red", fontWeight: 500 }}
                                className="card-text"
                              >
                                Giá sau giảm:{" "}
                                {formatCurrency(roomDetail.priceDiscount)} / đêm
                              </p>
                            </div>
                          )}

                          <div style={{ marginTop: 10 }}>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={handleDecrease}
                            >
                              -
                            </button>
                            <span style={{ margin: "0 10px" }}>
                              {numberOfRooms}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={handleIncrease}
                            >
                              +
                            </button>
                            <p style={{ marginTop: 10 }}>
                              <span style={{ fontWeight: 500 }}>Số phòng:</span>{" "}
                              {numberOfRooms} phòng
                            </p>

                            <p style={{ marginTop: 10 }}>
                              <span style={{ fontWeight: 500 }}>
                                Ngày nhận phòng:
                              </span>{" "}
                              {formattedCheckInDate}
                            </p>

                            <p style={{ marginTop: 10 }}>
                              <span style={{ fontWeight: 500 }}>
                                Số ngày ở:
                              </span>{" "}
                              {numNights} ngày
                            </p>

                            <p style={{ marginTop: 10 }}>
                              <span style={{ fontWeight: 500 }}>
                                Tổng thanh toán:
                              </span>{" "}
                              {formatCurrency(totalPrice)}
                            </p>
                            <p style={{ marginTop: 10 }}>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleBooking}
                              >
                                Đặt Phòng
                              </button>
                            </p>
                            {isBookingSuccess && (
                              <div className="popup popup-bookRoom">
                                <FontAwesomeIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#0264c8",
                                    marginBottom: 15,
                                  }}
                                  icon={faCircleCheck}
                                />
                                <p style={{ color: "green" }}>
                                  Đặt phòng thành công!
                                </p>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Đang tải chi tiết phòng...</p>
      )}
    </div>
  );
};

export default BookRoom;
