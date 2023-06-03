import React, { useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai'


export default function NavBar() {

  const [isOpen, setIsopen] = useState(false)

  const handleNav = () => {
    console.log("hiiii");
    setIsopen(!isOpen);
  };





  return (
    <div className="fixed w-full h-20 shadow-2xl z-50">
      <div className='flex justify-between items-center w-full h-full'>
        <div className="px-10" onClick={() => handleNav()}>
          <BiMenuAltRight size={30} className='cursor-pointer' />
        </div>
        <div className="px-14">
          <img
            src={'images/logo.jpg'}
            alt="Background Image"
            // className="hidden"
          />
          {/* <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white shadow-sm"> */}
          {/* <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Club-app</span></h1> */}
        </div>

      </div>
      <div className={isOpen ? 'fixed top-0 right-0 h-screen w-full bg-black/70 ' : ''}>

        <div className={isOpen ? 'fixed ease-in duration-500 bg-[#ecf0f3] w-[90%] pb-24 right-10 left-10 bottom-0 h-3/6 rounded-lg p-10 bg-cover bg-bottom' :
          'fixed top-0 left-[-120%] ease-in duration-500 bg-[#ecf0f3] h-screen p-10 '}
          style={{ backgroundImage: `url('/images/navbar1.jpg')` }}>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          </div>
          <div className='flex justify-end'>
            <button type="button" className='bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded-full'><AiOutlineClose onClick={() => handleNav()} /></button>
          </div>
          <div className=' w-[50%] h-full p-10'>
            <div className='flex flex-col gap-10 justify-center w-[30%] m-auto '>
              <p className='uppercase text-xl font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>home</p>
              <p className='uppercase text-xl font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>Games</p>
              <p className='uppercase text-xl  font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>schedule game</p>
              <p className='uppercase text-xl  font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>contact</p>
              <p className='uppercase text-xl  font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>groups</p>
              <p className='uppercase text-xl  font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>events</p>
              <p className='uppercase text-xl  font-bold text-white transition ease-in-out delay-150  rounded hover:-translate-y-1 hover:text-white hover:scale-110 hover:bg-indigo-800 duration-300 text-center cursor-pointer'>about us</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
