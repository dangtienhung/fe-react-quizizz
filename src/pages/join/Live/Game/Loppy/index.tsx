import { FaUsers } from 'react-icons/fa'
import Header from '@/pages/join/components/Header'

const LoppyGame = () => {
  return (
    <div
      style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
      className='min-h-screen bg-center bg-cover bg-no-repeat w-full text-white -z-10'
    >
      <Header />
      <div className='border-b mb-8'>
        <div className='mx-auto max-w-xl flex items-center bg-[#00212e] justify-between p-5 rounded-xl'>
          <div className='flex items-center gap-3'>
            <img
              src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster23.png?w=90&h=90'
              alt='logon'
              className='h-10 w-10 rounded-full bg-cover'
            />
            <div className=''>
              <h2 className='font-bold text-2xl'>đặng tiến hưng</h2>
              <span className='border bg-[#333333] rounded p-[1px] text-[10px] px-1'>you</span>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-[#a3a8a8] font-bold text-base'>Join Game</p>
            <p className='text-2xl font-bold tracking-widest'>123456</p>
          </div>
        </div>
        <div className='mt-10 mb-6 mx-auto max-w-xl flex justify-between items-center'>
          <p className='text-base font-semibold'>Waiting for the host to start...</p>
          <div className='border bg-[#333] w-fit rounded-md border-white flex gap-2 items-center px-3 py-1'>
            <span>
              <FaUsers />
            </span>
            <span>3</span>
          </div>
        </div>
      </div>
      <div className='py-10 w-full mx-auto max-w-5xl xl:max-w-7xl grid grid-cols-5 gap-10'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
          return (
            <div key={Math.random()} className='border border-gray-200 p-4 rounded-xl flex items-center gap-3'>
              <img
                src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster23.png?w=90&h=90'
                alt='logo'
                className='h-10 w-10 rounded-full object-cover'
              />
              <h2 className='lowercase font-semibold'>đặng tiến hưng</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LoppyGame
