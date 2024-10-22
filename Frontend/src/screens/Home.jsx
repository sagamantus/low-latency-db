import React from 'react'
import Navbar from '../components/Navbar'
import Statistics from '../components/Statistics'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-cyan-100 to-blue-100'>
        <Navbar></Navbar>
        <div className='bg-amber-200 h-12 w-screen shadow-2xl flex items-center justify-between px-[25%] text-amber-700'>
            Download our latest version of Quad DB to manage your high frequency tasks!
            <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-amber-300 items-center text-amber-900 hover:scale-105 hover:bg-amber-400 hover:cursor-pointer'>Download</div>
        </div>

        <div>
            <div className='text-xl text-gray-600 flex justify-center text-center px-[20%] py-[3%]'>
                Unlock the full potential of financial data with our cutting-edge database solution, designed to handle massive 
            data volumes with minimal delay. Whether you're analyzing market trends or executing trades, our database delivers the speed and reliability you need.
            </div>
            <div className='flex justify-center space-x-12 pb-8'>
                <Link to="/try/">
                    <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-cyan-700 items-center text-amber-100 hover:scale-105 hover:bg-cyan-800 hover:cursor-pointer'>Try Now</div>
                </Link>
                
                <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-amber-300 items-center text-amber-900 hover:scale-105 hover:bg-amber-400 hover:cursor-pointer'>Download</div>
                <div className='flex justify-center h-10 w-28 rounded-lg outline outline-1 bg-violet-800 items-center text-amber-100 hover:scale-105 hover:bg-violet-900 hover:cursor-pointer'>Gemini</div>
            </div>
        </div>

        <div className='flex justify-center'>
            <div className='h-[30%] w-[80%] bg-sky-100 rounded-xl m-4 shadow-xl'>
                <div className='flex justify-evenly'>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Transactions</div>
                        <div className='text-gray-500 flex justify-center font-semibold'>1000 per second</div>
                    </div>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Response</div>
                        <div className='text-gray-500 flex justify-center font-semibold'>0.3 milli seconds</div>
                    </div>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Throughput</div>
                        <div className='text-gray-500 flex justify-center font-semibold'>2000 per second</div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Disk I/O Ops </div>
                        <div className='text-gray-500 flex justify-center font-semibold'>500 MB per second</div>
                    </div>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Cache Hit</div>
                        <div className='text-gray-500 flex justify-center font-semibold'>99.95 % queries</div>
                    </div>
                    <div className='p-8'>
                        <div className='mb-2 text-3xl font-extrabold text-gray-700 flex justify-center'>Ops Latency</div>
                        <div className='text-gray-500 flex justify-center font-semibold'>1.2 milli seconds</div>
                    </div>
                </div>
            </div>
        </div>

        <div>


<footer className="bg-cyan-800 mt-4">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="">
              <a href="#" className="flex items-center">
                  <img src="https://cdn.pixabay.com/photo/2017/06/10/07/10/database-2389207_1280.png" className="h-12 me-3 rounded-full" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold text-white">Quad DB</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase ">Resources</h2>
                  <ul className="text-gray-400  font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Quad DB</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Quad AI</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase ">Follow us</h2>
                  <ul className="text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline ">Github</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Discord</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">Legal</h2>
                  <ul className="text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-100 sm:text-center ">© 2023 <a href="" className="hover:underline">Quaddb™</a>. All Rights Reserved.
          </span>
          
      </div>
    </div>
</footer>

        </div>
        
    </div>
  )
}
