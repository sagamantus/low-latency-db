import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from '../components/Navbar';
import { FaCalendarAlt, FaChartLine, FaExchangeAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Fetch = () => {
  const [inputValue, setInputValue] = useState('');

  // Fetched data for display
  const data = {
    date: "2024-10-09 14:30:00+05:30",
    open: 51359.3,
    high: 51399,
    low: 51354.9,
    close: 51395.05,
    volume: 3975
  };

  // Line chart data to show stock trends
  const stockTrendData = {
    labels: [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', 
      '6:00 PM', '6:30 PM', '7:00 PM'
    ],
    datasets: [
      {
        label: 'Open Price',
        data: [
          11100, 21200, 21150, 33350, 41300, 21320, 
          11300, 34280, 41350, 36340, 54380, 53400, 
          41450, 51410, 31430, 51490, 61520, 51550, 
          61170, 61610, 81630
        ],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1
      },
      {
        label: 'Close Price',
        data: [
          21500, 25000, 28000, 34000, 40000, 42000, 
          53000, 63000, 69000, 31000, 29000, 23000, 
          22000, 20000, 19000, 22000, 31000, 12000, 
          10000, 19000, 8000
        ],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.6)',
        tension: 0.1
      },
      {
        label: 'High Price',
        data: [
          33000, 28000, 29500, 45000, 62000, 73000, 
          64000, 55000, 79000, 72000, 79000, 83000, 
          72000, 90000, 99000, 82000, 91000, 102000, 
          90000, 89000, 98000
        ],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.6)',
        tension: 0.1
      },
      {
        label: 'Low Price',
        data: [
            51000, 30000, 51000, 60000, 51000, 
            60000, 61000, 80000, 10000, 20000, 
            20000, 33000, 40000, 21000, 10000, 
            34000, 40000, 36000, 53000, 52000, 
          41000
        ],
        fill: false,
        borderColor: 'rgba(255, 206, 86, 0.6)',
        tension: 0.1
      },
      {
        label: 'Up Price',
        data: [
          11000, 21500, 21200, 33500, 41500, 22000, 
          12000, 51500, 61000, 52000, 
          61000, 62000, 81000, 34000, 41500, 36000, 54500, 53000, 
          91500, 81500, 91500
        ],
        fill: false,
        borderColor: 'rgba(0, 255, 0, 0.6)', // Green for Up Price
        tension: 0.1
      },
      {
        label: 'Down Price',
        data: [
          10000, 19000, 19000, 32000, 39000, 20000, 
          11000, 33000, 40000, 35000, 52000, 51000, 
          40000, 49000, 29000, 49000, 59000, 51000, 
          59000, 60000, 79000
        ],
        fill: false,
        borderColor: 'rgba(255, 0, 0, 0.6)', // Red for Down Price
        tension: 0.1
      }
    ]
  };
  
  // Sample performance data for databases
  const databaseOps = [
    { name: 'Quad DB', ops: 5000 },
    { name: 'PostgreSQL', ops: 3500 },
    { name: 'MongoDB', ops: 3000 },
    { name: 'MySQL', ops: 4000 },
    { name: 'SQLite', ops: 2500 },
    { name: 'Oracle', ops: 2800 },
    { name: 'Redis', ops: 4500 },
    { name: 'Cassandra', ops: 3200 },
    { name: 'CouchDB', ops: 2700 },
    { name: 'DynamoDB', ops: 4100 },
    { name: 'MariaDB', ops: 3800 },
    { name: 'Neo4j', ops: 2900 }
  ];

  const yourDbOps = databaseOps[0].ops;
  const performanceData = {
    labels: databaseOps.map(db => db.name),
    datasets: [
      {
        label: 'Operations per Second',
        data: databaseOps.map(db => db.ops),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  // Your DB color
          ...databaseOps.slice(1).map(() => 'rgba(255, 99, 132, 0.6)'),
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          ...databaseOps.slice(1).map(() => 'rgba(255, 99, 132, 1)'),
        ],
        borderWidth: 1
      }
    ]
  };

  const percentageData = databaseOps.slice(1).map(db => ({
    name: db.name,
    percentage: ((yourDbOps - db.ops) / db.ops * 100).toFixed(2)
  }));

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handleFetch = () => {
    // Handle fetching logic here using inputValue
    console.log("Fetching data for:", inputValue);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white">
        <Navbar></Navbar>
        <div className='bg-amber-200 h-12 w-screen shadow-2xl flex items-center justify-between px-[25%] text-amber-700'>
            Download our latest version of Quad DB to manage your high frequency tasks!
            <a href="src/assets/quaddb.exe" download>
                <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-amber-300 items-center text-amber-900 hover:scale-105 hover:bg-amber-400 hover:cursor-pointer'>Download</div>
            </a>
        </div>
        <div className='py-4'></div>
      {/* Input field and Fetch button */}
      <div className="flex items-center mb-4 justify-center">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter your timestamp..." 
          className="border rounded-lg p-2 mr-2 w-1/2 outline outline-1"
        />
        <button 
          onClick={handleFetch} 
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Fetched data display */}
      <div className="bg-gradient-to-r from-blue-100 to-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Stock Data</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center text-lg">
            <FaCalendarAlt className="mr-2 text-blue-600" /> Date: {data.date}
          </div>
          <div className="flex items-center text-lg">
            <FaArrowUp className="mr-2 text-green-600" /> Open: {data.open}
          </div>
          <div className="flex items-center text-lg">
            <FaChartLine className="mr-2 text-yellow-600" /> High: {data.high}
          </div>
          <div className="flex items-center text-lg">
            <FaArrowDown className="mr-2 text-red-600" /> Low: {data.low}
          </div>
          <div className="flex items-center text-lg">
            <FaExchangeAlt className="mr-2 text-purple-600" /> Close: {data.close}
          </div>
          <div className="flex items-center text-lg">
            <FaChartLine className="mr-2 text-gray-600" /> Volume: {data.volume}
          </div>
        </div>
      </div>

      {/* Chart for stock trends */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Stock Trend Chart</h2>
        <Line data={stockTrendData} options={options} />
      </div>

      {/* Bar chart for database performance */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Database Operations Comparison</h2>
        <Bar data={performanceData} options={options} />
      </div>

    </div>
  );
};

export default Fetch;
