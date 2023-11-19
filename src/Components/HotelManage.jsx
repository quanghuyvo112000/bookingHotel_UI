import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NewHotel from '../Containers/NewHotel';
import NewRoom from '../Containers/NewRoom';
import '../css/HotelManage.css'; // Import CSS styles for react-tabs
import ListHotel from './ListHotel';

const HotelManage = () => {
  // State để theo dõi tab đang được chọn
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${selectedTab === 0 ? 'active-tab' : ''}`}>
            Danh sách khách sạn
          </Tab>
          <Tab className={`custom-tab ${selectedTab === 1 ? 'active-tab' : ''}`}>
            Thêm khách sạn mới
          </Tab>
          <Tab className={`custom-tab ${selectedTab === 2 ? 'active-tab' : ''}`}>
            Thêm phòng mới
          </Tab>
        </TabList>

        <TabPanel>
          <h4 style={{fontSize: 18, marginTop: 15}}>Danh sách khách sạn</h4>
          <ListHotel />
        </TabPanel>

        <TabPanel>
          <h4 style={{fontSize: 18, marginTop: 15}}>Thêm khách sạn mới</h4>
          <NewHotel />
        </TabPanel>
        <TabPanel>
          <h4 style={{fontSize: 18, marginTop: 15}}>Thêm phòng mới</h4>
          <NewRoom />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HotelManage;
