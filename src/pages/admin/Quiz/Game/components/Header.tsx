import { BsCheck2All, BsFillLightningChargeFill, BsFillPaletteFill, BsFullscreen } from 'react-icons/bs'
import { useEffect, useState } from 'react'

import { FiCopy } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { copyCodeGame } from '@/utils/copyCodeGame'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'

const Header = () => {
  const socket = useSocket()
  const [copyCode, setCopyCode] = useState<boolean>(false)
  const { quizizzExam } = useQuizizzExamStore((state) => state)
  const handleCopyCode = (code: string) => {
    const copy = copyCodeGame(code)
    setCopyCode(copy)
  }
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (data: any) => {
      console.log(data)
    })
  }, [socket])
  return (
    <div className='flex fixed top-0 left-0 right-0 z-20 justify-between p-2 items-center h-[72px] bg-black bg-opacity-70 text-white'>
      <Link to={'/'} className='py-2 px-4 rounded-lg inline-block bg-[#262626] w-fit'>
        <img
          src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png'
          alt='logo'
          className='w-[120px] rounded-lg'
        />
      </Link>
      <div className='bg-[#333] p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex  w-full max-w-[240px] items-center rounded-lg text-white mx-auto'>
        <div className='flex-1 text-white w-full font-bold tracking-widest text-3xl text-center'>
          {quizizzExam.code}
        </div>
        <div className={`${copyCode ? 'tooltip tooltip-right' : ''}`} data-tip='Đã sao chép mã trò chơi'>
          <span
            onClick={() => handleCopyCode(quizizzExam.code)}
            className='text-black cursor-pointer h-[50px] w-[50px] bg-[#E6E6E6] rounded-lg flex items-center justify-center'
          >
            {copyCode ? <BsCheck2All /> : <FiCopy />}
          </span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <button className='flex items-center gap-2 bg-[#525252] h-10 px-3 rounded-lg'>
          <BsFillPaletteFill />
          <BsFillLightningChargeFill />
        </button>
        <button className='bg-[#525252] h-10 px-3 rounded-lg'>
          <BsFullscreen />
        </button>
        <button className='font-bold text-[#001B28] py-2 px-4 rounded-lg bg-white'>Tạm ngưng</button>
        <button className='font-bold text-[#001B28] py-2 px-4 rounded-lg bg-white'>Kết thúc</button>
      </div>
    </div>
  )
}

export default Header
