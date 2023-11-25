import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import UpdateHotel from "./UpdateHotel";
import DeleteHotel from "./DeleteHotel";
import AddRoom from "./AddRoom";
import GetRoom from "./getRoom";

import "./style/main.css";

const DetailHotel = () => {
  const { hotelId } = useParams();
  const [hotelDetail, setHotelDetail] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleShowPopup = () => {
    setShowPopup(true);
    setShowDeleteModal(false);
    setShowAddRoom(false);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
    setShowPopup(false);
    setShowAddRoom(false);
  };

  const handleShowAddRoom = () => {
    setShowAddRoom(true);
    setShowPopup(false);
    setShowDeleteModal(false);
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
        Chi tiết khách sạn: <span>{hotelDetail.name}</span>
      </h4>
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="d-flex align-items-center justify-content-center">
              <img
                style={{
                  width: "50%",
                  marginTop: 5,
                  height: "20%",
                  borderRadius: 10,
                }}
                src={hotelDetail.image}
                className="card-img-top"
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
              <p style={{ fontWeight: 500 }}>
                Khu vực: {cityOptions[hotelDetail.location]} -{" "}
                <span> {hotelDetail.address}</span>
              </p>
              <p className="card-text">
                {" "}
                Mô hình: {typeIdOptions[hotelDetail.typeId]}
              </p>
              <p className="card-text">Tiện tích: {hotelDetail.services}</p>
              <p className="card-text">{hotelDetail.payType}</p>
            </div>

            {/* Button to show the popup */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowPopup}
            >
              Cập nhật thông tin
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleShowDeleteModal}
            >
              Xóa thông tin
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleShowAddRoom}
            >
              Thêm phòng
            </button>

            {showPopup && (
              <UpdateHotel
                onClose={() => setShowPopup(false)}
                hotelId={hotelId}
                hotelDetail={hotelDetail}
              />
            )}

            {showDeleteModal && (
              <DeleteHotel
                onClose={() => setShowDeleteModal(false)}
                hotelId={hotelId}
              />
            )}

            {showAddRoom && (
              <AddRoom
                onClose={() => setShowAddRoom(false)}
                hotelId={hotelId}
              />
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <h4 style={{ fontSize: 18, marginTop: 50 }}>
              {" "}
              Những phòng còn trống tại {hotelDetail.name}
            </h4>
            <GetRoom hotelId={hotelId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHotel;
