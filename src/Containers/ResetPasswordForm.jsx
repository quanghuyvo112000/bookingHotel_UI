import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResetPasswordForm = ({ onSubmit, password, confirmPassword, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ position: 'relative' }}>
      <div className="mb-3" style={{ position: 'relative' }}>
        <label htmlFor="password" className="form-label">Mật khẩu mới:</label>
        <div className="input-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={password}
              onChange={onChange('password')}
              required
              style={{
                width: 'calc(100% - 40px)', // Giảm kích thước để làm cho FontAwesomeIcon có thể nằm bên cạnh input
                padding: '0.375rem 0.75rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                borderRadius: '0.25rem',
                borderColor: '#ced4da',
                display: 'block',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => togglePasswordVisibility('password')}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
      </div>
      <div className="mb-3" style={{ position: 'relative' }}>
        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu mới:</label>
        <div className="input-group" style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChange('confirmPassword')}
            required
            style={{
              width: '100%',
              padding: '0.375rem 0.75rem',
              fontSize: '1rem',
              lineHeight: '1.5',
              borderRadius: '0.25rem',
              borderColor: '#ced4da',
              display: 'block',
            }}
          />
          <div
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
            }}
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{
          padding: '0.375rem 0.75rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          borderRadius: '0.25rem',
          borderColor: '#007bff',
        }}
      >
        Đặt Lại Mật Khẩu
      </button>
    </form>
  );
};

export default ResetPasswordForm;
