import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const StatisticsManage = () => {
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];
  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis yAxisId={0} />
      <YAxis yAxisId={1} />
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
      <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
    </LineChart>
  );
};

export default StatisticsManage