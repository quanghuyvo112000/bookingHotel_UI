import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import GetRoomUser from "./GetRoomUser";

import "../css/DetailHotel.css";

import {
  faClock,
  faWifi,
  faSquareParking,
  faWaterLadder,
  faUtensils,
  faLocationDot,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailHotel = () => {
  const { hotelId } = useParams();
  const [hotelDetail, setHotelDetail] = useState({});
  const Token = sessionStorage.getItem("jwtToken");

  const cityOptions = {
    HoChiMinh: "Hồ Chí Minh",
    HaNoi: "Hà Nội",
    BinhThuan: "Bình Thuận",
    CaoBang: "Cao Bằng",
    QuocPhuc: "Quốc Phúc",
    HaLong: "Hạ Long",
    HaiPhong: "Hải Phòng",
    Hue: "Huế",
    DaNang: "Đà Nẵng",
    NhaTrang: "Nha Trang",
    HoiAn: "Hội An",
  };

  const typeIdOptions = {
    TH01: "Hotel",
    TH02: "Homestay",
    TH03: "Villa",
    TH04: "Resort",
  };

  const iconMappings = {
    "Lễ tân 24h": faClock,
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

  useEffect(() => {
    // Fetch chi tiết khách sạn từ API
    axios
      .get(`https://localhost:7211/Hotel/getDetail?id=${hotelId}`, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        setHotelDetail(response.data.data); // Giả sử phản hồi là chi tiết của khách sạn
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết khách sạn:", error.message);
      });
  }, [Token, hotelId]);

  return (
    <div style={{ marginBottom: 100 }} className="container mt-5">
      <h4 style={{ fontSize: 20 }}>
        <span>{hotelDetail.name}</span>
      </h4>
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="d-flex align-items-center justify-content-center">
              <img
                style={{
                  width: "50%",
                  marginTop: 5,
                  borderRadius: 10,
                }}
                src={hotelDetail.image}
                className="card-img-top card-img-top-detailuser"
                alt={hotelDetail.name}
              />
            </div>
            <div
              style={{
                marginTop: 15,
                border: "1px solid #d2d2d2",
                borderRadius: "0.375rem",
                padding: 15,
                marginBottom: 15,
              }}
            >
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                  <p className="card-text" style={{ fontSize: 14 }}>
                    <h4 style={{ fontSize: 16 }}>Các tiện ích chính</h4>
                    {splitServices(hotelDetail.services).map(
                      (service, index) => (
                        <p key={index}>
                          <FontAwesomeIcon
                            icon={iconMappings[service]}
                            style={{ color: "#0264c8", marginRight: 15 }}
                          />
                          <span>{service}</span>
                        </p>
                      )
                    )}
                  </p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9">
                  <p style={{ fontWeight: 500, fontSize: 14 }}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#0264c8", marginRight: 15 }}
                    />{" "}
                    {cityOptions[hotelDetail.location]} -{" "}
                    <span> {hotelDetail.address}</span>
                    <p style={{ fontSize: 14 }}>
                      <FontAwesomeIcon
                        icon={faMap}
                        style={{ color: "#0264c8", marginRight: 15 }}
                      />
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(
                          hotelDetail.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem trên Google Maps
                      </a>
                    </p>
                  </p>
                  <p style={{ fontSize: 14 }} className="card-text">
                    <span
                      style={{
                        backgroundColor: "#f2f3f3",
                        padding: "5px 15px",
                        borderRadius: "999px",
                        fontWeight: 500,
                      }}
                    >
                      {typeIdOptions[hotelDetail.typeId]}
                    </span>
                  </p>
                  <p style={{ fontSize: 14 }} className="card-text">
                    Chúng tôi chấp nhận{" "}
                    <span style={{ fontWeight: 500 }}>
                      {hotelDetail.payType}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <h4 style={{ fontSize: 18, marginTop: 50 }}>
              {" "}
              Những phòng còn trống tại {hotelDetail.name}
            </h4>
            <GetRoomUser hotelId={hotelId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHotel;
