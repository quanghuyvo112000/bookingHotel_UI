import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  faPiggyBank,
  faBed,
  faBath,
  faWifi,
  faSquareParking,
  faWaterLadder,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GetRoomUser = ({ hotelId }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const token = sessionStorage.getItem("jwtToken");

  const typeIdOptions = {
    TR01: "Standard",
    TR02: "Superior",
    TR03: "Deluxe",
    TR04: "Suite",
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/Room/getByHotelId?id=${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    fetchRooms();
  }, [hotelId, token]);

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

  const handleButtonClick = (roomId) => {
    navigate(`/xac-nhan-dat-phong/${roomId}`);
  };

  return (
    <div>
      <div className="row">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
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
                        src={room.image}
                        className="card-img-top img-getRoom"
                        alt={room.name}
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
                      <h4 style={{ fontSize: 16 }}>
                        Kiểu phòng {typeIdOptions[room.typeRoomId]} -{" "}
                        <FontAwesomeIcon
                          icon={faBed}
                          style={{ color: "#0264c8", marginRight: 5 }}
                        />{" "}
                        {room.bed} -{" "}
                        <span style={{ color: "red" }}>
                          {room.amount} phòng trống
                        </span>
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
                          {splitServices(room.services).map(
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
                          color: room.priceDiscount !== 0 ? "" : "red",
                          fontWeight: room.priceDiscount !== 0 ? "" : "500",
                          textDecoration:
                            room.priceDiscount !== 0 ? "line-through" : "none",
                        }}
                        className="card-text"
                      >
                        Giá: {formatCurrency(room.price)} / đêm
                      </p>
                      {room.priceDiscount !== 0 && (
                        <div style={{ textAlign: "center" }}>
                          <p style={{ color: "green", fontSize: 12 }}>
                            <FontAwesomeIcon icon={faPiggyBank} />{" "}
                            {calculateDiscountPercentage(
                              room.price,
                              room.priceDiscount
                            )}{" "}
                            %
                          </p>
                          <p
                            style={{ color: "red", fontWeight: 500 }}
                            className="card-text"
                          >
                            Giá sau giảm: {formatCurrency(room.priceDiscount)} /
                            đêm
                          </p>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary mt-5"
                        onClick={() => handleButtonClick(room.id)}
                        disabled={room.amount === 0}
                      >
                        Đặt phòng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div>
    </div>
  );
};

export default GetRoomUser;
