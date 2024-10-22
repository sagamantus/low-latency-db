import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Try() {
  return (
    <div>
        <Navbar className=''></Navbar>
        <div className='w-screen h-16 flex justify-center items-center rounded-2xl bg-amber-200 text-amber-800'>
            Create your database instance if not yet created !
            <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-amber-300 items-center text-amber-900 hover:scale-105 hover:bg-amber-400 hover:cursor-pointer mx-20'>Create</div>
        </div>

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
                    <Link to='/users/booking/'>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
