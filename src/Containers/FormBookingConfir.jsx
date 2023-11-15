import React, { useState } from 'react';

const FormBookingConfir = ({ onSubmit, onConfirmation }) => {
  const fullName = sessionStorage.getItem('fullname');
  const [customerName, setCustomerName] = useState(fullName || '');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('nhanphong');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ customerName, email, phoneNumber, paymentMethod });
      setIsConfirmed(true);
    }
    if (onConfirmation) {
      onConfirmation(true);
    }
  };

  return (
    <div style={{ marginBottom: 15, marginLeft: 22, width: '95.5%', padding: '25px', borderRadius: '0.375rem', border: '1px solid #dee2e6', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h4 style={{fontSize: 16}}>Thông tin khách hàng</h4>
          <label htmlFor="customerName" className="form-label">
            Tên Khách Hàng:
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Số Điện Thoại:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Hình thức thanh toán:
          </label>
          <select
            className="form-select"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="nhanphong">Thanh toán khi nhận phòng</option>
            <option value="bank">Ngân hàng</option>
            <option value="creditCard">Thẻ tín dụng</option>
          </select>
        </div>
        <div className="col-auto" style={{textAlign: 'end'}}>
          <button type="submit" className="btn btn-primary" disabled={isConfirmed}>
            {isConfirmed ? 'Thông tin đã xác nhận' : 'Xác nhận thông tin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBookingConfir;
