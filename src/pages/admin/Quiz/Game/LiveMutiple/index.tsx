import { AiFillFire } from 'react-icons/ai'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { EGameMutiple } from '@/interfaces/enum'
import { FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import { IoClose } from 'react-icons/io5'
import { useState } from 'react'

const menus = ['Bảng xếp hạng', 'Câu hỏi']

const LiveMutiple = () => {
  const [gameSelect, setGameSelect] = useState(0)
  return (
    <div
      style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
      className='select-none min-h-screen bg-center bg-cover bg-no-repeat w-full text-white -z-10'
    >
      <Header />
      <div className='pt-[72px]'>
        <div className='p-3 mt-10'>
          <div className='h-[64px] relative bg-[#001925] mx-auto rounded-2xl flex items-center max-w-5xl w-full text-white'>
            <div className='absolute top-1/2 flex items-center justify-center flex-col text-black left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-white border-2 border-gray-200'>
              <p className='text-2xl font-semibold '>10%</p>
              <span className='text-[8px] font-semibold text-center'>Độ chính xác của lớp học</span>
            </div>
            <div className='absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 h-10 bg-[#46BB81] w-[50px] rounded'></div>
            <div className='absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 h-10 bg-[#CD3E62] w-[50px] rounded'></div>
          </div>
        </div>
        <div className='mt-20 bg-[#7D4E6E] h-full w-full bg-opacity-80 py-4 min-h-screen'>
          <div className='w-full max-w-[1040px] mx-auto'>
            <div className='bg-[#18120F] flex items-center gap-1 w-fit text-center mx-auto rounded-t-2xl'>
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className={`w-[160px] transition-all duration-500 items-center justify-center cursor-pointer ${
                    gameSelect === index ? 'border-b-[2px]' : ''
                  } p-3`}
                  onClick={() => setGameSelect(index)}
                >
                  <span className='text-sm font-medium'>{menus[index]}</span>
                </div>
              ))}
            </div>
            {gameSelect === 0 ? (
              <div className=''>
                <div className='bg-[#411B20] flex items-center justify-start rounded-t-2xl px-5 py-3 gap-2'>
                  <span>
                    <FaUsers />
                  </span>
                  <span>1 người chơi</span>
                </div>
                <div className='bg-[#63343D] rounded-b-2xl bg-opacity-90 px-[26px] pb-10'>
                  <table
                    style={{ borderSpacing: '0 4px' }}
                    className='border-separate w-full text-left text-sm text-gray-500 dark:text-gray-400 group-first/body:group-first/row:last:rounded-tr-lg overflow-hidden'
                  >
                    <thead className='text-sm font-light uppercase text-white dark:text-gray-400'>
                      <tr className=''>
                        <th className='dark:bg-gray-700 px-6 py-3'>Thứ hạng</th>
                        <th className='dark:bg-gray-700 px-6 py-3'>Tên</th>
                        <th className='dark:bg-gray-700 px-6 py-3'>Điểm số</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {[1, 2, 3].map((_, index) => (
                        <tr className='group/row border border-gray-300 first:rounded-xl overflow-hidden' key={index}>
                          <td className='p-3 first:rounded-l-xl w-[120px] font-medium text-white bg-[#2D1B24]'>1</td>
                          <td className='p-3 w-[120px] bg-[#2D1B24]'>
                            <div className='flex items-center gap-2'>
                              <img
                                src='https://genk.mediacdn.vn/2018/8/22/maxresdefault-3-1534914028092859095407.jpg'
                                alt=''
                                className='h-5 w-5 rounded-full object-cover'
                              />
                              <span className='truncate text-white'>Lorem, ipsum dolor sit</span>
                            </div>
                          </td>
                          <td className='p-3 w-[120px] text-white bg-[#2D1B24]'>200</td>
                          <td className='p-3 flex items-center gap-2 bg-[#2D1B24] -z-10 rounded-r-xl'>
                            <div className='relative flex-1 h-7 rounded-md bg-[#2D1B24]'>
                              <span className='absolute flex items-center gap-[2px] top-1/2 left-4 text-white -translate-x-1/2 -translate-y-1/2'>
                                <AiFillFire size={18} className='z-20' />
                                <span className='z-20 text-white'>4</span>
                              </span>
                              <div className='flex-1 rounded-lg bg-[#000000] h-full w-full'>
                                <div className='bg-[#4ed190] h-full w-[40%] rounded-md'></div>
                              </div>
                            </div>
                            <span className='cursor-pointer'>
                              <IoClose size={18} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className='bg-[#411B20] flex items-center justify-start rounded-t-2xl px-5 py-3 gap-2'>
                Danh sách câu hỏi
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveMutiple
