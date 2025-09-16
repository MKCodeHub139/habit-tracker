import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, Cell, Pie, PieChart } from 'recharts';const Overview = () => {
  const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const barChartData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const lineChartData = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D', uv:null},
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
];
  return (
    <div className="main w-full min-h-screen flex gap-3 flex-wrap justify-center">

    <div className='w-[45%] h-[70vh] rounded-2xl bg-fuchsia-300 p-5 overflow-hidden'>
      <div className="head pb-5">
      <h2 className='text-2xl'>Weekly Progress</h2>
      <p>Habbit completion this week </p>
      </div>
<ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={300}
          data={barChartData}
          className=''
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={60}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 10 }} />
          <YAxis/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="pv" background={{ }} className='fill-fuchsia-600'/>
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="w-[45%] h-[70vh] bg-fuchsia-300 rounded-2xl p-5">
         <div className="head pb-5">
      <h2 className='text-2xl'>Weekly Progress</h2>
      <p>Habbit completion this week </p>
      </div>
        <ResponsiveContainer width="100%" height="80%">
        <LineChart 
          data={lineChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      </div>
      <div className="w-full h-screen">
         <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Overview