import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { faMagnifyingGlass, faBed, faChild, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/formBooking.css"

const FormBooking = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('HoChiMinh');
  const [checkInDate, setCheckInDate] = useState('');
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
    // Lấy ngày hiện tại và đặt giá trị cho checkInDate
    const today = new Date().toISOString().split('T')[0];
    setCheckInDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/hotels', {
        location,
        checkInDate,
        numNights,
        numAdults,
        numChildren,
        numRooms,
      });

      // Store the list of hotels in the component's state
      const hotels = response.data;

      // Save checkInDate and numNights to sessionStorage
      sessionStorage.setItem('checkInDate', checkInDate);
      sessionStorage.setItem('numNights', numNights);

      // Navigate to the ListHotel component with the list of hotels
      navigate('/danh-sach-khach-san', { state: { hotels } });
    } catch (error) {
      console.error('Error:', error);
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
          <option value="HaiPhong">Hải Phòng</option>
          <option value="Hue">Huế</option>
          <option value="DaNang">Đà Nẵng</option>
          <option value="NhaTrang">Nha Trang</option>
          <option value="BinhThuan">Bình Thuận</option>
          <option value="HoiAn">Hội An</option>
          <option value="CaoBang">Cao Bằng</option>
          <option value="QuocPhuc">Quốc Phúc</option>
          <option value="HaLong">Hạ Long</option>
        </select>
      </div>
      <div className='row'>
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
          <div className="form-group form_info" tabIndex="0" onClick={handleOptionGroupToggle}>
            <span> Số người lớn: {numAdults}, </span>
            <span>Số trẻ em: {numChildren}, </span>
            <span>Số lượng phòng: {numRooms}</span>
          </div>
          {isOptionGroupVisible && (
            <div className="option_group">
              <div className="form-group form-group-info">
                <label><FontAwesomeIcon icon={faPerson} style={{ color: "#0d5de7", }} /> Người lớn</label>
                <div className="input-group input-group-booking">
                  <button className="btn btn-primary btn_minus" type="button" onClick={() => handleAdultsChange(-1)}>-</button>
                  <input type="text" className="form-control" value={numAdults} readOnly />
                  <button className="btn btn-primary btn_plus" type="button" onClick={() => handleAdultsChange(1)}>+</button>
                </div>
              </div>

              <div className="form-group form-group-info">
                <label><FontAwesomeIcon icon={faChild} style={{ color: "#0d5de7", }} /> Trẻ em</label>
                <div className="input-group input-group-booking">
                  <button className="btn btn-primary btn_minus" type="button" onClick={() => handleChildrenChange(-1)}>-</button>
                  <input type="text" className="form-control" value={numChildren} readOnly />
                  <button className="btn btn-primary btn_plus" type="button" onClick={() => handleChildrenChange(1)}>+</button>
                </div>
              </div>

              <div className="form-group form-group-info">
                <label><FontAwesomeIcon icon={faBed} style={{ color: "#0d5de7", }} /> Số phòng</label>
                <div className="input-group input-group-booking">
                  <button className="btn btn-primary btn_minus" type="button" onClick={() => handleRoomsChange(-1)}>-</button>
                  <input type="text" className="form-control" value={numRooms} readOnly />
                  <button className="btn btn-primary btn_plus" type="button" onClick={() => handleRoomsChange(1)}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-sm-6 form_group">
          <button style={{ marginTop: 43 }} type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm khách sạn
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormBooking;
