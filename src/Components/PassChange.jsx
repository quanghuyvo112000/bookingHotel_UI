import React, { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PassChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Mảng trạng thái hiện/ẩn mật khẩu cho từng trường
  const [showPasswordFields, setShowPasswordFields] = useState([false, false, false]);

  const idUser = sessionStorage.getItem('idUser');

    // Hàm kiểm tra mật khẩu
    const isPasswordValid = (password) => {
      // Kiểm tra mật khẩu có ít nhất 1 chữ số và 1 ký tự
      return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
    };

  // Hàm xử lý sự kiện khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu mới khớp
    if (isPasswordValid(newPassword)) {
      if (newPassword === confirmNewPassword) {
        try {
          // Gọi API để thay đổi mật khẩu
          const response = await axios.put(`http://localhost:4000/changePassword/${idUser}`, {
            currentPassword,
            newPassword,
          });
  
          // Hiển thị thông báo từ phản hồi của máy chủ
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error changing password:', error.response ? error.response.data.message : error.message);
          setMessage('Mật khẩu hiện tại không trùng khớp.');
        }
      } else {
        // Hiển thị thông báo lỗi nếu mật khẩu mới và xác nhận mật khẩu mới không khớp
        setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      }
    }else{
      setMessage('Mật khẩu mới phải có ít nhất 1 chữ số và 1 ký tự.');
    }
  };

  // Hàm xử lý sự kiện khi nhấn vào biểu tượng hiện/ẩn mật khẩu
  const handleTogglePasswordVisibility = (index) => {
    const updatedShowPasswordFields = [...showPasswordFields];
    updatedShowPasswordFields[index] = !updatedShowPasswordFields[index];
    setShowPasswordFields(updatedShowPasswordFields);
  };

  return (
    <div style={{
      borderRadius: '0.375rem',
      border: '1px solid #d2d2d2',
      padding: '15px'
    }}>
      <h4 style={{ fontSize: 18 }}>Thay Đổi Mật Khẩu</h4>
      <form onSubmit={handleSubmit}>
        {['currentPassword', 'newPassword', 'confirmNewPassword'].map((fieldName, index) => (
          <div key={fieldName} className="mb-3" style={{ position: 'relative' }}>
            <label htmlFor={fieldName} className="form-label">
              {index === 0 ? 'Mật khẩu hiện tại:' : (index === 1 ? 'Mật khẩu mới:' : 'Xác nhận mật khẩu mới:')}
            </label>
            <div className="password-input" style={{ position: 'relative' }}>
              <input
                type={showPasswordFields[index] ? 'text' : 'password'}
                className="form-control"
                id={fieldName}
                value={index === 0 ? currentPassword : (index === 1 ? newPassword : confirmNewPassword)}
                onChange={(e) => {
                  if (index === 0) {
                    setCurrentPassword(e.target.value);
                  } else if (index === 1) {
                    setNewPassword(e.target.value);
                  } else {
                    setConfirmNewPassword(e.target.value);
                  }
                }}
                required
              />
              <FontAwesomeIcon
                icon={showPasswordFields[index] ? faEyeSlash : faEye}
                className="password-icon"
                onClick={() => handleTogglePasswordVisibility(index)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Thay Đổi Mật Khẩu
        </button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default PassChange;