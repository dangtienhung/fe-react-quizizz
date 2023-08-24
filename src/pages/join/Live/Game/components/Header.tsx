import { BsFillLightningChargeFill, BsFillPaletteFill, BsFullscreen } from 'react-icons/bs'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='px-3 h-[70px] flex justify-between items-center bg-[#001B28] text-white fixed top-0 left-0 right-0 bg-opacity-80'>
      <Link to={'/'} className='bg-[#275065] w-[120px] py-2 px-4 rounded-lg'>
        <img
          src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png'
          alt='logo'
          className='w-full rounded-lg'
        />
      </Link>
      <div className='flex items-center gap-2'>
        <button className='flex items-center gap-2 bg-[#525252] h-10 px-3 rounded-lg'>
          <BsFillPaletteFill />
          <BsFillLightningChargeFill />
        </button>
        <button className='bg-[#525252] h-10 px-3 rounded-lg'>
          <BsFullscreen />
        </button>
        <button className='font-bold text-[#001B28] py-2 px-4 rounded-lg bg-white'>Kết thúc</button>
      </div>
    </div>
  )
}

export default Header
