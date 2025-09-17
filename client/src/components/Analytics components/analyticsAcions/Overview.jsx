import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, Cell, Pie, PieChart } from 'recharts';
const Overview = ({lastWeekHabits,lastWeekPossibleCompletion,habits}) => {
  let count={}
  lastWeekHabits?.map((habit)=>{
    let days=[]
    const splitidDates=habit?.completedThisWeek?.map((date)=>date?.split("T")[0])
      splitidDates.map((date)=>{
        const d =new Date(date).toLocaleString('en-US',{weekday:'long'}).toLocaleLowerCase()
         count[d] = (count[d] || 0) + 1;
        if(!days.includes(d)){
          days.push(d)
        }
      })
    })
    let habitCategoryCount={}
    habits?.getHabits?.map((habit)=>{
  let category=[]
  habitCategoryCount[habit?.category] = (habitCategoryCount[habit?.category] || 0) + 1;
  if(!category?.includes(habit?.category)){
    category.push(habit?.category)
  }

})
console.log(habitCategoryCount)
// pie chart
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
  const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const pieChartData = [
];
Object?.entries(habitCategoryCount)?.map((name,value)=>{
  pieChartData.push({
    name:name,
    value:value
  })

})

// bar chart
const barChartData = [
 

];
console.log(lastWeekPossibleCompletion)
Object?.entries(count)?.map(([day,times])=>{
  barChartData.push({
    name:day, 
    completedHabit: times,
    possibleComplition: lastWeekHabits.length,})

})
// line chart
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
    <div className="main w-full min-h-screen flex gap-3 flex-wrap justify-center ">

    <div className='md:w-[45%] w-full h-[70vh] rounded-2xl bg-fuchsia-300 p-5 overflow-hidden'>
      <div className="head pb-5">
      <h2 className='text-2xl'>Weekly Progress</h2>
      <p>Habbit completion this week </p>
      </div>
<ResponsiveContainer width="100%" height="80%" >
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
          <YAxis dataKey={'possibleComplition'}/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="completedHabit" background={{ }} className='fill-fuchsia-600'/>
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="md:w-[45%] w-full h-[70vh] bg-fuchsia-300 rounded-2xl p-5">
         <div className="head pb-5">
      <h2 className='text-2xl'>Monthly Trend</h2>
      <p>Completion rate over months </p>
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
      <div className="w-full h-screen bg-fuchsia-300 rounded-2xl p-5">
          <div className="head pb-5">
      <h2 className='text-2xl'>Habit Categories</h2>
      <p>Distribution of your habits by category </p>
      </div>
         <ResponsiveContainer width="100%" height="100%" className="">
      <PieChart width={600} height={600}>
        <Legend verticalAlign="bottom" height={96}/> 
        <Pie 
          data={pieChartData} className='cursor-pointer'
          cx="50%"
          cy="50%"
          labelLine={false}
         label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
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