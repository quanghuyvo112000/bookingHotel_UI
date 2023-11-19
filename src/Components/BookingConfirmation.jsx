import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faPerson, faRuler, faCircleCheck, faBed, faPiggyBank, faMugSaucer, faWifi, faJoint, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormBookingConfir from '../Containers/FormBookingConfir';
import { useNavigate } from 'react-router-dom';
import '../css/BookingConfirmation.css';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const [numRooms, setNumRooms] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [customerNameOnUI, setCustomerNameOnUI] = useState('');
  const [customerEmailOnUI, setCustomerEmailOnUI] = useState('');
  const [customerPhoneOnUI, setCustomerPhoneOnUI] = useState('');
  const [customerPaymentOnUI , setCustomerPaymentOnUI] = useState('');


  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [bookingData, setBookingData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const hotelId = sessionStorage.getItem('hotelId');
  const UserId = sessionStorage.getItem('idUser');
  const roomId = sessionStorage.getItem('roomId');

  const checkInDate = sessionStorage.getItem('checkInDate');
  const numNights = sessionStorage.getItem('numNights');

    // Hàm xử lý sự kiện khi số lượng phòng thay đổi
  const handleNumRoomsChange = (value) => {
    if (value > 0) {
      setNumRooms(value);
    };
  };

  const formatCheckInDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const checkInDateFormatted = formatCheckInDate(checkInDate);

  const calculateCheckOutDate = (checkInDate, numNights) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + parseInt(numNights, 10));
    return checkOut.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
  };

  const checkOutDateForm = calculateCheckOutDate(checkInDate, numNights);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelId = sessionStorage.getItem('hotelId');
        const roomId = sessionStorage.getItem('roomId');
        const response = await axios.get(`http://localhost:4000/hotels/${hotelId}/rooms/${roomId}`);

        // Chuyển đổi giá trị từ kiểu string sang kiểu int
        response.data.price = parseInt(response.data.price.replace(/\D/g, ''), 10);
        if (response.data.reduced_price) {
          response.data.reduced_price = parseInt(response.data.reduced_price.replace(/\D/g, ''), 10);
        }

        setBookingData(response.data);
        // Tính toán và cập nhật tổng tiền
        const calculatedAmount = numNights * (response.data.reduced_price || response.data.price);
        const calculatedAmounts = calculatedAmount * numRooms
        setTotalAmount(calculatedAmounts);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, [numNights, numRooms]);

  const renderUtilities = (mainUtility) => {
    if (!mainUtility) {
      return null;
    }

    const utilitiesArray = mainUtility.split(',').map((item, index) => (
      <div key={index} className="col-md-4">
        <p
          style={{
            margin: '5px 0',
            fontWeight: 500,
            fontSize: '12px',
            color: 'rgb(0, 135, 90)',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgb(232, 254, 245)',
            borderRadius: '14px',
            padding: '5px',
          }}
          className="card-text"
        >
          {item.trim()}
        </p>
      </div>
    ));

    return <div className="row">{utilitiesArray}</div>;
  };

  const renderPrice = (bookingData) => {
    const price = bookingData.price;
    const reducedPrice = bookingData.reduced_price;

    const priceString = price.toLocaleString();
    const PriceInt = parseInt(priceString.replace(/\D/g, ''), 10);

    const reducedPriceString = reducedPrice.toLocaleString();
    const reducedPriceInt = parseInt(reducedPriceString.replace(/\D/g, ''), 10);

    if (reducedPrice) {
      const savingsPercentage = price !== 0 ? ((price - reducedPrice) / price) * 100 : 0;
      return (
        <div>
          <p className="card-text" style={{ marginLeft: 10, textDecoration: 'line-through', color: 'gray' }}>
            {PriceInt.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} phòng/đêm
          </p>
          <p className="card-text" style={{ marginLeft: 10, color: 'green' }}>
            <FontAwesomeIcon icon={faPiggyBank} /> Tiết kiệm {savingsPercentage.toFixed(0)}%
          </p>
          <p className="card-text" style={{ marginLeft: 10, color: 'red' }}>
            {(reducedPriceInt* numRooms).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} <span style={{ color: '#687176' }}> - {numRooms} phòng/đêm</span>
          </p>
        </div>
      );
    }
    else{
      return (
        <p className="card-text" style={{ marginLeft: 10, color: 'red' }}>
          {(PriceInt * numRooms).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} <span style={{ color: '#687176' }}> - {numRooms} phòng/đêm</span>
        </p>
      );
    }
  };

  const renderServices = (service) => {
    if (!service) {
      return null;
    }

    const icons = [faMugSaucer, faWifi, faJoint, faCalendar];
    const serviceArray = service.split(',').map((item, index) => (
      <div key={index} className="col-md-6">
        <p
          style={{ margin: '5px 0', color: 'rgb(0, 135, 90)', fontSize: '14px', padding: '15px 5px' }}
          className="card-text"
        >
          <FontAwesomeIcon icon={icons[index]} style={{ marginRight: '5px' }} />
          {item.trim()}
        </p>
      </div>
    ));

    return <div className="row">{serviceArray}</div>;
  };

  const handleFormSubmit = (formData) => {
    const { customerName, email, phoneNumber, paymentMethod } = formData;
    setIsConfirmed(true);
    setCustomerNameOnUI(customerName);
    setCustomerEmailOnUI(email);
    setCustomerPhoneOnUI(phoneNumber);
    setCustomerPaymentOnUI(paymentMethod);

  };


  const handleBooking = async () => {
    if (isConfirmed) {
      try {
        // Thực hiện gửi yêu cầu POST đến endpoint cụ thể trên server
        const response = await axios.post('http://localhost:4000/bill', {
          UserId,
          customerNameOnUI,
          customerEmailOnUI,
          customerPhoneOnUI,
          customerPaymentOnUI,
          hotelId,
          roomId,
          checkInDate,
          checkOutDateForm,
          totalAmount,
          numRooms,
        });      
        // Hiển thị popup thành công
        console.log('Đặt phòng thành công:', response.data);
        setShowSuccessPopup(true);
        
      } catch (error) {
        console.error('Lỗi khi đặt phòng:', error);
      }
    } else {
      // Hiển thị thông báo hoặc thực hiện các hành động khác nếu cần thiết
      console.log('Vui lòng xác nhận thông tin trước khi đặt phòng.');
    }
  };

  const handlePopupClose = () => {
    // Đặt lại trạng thái của popup khi đóng
    setShowSuccessPopup(false);

    sessionStorage.removeItem('numNights');
    sessionStorage.removeItem('hotelName');
    sessionStorage.removeItem('checkInDate');
    sessionStorage.removeItem('roomId');
    sessionStorage.removeItem('hotelId');

    navigate('/hoa-don-dat-phong');
  };

  return (
    <div style={{marginBottom: 100}}>
      <h4 style={{ fontSize: 16, fontWeight: 500 }}>Đặt phòng khách sạn {sessionStorage.getItem('hotelName')}</h4>
      {bookingData ? (
        <div>
          <div className="row">
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-4" id="confir_img"
              style={{
                height: '300px',
                marginLeft: 45,
                marginRight: 5,
                borderRadius: '0.375rem',
                border: '1px solid #dee2e6',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
            >
              <h4 style={{ marginTop: 10, fontSize: 16 }}>{bookingData.nameRoom}</h4>
              <img
                style={{ width: '100%', paddingTop: 10, height: '50%', borderRadius: '0.375rem' }}
                src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67782898-e13ce86c4806d306fe1633a78e9803cf.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550"
                alt=""
              />
              <div style={{ marginTop: 5 }}>
                <span>
                  <FontAwesomeIcon icon={faRuler} style={{ color: '#225fc9' }} /> {bookingData.acreage}
                </span>
                {renderUtilities(bookingData.utilities)}
              </div>
            </div>

            <div
              className="col-12 col-sm-12 col-md-12 col-lg-4" id="confir_infor"
              style={{
                height: '300px',
                marginRight: 5,
                padding: '20px 40px',
                borderRadius: '0.375rem',
                border: '1px solid #dee2e6',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 700 }}>{bookingData.nameRoom}</p>
              <p style={{ fontSize: 14, fontWeight: 500 }}>
                <span style={{ marginRight: '20px' }}>
                  <FontAwesomeIcon icon={faBed} style={{ color: '#225fc9' }} /> {bookingData.bed}
                </span>{' '}
                <span>
                  <FontAwesomeIcon icon={faPerson} style={{ color: '#225fc9' }} /> {bookingData.quantity}
                </span>
              </p>
              <hr />
              <p style={{ fontSize: 14, fontWeight: 500 }}>{renderServices(bookingData.serviceRoom)}</p>
            </div>

            <div
                  className="col-12 col-sm-12 col-md-12 col-lg-3" id="confir_price"
                  style={{
                    height: 300,
                    marginBottom: 15,
                    padding: '10px 40px',
                    borderRadius: '0.375rem',
                    border: '1px solid #dee2e6',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 500 }}>Thông tin phòng</h4>
                  {renderPrice(bookingData, numRooms)}
                  <div>
                    <p style={{ margin: '10px 0', fontWeight: 500 }}>Số lượng phòng:</p>
                    <div className="input-group mb-3" style={{ width: 'auto', margin: '5px 0' }}>
                      <button style={{left: 60, width: '16%'}} className="btn btn-outline-secondary btn-confir-plus" type="button" onClick={() => handleNumRoomsChange(numRooms - 1)}>-</button>
                      <input  style={{width: '20%', margin: '0 102px'}} type="text" className="form-control input-count-room" value={numRooms} readOnly />
                      <button  style={{right: 59, width: '16%'}} className="btn btn-outline-secondary btn-confir-minus" type="button" onClick={() => handleNumRoomsChange(numRooms + 1)}>+</button>
                    </div>
                  </div>
                </div>
          </div>

          <div>
            <div className="container" style={{ marginTop: 15 }}>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-infor-customer">
                  <FormBookingConfir onSubmit={handleFormSubmit} onConfirmation={setIsConfirmed}/>
                </div>
              </div>
              {isConfirmed && (
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-infor-customer"
                  style={{
                    marginBottom: 15,
                    padding: '10px 40px',
                    borderRadius: '0.375rem',
                    border: '1px solid #dee2e6',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    textAlign: "center",
                    width: '95.5%',
                    marginLeft: 22
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 500 }}>Thông tin hóa đơn</h4>
                  {}
                  <div>
                    <div className="container" style={{ marginTop: 15 }}>
                      <p style={{marginBottom: "0rem"}}> <span style={{fontWeight: 500}}>Checkin:</span>  {checkInDateFormatted}</p>
                      <p style={{marginBottom: "0rem"}}> <span style={{fontWeight: 500}}>Checkout:</span> {checkOutDateForm}</p>
                      <p style={{marginBottom: "0rem"}}> <span style={{fontWeight: 500}}>Số phòng đặt:</span> {numRooms} phòng</p>
                      <br />
                      <p style={{marginBottom: "0rem"}}> <span style={{fontWeight: 500}}>Tổng tiền cần thanh toán:</span> <span style={{color: "red"}}>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/ cho {sessionStorage.getItem('numNights')} ngày </span> </p>
                    </div>
                  </div>
                  <br />
                  <button className="btn btn-primary" onClick={handleBooking} disabled={!isConfirmed}>
                    Đặt phòng
                  </button>
                </div>
              )}

            </div>
          </div>
          <div>
            {showSuccessPopup && (
              <>
                <div
                  className="custom-popup-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: 'rgba(0, 0, 0, 0.5)', // Màu đen với độ mờ là 0.5
                    zIndex: '998', // Đặt zIndex thấp hơn popup để nằm phía dưới
                  }}
                ></div>
                <div className="custom-popup"
                  style={{
                    borderRadius: '0.375rem',
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    padding: '20px',
                    border: '1px solid #ccc',
                    boxShadow:' 0 0 10px rgba(0, 0, 0, 0.1)',
                    zIndex: '999',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Canh giữa theo chiều dọc
                    justifyContent: 'center', // Canh giữa theo chiều ngang
                  }}
                >
                  <p style={{ fontSize: 70 }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2a65cb" }} />
                  </p>
                  <p style={{textAlign: 'center'}}>
                      Đặt phòng thành công!
                      <br />
                      Bạn vui lòng đợi xác nhận đơn đặt phòng qua địa chỉ Email.
                      <br />
                      Xin trân thành cảm ơn.
                  </p>
                  <button className='btn btn-primary' onClick={handlePopupClose}>Đóng</button>
                </div>
              </>
            )}
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookingConfirmation;
