import React, { useState } from 'react';
import HotelManage from './HotelManage';
import StatisticsManage from './StatisticsManage';
import BillManage from './BillManage';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/AccountMana.css';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('hotel-info');

  const renderContent = () => {
    switch (activeTab) {
      case 'hotel-info':
        return <HotelManage />;
      case 'statistic-info':
        return <StatisticsManage />;
      case 'bill-info':
        return <BillManage />;
      default:
        return null;

    }
  }
  return (
    <div>
      <div className='navigation-menu'>
        <div style={{textAlign: 'center'}}>
            <FontAwesomeIcon icon={faUser}  style={{fontSize: 25, padding: 15, color: "#275fbe", borderRadius: '50%', border: '1px solid #275fbe'}} /> 
            <p style={{fontSize: 16, fontWeight: 500}}>{sessionStorage.getItem('fullname')}</p> 
        </div>
        <hr />
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <button className={`btn btn_navigation-menu ${activeTab === 'hotel-info' ? 'active' : ''}`} onClick={() => setActiveTab('hotel-info')}>Quản lý khách sạn</button>
            </li>
            <li>
              <button className={`btn btn_navigation-menu ${activeTab === 'statistic-info' ? 'active' : ''}`} onClick={() => setActiveTab('statistic-info')}>Quản lý thống kê</button>
            </li>
            <li>
              <button className={`btn btn_navigation-menu ${activeTab === 'bill-info' ? 'active' : ''}`} onClick={() => setActiveTab('bill-info')}>Quản lý hóa đơn</button>
            </li>
          </ul>
        </nav>
      </div>

      <div style={{ marginLeft: '300px', padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard