import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faBed,
  faChild,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/formBooking.css";

const FormBooking = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("HoChiMinh");
  const [checkInDate, setCheckInDate] = useState("");
  const [numNights, setNumNights] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [isOptionGroupVisible, setOptionGroupVisibility] = useState(false);

  const handleAdultsChange = (increment) => {
    setNumAdults((prevNum) => Math.max(prevNum + increment, 1));
  };

  const handleChildrenChange = (increment) => {
    setNumChildren((prevNum) => Math.max(prevNum + increment, 0));
  };

  const handleRoomsChange = (increment) => {
    setNumRooms((prevNum) => Math.max(prevNum + increment, 1));
  };

  const handleOptionGroupToggle = () => {
    setOptionGroupVisibility(!isOptionGroupVisible);
  };

  const handleNumNightsChange = (e) => {
    const selectedNumNights = parseInt(e.target.value, 10);
    setNumNights(selectedNumNights);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCheckInDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("checkInDate", checkInDate);
      sessionStorage.setItem("numNights", numNights);
      sessionStorage.setItem("numRooms", numRooms);

      navigate("/danh-sach-khach-san", { state: { location, numRooms } });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="container container-booking mt-5">
      <div className="form-group">
        <label>Chọn địa điểm:</label>
        <select
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="HoChiMinh">Hồ Chí Minh</option>
          <option value="HaNoi">Hà Nội</option>
          <option value="Hue">Huế</option>
          <option value="DaNang">Đà Nẵng</option>
          <option value="NhaTrang">Nha Trang</option>
        </select>
      </div>
      <div className="row">
        <div className="col-sm-6 form-group">
          <label>Ngày nhận phòng:</label>
          <input
            type="date"
            className="form-control"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="col-sm-6 form-group">
          <label>Đêm ở:</label>
          <select
            className="form-control"
            value={numNights}
            onChange={handleNumNightsChange}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>
                {num} ngày
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className=" col-sm-6 info">
          <label>Khách và phòng: </label>
          <div
            className="form-group form_info"
            tabIndex="0"
            onClick={handleOptionGroupToggle}
          >
            <span> Số người lớn: {numAdults}, </span>
            <span>Số trẻ em: {numChildren}, </span>
            <span>Số lượng phòng: {numRooms}</span>
          </div>
          {isOptionGroupVisible && (
            <div className="option_group">
              <div className="form-group form-group-info">
                <label>
                  <FontAwesomeIcon
                    icon={faPerson}
                    style={{ color: "#0d5de7" }}
                  />{" "}
                  Người lớn
                </label>
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAdultsChange(-1)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{numAdults}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAdultsChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group form-group-info">
                <label>
                  <FontAwesomeIcon
                    icon={faChild}
                    style={{ color: "#0d5de7" }}
                  />{" "}
                  Trẻ em
                </label>
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleChildrenChange(-1)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{numChildren}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleChildrenChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group form-group-info">
                <label>
                  <FontAwesomeIcon icon={faBed} style={{ color: "#0d5de7" }} />{" "}
                  Số phòng
                </label>
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleRoomsChange(-1)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{numRooms}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleRoomsChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-sm-6 form_group">
          <button
            style={{ marginTop: 43 }}
            type="submit"
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm khách sạn
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormBooking;
