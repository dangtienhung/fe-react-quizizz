import { AiFillHome, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'

import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const menuLink = [
  { name: 'Trang chủ', href: '/', icon: <AiFillHome size={20} /> },
  { name: 'Hoạt động', href: '/ahihi', icon: <AiOutlineReload size={20} /> }
]

const Menu = () => {
  const [isActive, setIsActive] = useState<number>(0)
  return (
    <>
      <div className='md:flex justify-start flex-1 hidden h-full'>
        <div className='flex items-center justify-center'>
          <div className='relative w-[276px] border border-[e9e9e9] rounded-3xl mr-4'>
            <form>
              <input
                type='text'
                placeholder='Tìm quizz'
                className='input-bordered rounded-3xl w-full px-4 py-1 text-sm outline-none'
              />
              <button className='focus-visible:bg-gray-200 rounded-r-3xl absolute top-0 right-0 px-3 py-1'>
                <AiOutlineSearch size={22} />
              </button>
            </form>
          </div>
        </div>
        <div className='flex items-center'>
          {menuLink.map((item, index) => (
            <div className='h-full px-2' key={index}>
              <Link
                to={item.href}
                className={`${
                  isActive === index ? 'text-primary border-b-primary border-b-2' : 'text-secondary'
                } hover:text-primary flex transition-all duration-200 items-center justify-center h-full gap-2 px-6`}
                onClick={() => setIsActive(index)}
              >
                {item.icon}
                <span className='lg:block hidden mt-1 font-bold'>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='md:hidden block'>
        <FaBars size={22} />
      </div>
    </>
  )
}

export default Menu
