import { AiFillSound } from 'react-icons/ai'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import { VscDebugStart } from 'react-icons/vsc'

const PreGameLive = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <div className='flex justify-between gap-6 p-10 text-white bg-black'>
        <div className='w-[30%]'></div>
        <div className='w-[50%]'>
          <div className='p-6 bg-[#111111] rounded-xl'>
            <div className=''>
              <h2 className='mb-1 text-sm'>Your Quizizz name is ...</h2>
              <div className='flex bg-white mb-4 rounded-lg items-center h-12'>
                <div className='flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full'>
                  <img
                    src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster9.png?w=90&h=90'
                    alt=''
                    className='w-8 h-8 rounded-full object-cover ml-2'
                  />
                </div>
                <input
                  type='text'
                  className='flex-1 border-none rounded-lg px-2 w-full p-2 focus:outline-none focus:!hadow-none outline-none bg-transparent text-secondary font-semibold'
                  style={{ boxShadow: 'none' }}
                  value={'Nguyễn Văn A'}
                />
                <button className='text-black h-8 w-8 cursor-pointer'>
                  <MdOutlinePublishedWithChanges size={20} />
                </button>
              </div>
            </div>
            <Link to={`/join/game/loppy/123`} className='inline-block w-full'>
              <button
                className='btn shadow-md w-full bg-[#00C985] hover:bg-[#00C985] font-bold outline-none border-none text-white'
                style={{ boxShadow: '#00a06a 0px 4px 0px 0px' }}
              >
                <VscDebugStart size={20} />
                <span>chơi game</span>
              </button>
            </Link>
          </div>
          <h2 className='text-secondary mt-5'>Settings</h2>
          <div className='mt-5 p-6 rounded-lg bg-[#111111]'>
            <div className='flex items-center gap-2'>
              <span>
                <AiFillSound />
              </span>
              <span className='capitalize'>sounds effects</span>
            </div>
          </div>
        </div>
        <div className='w-[20%]'></div>
      </div>
    </div>
  )
}

export default PreGameLive
