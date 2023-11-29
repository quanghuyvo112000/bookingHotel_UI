import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import NewHotel from "../Containers/NewHotel";
import NewRoom from "../Containers/ListHotelAdmin";
import "../css/HotelManage.css"; // Import CSS styles for react-tabs

const HotelManage = () => {
  // State để theo dõi tab đang được chọn
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div style={{ marginBottom: 50 }}>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        <TabList className="custom-tab-list">
          <Tab
            className={`custom-tab ${selectedTab === 0 ? "active-tab" : ""}`}
          >
            Danh sách khách sạn
          </Tab>
          <Tab
            className={`custom-tab ${selectedTab === 1 ? "active-tab" : ""}`}
          >
            Thêm khách sạn mới
          </Tab>
        </TabList>

        <TabPanel>
          <NewRoom />
        </TabPanel>
        <TabPanel>
          <NewHotel />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HotelManage;
