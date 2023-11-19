import React, { useState } from 'react';
import Bill from '../Containers/Bill';
import Account from '../Containers/Account';
import PassChange from '../Containers/PassChange';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/AccountMana.css';

const AccountInfo = () => (
  <div>
    <h4 style={{ fontSize: 18 }}>Quản lý thông tin tài khoản</h4>
    <Account />
  </div>
);

const BookingHistory = () => (
  <div>
    <h4 style={{ fontSize: 18 }}>Lịch Sử Đặt Phòng Của Bạn</h4>
    <Bill />
  </div>
);

const ChangePassword = () => (
  <div>
    <PassChange />
  </div>
);

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('account-info');

  const renderContent = () => {
    switch (activeTab) {
      case 'account-info':
        return <AccountInfo />;
      case 'booking-history':
        return <BookingHistory />;
      case 'change-password':
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-3'>
          <div className='navigation-menu'>
            <div style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 25, padding: 15, color: "#275fbe", borderRadius: '50%', border: '1px solid #275fbe' }} />
              <p style={{ fontSize: 16, fontWeight: 500 }}>{sessionStorage.getItem('fullname')}</p>
            </div>
            <hr />
            <nav>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <button className={`btn btn_navigation-menu ${activeTab === 'account-info' ? 'active' : ''}`} onClick={() => setActiveTab('account-info')}>Quản lý thông tin</button>
                </li>
                <li>
                  <button className={`btn btn_navigation-menu ${activeTab === 'booking-history' ? 'active' : ''}`} onClick={() => setActiveTab('booking-history')}>Lịch sử đặt phòng</button>
                </li>
                <li>
                  <button className={`btn btn_navigation-menu ${activeTab === 'change-password' ? 'active' : ''}`} onClick={() => setActiveTab('change-password')}>Đổi mật khẩu</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='col-12 col-md-9'>
          <div style={{ padding: '20px' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
