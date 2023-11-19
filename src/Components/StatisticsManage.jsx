import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const StatisticsManage = () => {
  const data = [
    { name: 'Jan', uv: 0, pv: 0, amt: 0 },
    { name: 'Feb', uv: 1, pv: 2, amt: 8 },
    { name: 'Mar', uv: 2, pv: 3, amt: 9 },
    { name: 'Apr', uv: 3, pv: 4, amt: 7 },
    { name: 'May', uv: 4, pv: 5, amt: 6 },
    { name: 'Jun', uv: 5, pv: 6, amt: 5 },
    { name: 'Jul', uv: 6, pv: 7, amt: 4 },
  ];
  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis yAxisId={0} />
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
      <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={0} />
      <Line type="monotone" dataKey="amt" stroke="#387908" yAxisId={0} />

    </LineChart>
  );
};

export default StatisticsManage