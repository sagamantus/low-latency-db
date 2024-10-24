import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState } from 'react';

export default function Try() {

    const [created, setCreated] = useState(false); 
    const [createdName, setCreatedName] = useState(false); 

    const handleCreateInstance = async (event) => {
        event.preventDefault(); // Prevent the default form submission


        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomName = 'Quaddb_instance_';
        
        for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
            randomName += alphabet[randomIndex];
        }
        localStorage.setItem("instance", randomName); 
        console.log(randomName);
        setCreatedName(randomName); 

        try {
            const res = await fetch(`http://localhost:8000/create-table/?user_id=${randomName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response Status:', res.status); // Log the response status
            console.log('Response Status Text:', res.statusText); // Log the status text

            if (!res.ok) {
                const errorData = await res.json(); // Try to get error response body
                throw new Error(`Network response was not ok: ${res.statusText}, ${JSON.stringify(errorData)}`);
            }

            const data = await res.json();
            console.log(data)
            setCreated(true); 
            // useData(data);
            // navigate('/home/')
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
        <Navbar className=''></Navbar>
        {
            !created && (
                <div className='w-screen h-16 flex justify-center items-center rounded-2xl bg-amber-200 text-amber-800'>
                    Create your database instance if not yet created !
                    <div onClick={handleCreateInstance} className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-amber-300 items-center text-amber-900 hover:scale-105 hover:bg-amber-400 hover:cursor-pointer mx-20'>Create</div>
                </div>
            )
        }
        {
            created && (
                <div className='w-screen h-16 flex justify-center items-center rounded-2xl bg-amber-200 text-amber-800'>
                    `Your database instance is created with with instance name: {createdName}`
                </div>
            )
        }
        

        <div className='w-screen h-[80%] py-[6%] bg-gradient-to-b from-blue-100 to-white flex items-center justify-center space-x-10'>

            {/* Transactions in milliseconds */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img className="rounded-t-lg" src='https://cdn.pixabay.com/photo/2023/04/05/16/39/cloud-7901917_1280.png' alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">Transactions in milliseconds</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Execute and complete transactions within milliseconds, ensuring faster profit for your trading needs.</p>
                    <Link to='/fetch/'>
                        <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Fetch
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>

            {/* Instant Data Seeding */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img className="rounded-t-lg" src='https://cdn.pixabay.com/photo/2023/04/05/16/39/cloud-7901917_1280.png' alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">Instant Data Seeding</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rapidly seed and manage real-time trading data to monitor, track, and update logistics seamlessly.</p>
                    <Link to='/users/track/'>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Seed
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>

            {/* Cost Estimation */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img className="rounded-t-lg" src='https://cdn.pixabay.com/photo/2023/04/05/16/39/cloud-7901917_1280.png' alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">Profits Estimation</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instantly calculate trading profits based on price difference, data type, and other real-time factors.</p>
                    <Link to='/users/booking/'>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Estimate
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    </div>
  )
}
