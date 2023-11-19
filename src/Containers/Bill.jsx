import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMapLocationDot, faBuildingCircleCheck, faCartFlatbedSuitcase, faHotel, faCashRegister, faCreditCard, faCircleCheck, faBed } from '@fortawesome/free-solid-svg-icons';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const userId = sessionStorage.getItem('idUser');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/bills/${userId}`);
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, [userId]);

  const mapPaymentMethod = (payment) => {
    switch (payment) {
      case 'nhanphong':
        return 'Thanh toán khi nhận phòng';
      case 'creditCard':
        return 'Credit Card';
      case 'bank':
        return 'Ngân hàng';
      default:
        return payment;
    }
  };

  const formatCheckInDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleCancelRoom = async (billId) => {
    try {
      console.log("Canceling room for Bill ID:", billId);
      // Gửi yêu cầu DELETE để xóa hóa đơn
      await axios.delete(`http://localhost:4000/bills/${billId}`);
      
      // Cập nhật danh sách hóa đơn sau khi xóa
      const updatedBills = bills.filter(bill => bill.id !== billId);
      setBills(updatedBills);

      console.log(`Cancel room for bill with ID ${billId}`);
    } catch (error) {
      console.error('Error cancelling room:', error);
    }

  };



  return (
    <div style={{marginBottom: 50}} className="container">
      <br />
      {bills.length > 0 ? (
        <div className="row">
          {bills.map((bill) => (
            <div key={bill.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h4 style={{ fontSize: 16 }}> <FontAwesomeIcon icon={faHotel} style={{ color: "#275fbe" }} /> {bill.hotelInfo.nameHotel} </h4>
                  <p> <FontAwesomeIcon icon={faLocationDot} style={{ color: "#275fbe" }} /> Khu vực: {bill.hotelInfo.location}, <br /> <FontAwesomeIcon icon={faMapLocationDot} style={{ color: "#275fbe" }} /> Địa chỉ: {bill.hotelInfo.address}</p>
                  <hr />
                  <p style={{ fontSize: 14, fontWeight: 500 }}>Thông tin phòng: {bill.roomInfo.nameRoom}</p>
                  <p> <FontAwesomeIcon icon={faBuildingCircleCheck} style={{ color: "#275fbe" }} /> Ngày Check-In: {formatCheckInDate(bill.checkInDate)}</p>
                  <p> <FontAwesomeIcon icon={faCartFlatbedSuitcase} style={{ color: "#275fbe" }} /> Ngày Check-Out: {bill.checkOutDate}</p>
                  <p> <FontAwesomeIcon icon={faBed} style={{ color: "#275fbe" }} /> Số phòng đã đặt: {bill.numRooms} phòng</p>
                  <p> <FontAwesomeIcon icon={faCashRegister} style={{ color: "#275fbe" }} /> Tổng tiền thanh toán: {bill.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  <p> <FontAwesomeIcon icon={faCreditCard} style={{ color: "#275fbe" }} /> Hình thức thanh toán: {mapPaymentMethod(bill.payment)}</p>
                  <p> <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#275fbe" }} /> Trạng thái: {bill.state}</p>
                  {bill.state === 'chờ phê duyệt' && (
                    <button  style={{ float: "right" }} className="btn btn-danger" onClick={() => handleCancelRoom(bill.id)}>Hủy phòng</button>
                  )}
                  {bill.state === 'đã duyệt' && (
                    <button style={{ float: "right" }} className="btn btn-secondary" disabled={false}>Không hủy phòng</button>
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
