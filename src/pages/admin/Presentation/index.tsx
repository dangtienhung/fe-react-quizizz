import { BsBoxArrowRight, BsCheck2All, BsFullscreen } from 'react-icons/bs'
import { useEffect, useState } from 'react'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { FiCopy } from 'react-icons/fi'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { IoClose } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

const Presentation = () => {
  const { id: roomId } = useParams()
  const handleKickGame = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit('kickOutGame', { roomId: roomId, idPlayer: id })
      }
    })
  }
  const { user } = userStore((state) => state)
  const { quizizzExam } = useQuizizzExamStore((state) => state)
  const [copySuccess, setCopySuccess] = useState(false)

  const socket = useSocket()
  const handleCopyClick = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2500)
  }
  useEffect(() => {
    if (!socket) return
    /* gửi id phòng quiz đang chơi lên server */
    socket.emit('joinRoom', { roomId: roomId, useId: user._id })
  }, [socket])
  /* nhận bài thi */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (data: IQuizizzExam) => {
      if (data) {
        useQuizizzExamStore.setState({ quizizzExam: data })
      }
    })
  }, [socket])
  return (
    <div className='flex min-h-screen select-none bg-[#222222]'>
      <div className='w-[60%] p-3 bg-[#222222] flex flex-col'>
        <div className='flex justify-center h-full items-center'>
          <div className='bg-[#090909] w-[656px] h-[369px] flex justify-center items-center rounded-2xl'>
            <span className='text-3xl font-bold text-white cursor-text'>{quizizzExam.title}</span>
          </div>
        </div>
        <div className='mt-auto flex justify-between items-center'>
          <img
            src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png'
            alt='logo'
            className='h-[26px]'
          />
          <div className='flex gap-2 items-center'>
            <div className='justify-center  flex gap-2 items-center rounded-md cursor-pointer h-11 w-11 bg-[#090909] text-white'>
              <BsFullscreen />
            </div>
            <div className='justify-center rounded-md h-11 bg-[#090909] px-3 cursor-pointer text-white flex gap-2 items-center'>
              <BsBoxArrowRight />
              <span className='text-sm'>kết thúc trò chơi</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[40%] bg-[#090909] text-white rounded-2xl flex-shrink p-3 h-screen overflow-auto'>
        <div className='text-center h-full'>
          <h2 className='font-bold text-base text-center mb-8'>Để bắt đầu trò chơi này</h2>
          <div className='mb-8'>
            <p className='text-sm mb-2 font-semibold'>1. Sử dụng bất kỳ thiết nào để mở</p>
            <div className='bg-white p-2 flex items-center rounded-lg w-full max-w-xs mx-auto'>
              <span className='flex-1 text-black font-bold text-xl'>join my quiz.com</span>
              <span className='text-black h-[50px] w-[50px] bg-[#E6E6E6] rounded-lg flex items-center justify-center'>
                <FiCopy />
              </span>
            </div>
          </div>
          <div className='mb-8'>
            <p className='text-sm mb-2 font-semibold'>2. Nhập mã trò chơi</p>
            <div className='bg-white p-2 flex items-center rounded-lg w-full max-w-xs mx-auto'>
              <span className='flex-1 text-black font-bold tracking-widest text-2xl'>{quizizzExam.code}</span>
              <div className={`${copySuccess ? 'tooltip tooltip-right' : ''}`} data-tip='Đã sao chép mã trò chơi'>
                <span
                  onClick={() => handleCopyClick(quizizzExam.code)}
                  className='text-black cursor-pointer h-[50px] w-[50px] bg-[#E6E6E6] rounded-lg flex items-center justify-center'
                >
                  {copySuccess ? <BsCheck2All /> : <FiCopy />}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-[#131313] w-full rounded-lg relative mt-16'>
            {quizizzExam && quizizzExam.players.length === 0 && (
              <div className='text-center font-semibold text-xl p-10 h-full text-[#ADADAD]'>
                <p className=''>Không có người tham gia đã tham gia.</p>
                <p> Yêu cầu họ tham gia bằng cách sử dụng các hướng dẫn ở trên.</p>
              </div>
            )}
            <div className='flex flex-col p-8'>
              {quizizzExam &&
                quizizzExam.players.length > 0 &&
                quizizzExam.players.map((player) => (
                  <div
                    key={player._id}
                    className='flex my-4 gap-3 hover:bg-[#292929] last:mb-0 bg-[#161616] items-center p-3 rounded-lg justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <img src={player.avatar} alt='logo' className='h-11 w-11 rounded-full object-cover' />
                      <p className='font-semibold'>{player.nameInGame}</p>
                    </div>
                    <div className='text-white flex items-center gap-3'>
                      <div className='h-9 w-9 flex justify-center cursor-pointer hover:bg-[#292929] duration-500 transition-all hover:scale-125 items-center rounded-full text-white'>
                        <AiOutlineEyeInvisible />
                      </div>
                      <div
                        onClick={() => handleKickGame(player._id)}
                        className='h-9 w-9 flex justify-center cursor-pointer hover:bg-[#292929] duration-500 transition-all hover:scale-125 items-center rounded-full text-white'
                      >
                        <IoClose color='text-white' />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className='absolute left-1/2 -top-[30px] -translate-x-1/2'>
              <div className='flex gap-2'>
                <div className='border bg-[#090909] font-bold h-[60px] flex gap-2 justify-center items-center rounded-lg px-4 text-2xl'>
                  <span>
                    <FaUsers />
                  </span>
                  <span className='text-lg'>{quizizzExam.players.length}</span>
                </div>
                <div className='bg-primary font-bold cursor-pointer h-[60px] flex justify-center items-center rounded-lg w-[240px] text-2xl'>
                  Bắt đầu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Presentation
