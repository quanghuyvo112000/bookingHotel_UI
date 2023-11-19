import React, { useState } from 'react';

const ForgotPasswordForm = ({ onSubmit, message }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="card-body">
      <h4 className="card-title">Xác nhận tài khoản</h4>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Yêu Cầu Đặt Lại Mật Khẩu</button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default ForgotPasswordForm;
